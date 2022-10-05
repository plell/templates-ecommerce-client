import { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Button, FadeIn, IconButton } from "../ui";
import Input from "./inputs";
import ArrowBack from "@mui/icons-material/ArrowBack";

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
  validateOnMount?: boolean;
  buttonStyle?: any;
  inputStyle?: any;
};

export default function Form(props: FormProps) {
  const { schema, getFormState } = props;
  const [page, setPage] = useState(1);
  const [turningToPage, setTurningToPage]: any = useState(0);
  const formRef: any = useRef(null);
  const refBody = useRef(null);
  const scrollDiv = props.scrollDiv ? props.scrollDiv : refBody;

  useEffect(() => {
    const values = formRef?.current?.values;
    if (values) getFormState(values);
    console.log("inside form reporter");
  }, []);

  // useEffect(() => {
  //   scrollToTop();
  // }, [page]);

  // function scrollToTop() {
  //   if (scrollDiv && scrollDiv.current) {
  //     scrollDiv.current.scrollTop = 0;
  //   }
  // }

  // function reloadForm() {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 20);
  // }

  async function doPageTurn(pageValue: number) {
    setTurningToPage(pageValue);
  }

  let lastPage = 1;

  if (props.paged) {
    props.schema?.forEach((s: any) => {
      if (s.page > lastPage) lastPage = s.page;
    });
  }

  function validateErrors(errors: any) {
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
  if (!schema) return <Wrap />;

  return (
    <div ref={props.formRef}>
      <Formik
        id={"order-form"}
        initialValues={props.initialValues || {}}
        onSubmit={props.onSubmit}
        validateOnMount={props.validateOnMount}
        innerRef={formRef}
        enableReinitialize={true}
        validationSchema={validator(props.schema)}
      >
        {({
          setFieldTouched,
          handleSubmit,
          values,
          resetForm,
          setValues,
          setFieldValue,
          errors,
          dirty,
          isValid,
          initialValues,
        }) => {
          return (
            <Wrap ref={refBody}>
              <FadeIn
                isMounted={!turningToPage}
                drift={20}
                direction='up'
                dismountCallback={() => {
                  setTurningToPage(0);
                  setPage(turningToPage);
                }}
              >
                <>
                  <InputWrap style={{ ...props.inputStyle }}>
                    {schema
                      ?.filter((f: any) => {
                        if (!props.paged) return true;
                        return (page > 1 && f.persistHeader) || f.page === page;
                      })
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

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                  >
                    {page > 1 ? (
                      // @ts-ignore
                      <Button
                        startIcon={<ArrowBack />}
                        variant='text'
                        disabled={props.disabled || props.loading}
                        onClick={() => {
                          doPageTurn(page - 1);
                        }}
                        loading={props.loading}
                      >
                        Back
                      </Button>
                    ) : (
                      <div />
                    )}

                    <Button
                      style={{ ...props.buttonStyle }}
                      variant='contained'
                      disabled={
                        !validateErrors(errors) ||
                        props.disabled ||
                        props.loading
                      }
                      loading={props.loading}
                      onClick={async () => {
                        if (!props.paged || lastPage === page) {
                          handleSubmit();
                        } else {
                          if (validateErrors(errors)) doPageTurn(page + 1);
                          else console.log(errors);
                        }
                      }}
                    >
                      {!props.paged
                        ? props.submitText
                        : lastPage > 1 && lastPage === page
                        ? props.submitText || "Submit"
                        : `Next (${page}/${lastPage})`}
                    </Button>
                  </div>
                </>
              </FadeIn>
            </Wrap>
          );
        }}
      </Formik>
    </div>
  );
}

const Wrap = styled.div`
  padding: 10px;
  margin-bottom: 100px;
  display: flex;
  height: inherit;
  flex-direction: column;
  align-content: center;
  flex-shrink: 0;
  flex-grow: 0;
  min-width: 300px;
`;

const InputWrap = styled.div``;

function validator(config: any) {
  const shape: any = {};
  config.forEach((field: any) => {
    if (typeof field === "object") {
      shape[field.name] = field.validator;
    }
  });
  return Yup.object().shape(shape);
}
