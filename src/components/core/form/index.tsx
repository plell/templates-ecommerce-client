import { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Button } from "../ui";
import Input from "./inputs";
import { getPriceFromForm } from "../helpers";

export default function Form(props: any) {
  const { schema } = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const refBody = useRef(null);
  const scrollDiv = props.scrollDiv ? props.scrollDiv : refBody;

  useEffect(() => {
    scrollToTop();
  }, [page]);

  function scrollToTop() {
    if (scrollDiv && scrollDiv.current) {
      scrollDiv.current.scrollTop = 0;
    }
  }

  function reloadForm() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 20);
  }

  let lastPage = 1;

  if (props.paged) {
    props.schema?.forEach((s: any) => {
      if (s.page > lastPage) lastPage = s.page;
    });
  }

  // if no schema, return empty div
  if (loading || !schema) return <Wrap />;

  return (
    <Formik
      initialValues={props.initialValues || {}}
      onSubmit={props.onSubmit}
      innerRef={props.formRef}
      enableReinitialize={true}
      validationSchema={validator(props.schema)}
    >
      {({
        setFieldTouched,
        handleSubmit,
        values,
        setFieldValue,
        errors,
        dirty,
        isValid,
        initialValues,
      }) => {
        return (
          <Wrap ref={refBody}>
            {schema
              ?.filter(
                (f: any) => (page > 1 && f.persistHeader) || f.page === page
              )
              .map((item: any, index: number) => (
                <Input
                  {...item}
                  key={item.name + "_" + index}
                  values={values}
                  errors={errors}
                  value={values[item.name]}
                  error={errors[item.name]}
                  initialValues={initialValues}
                  deleteErrors={() => {
                    if (errors[item.name]) delete errors[item.name];
                  }}
                  handleChange={(e: any) => {
                    setFieldValue(item.name, e);
                  }}
                  setFieldValue={(field: string, value: any) => {
                    setFieldValue(field, value);
                  }}
                  setFieldTouched={setFieldTouched}
                  onBlur={() => setFieldTouched(item.name, false)}
                  onFocus={() => setFieldTouched(item.name, true)}
                />
              ))}

            <Total>TOTAL: {getPriceFromForm(schema, values)}</Total>

            <div
              style={{
                display: "flex",
                justifyContent: page > 1 ? "space-between" : "center",
                marginTop: 20,
              }}
            >
              {page > 1 ? (
                // @ts-ignore
                <Button
                  variant='text'
                  disabled={props.disable || props.loading}
                  onClick={() => {
                    setPage(page - 1);
                    // reloadForm()
                  }}
                  loading={props.loading}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              <Button
                variant='text'
                disabled={props.disable || props.loading}
                onClick={async () => {
                  if (lastPage === page) handleSubmit();
                  else setPage(page + 1);
                }}
              >
                {lastPage > 1 && lastPage === page
                  ? props.submitText || "Checkout"
                  : "Next"}
              </Button>
            </div>
          </Wrap>
        );
      }}
    </Formik>
  );
}

const Total = styled.div``;

const Wrap = styled.div`
  padding: 10px;
  margin-bottom: 100px;
  display: flex;
  height: inherit;
  flex-direction: column;
  align-content: center;
  flex-shrink: 0;
  flex-grow: 0;
  min-width: 290px;
`;

function validator(config: any) {
  const shape: any = {};
  config.forEach((field: any) => {
    if (typeof field === "object") {
      shape[field.name] = field.validator;
    }
  });
  return Yup.object().shape(shape);
}
