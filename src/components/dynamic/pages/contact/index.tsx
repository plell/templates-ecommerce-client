import { useState, useEffect } from "react";
import Form from "../../../core/form";
import { contactFormSchema } from "../../../core/form/schema";
import { sendContactForm } from "../../../../network/actions";
import FadeInWrapper from "../../../core/ui/hoc/fadeInWrapper";
import { useNavigate } from "react-router";

export default function Contact({ innerRef, onClose }: any) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  async function submit(formState: any) {
    setLoading(true);
    try {
      console.log("formState.email", formState.email);
      await sendContactForm(formState);
      //   setSuccess(true);
      navigate("/");
    } catch {}
    setLoading(false);
  }

  return (
    <FadeInWrapper title={"Contact"} path='/contact'>
      <>
        <div style={{ height: 100 }} />
        <Form
          initialValues={{}}
          getFormState={(e) => console.log("e", e)}
          schema={contactFormSchema}
          onSubmit={submit}
          submitText={"Send"}
          loading={loading}
        />
      </>
    </FadeInWrapper>
  );
}
