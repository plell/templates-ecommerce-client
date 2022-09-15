import { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Button, IconButton } from "../ui";
import Input from "./inputs";
import { getPriceFromForm } from "../helpers";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";

type FormProps = {
  getFormState: (values: any) => void;
  onSubmit: (values: any) => void;
  initialValues: any;
  schema: any;
  scrollDiv?: any;
  paged?: boolean;
  formRef?: any;
  formInnerRef?: any;
  submitText?: string;
  loading?: boolean;
  disabled?: boolean;
};

export default function Form(props: FormProps) {
  const { schema, getFormState } = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const refBody = useRef(null);
  const scrollDiv = props.scrollDiv ? props.scrollDiv : refBody;

  useEffect(() => {
    const values = props.formInnerRef?.current?.values;
    if (values) getFormState(values);
    console.log("inside form reporter");
  }, []);

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

  function validateErrors(errors: any) {
    console.log("errors", errors);

    let clean = true;
    if (props.paged) {
      const fieldsOnThisPage = props.schema.filter((f: any) => f.page === page);
      fieldsOnThisPage.forEach((f: any) => {
        if (errors[f.name]) clean = false;
      });
    } else if (Object.keys(errors).length) {
      clean = false;
    }

    return clean;
  }

  // if no schema, return empty div
  if (loading || !schema) return <Wrap />;

  return (
    <div ref={props.formRef}>
      {page > 1 && (
        // @ts-ignore
        <IconButton
          variant='text'
          disabled={props.disabled || props.loading}
          onClick={() => {
            setPage(page - 1);
          }}
          loading={props.loading}
        >
          <ArrowBack />
        </IconButton>
      )}
      <Formik
        id={"order-form"}
        initialValues={props.initialValues || {}}
        onSubmit={props.onSubmit}
        validateOnMount
        innerRef={props.formInnerRef}
        enableReinitialize={true}
        validationSchema={validator(props.schema)}
      >
        {({
          setFieldTouched,
          handleSubmit,
          values,
          setValues,
          setFieldValue,
          errors,
          dirty,
          isValid,
          initialValues,
        }) => {
          return (
            <Wrap ref={refBody}>
              <InputWrap>
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
                      handleChange={(value: any) => {
                        setFieldValue(item.name, value);
                        getFormState({
                          ...values,
                          [item.name]: value,
                        });
                      }}
                      setFieldValue={(field: string, value: any) => {
                        setFieldValue(field, value);
                        getFormState({
                          ...values,
                          [item.name]: value,
                        });
                      }}
                      setFieldTouched={setFieldTouched}
                      onBlur={() => setFieldTouched(item.name, false)}
                      onFocus={() => setFieldTouched(item.name, true)}
                    />
                  ))}
              </InputWrap>

              <Total>
                TOTAL:{" "}
                <Price>
                  ${getPriceFromForm(schema, values).toFixed(2)} USD
                </Price>
              </Total>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <div />

                <Button
                  variant='text'
                  endIcon={<ArrowForward />}
                  disabled={props.disabled || props.loading}
                  onClick={async () => {
                    if (lastPage === page) handleSubmit();
                    else {
                      if (validateErrors(errors)) setPage(page + 1);
                      else console.log(errors);
                    }
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
    </div>
  );
}

const Total = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: flex-end;
  color: #00000099;
  font-size: 15px;
`;

const Price = styled.div`
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  color: #000;
`;

const Wrap = styled.div`
  padding: 10px;
  margin-bottom: 100px;
  display: flex;
  height: inherit;
  flex-direction: column;
  align-content: center;
  flex-shrink: 0;
  flex-grow: 0;
  min-width: 380px;
`;

const InputWrap = styled.div`
  min-height: 200px;
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
