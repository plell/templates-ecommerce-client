import { useState } from "react";
import styled from "styled-components";
import Form from "../../../core/form";
import { mailingListSchema } from "../../../core/form/schema";
import { submitToMailingList } from "../../../../network/actions";
import {
  Wrap,
  Row,
  TextField,
  Modal,
  ModalBody,
  Button,
  Title,
} from "../../../core/ui";

export default function Newsletter({ innerRef }: any) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submitEmail(formState: any) {
    setLoading(true);
    try {
      console.log("formState.email", formState.email);
      await submitToMailingList(formState);
      setSuccess(true);
    } catch {}
    setLoading(false);
  }

  return (
    <Wrap ref={innerRef} style={{ background: "#d9fff6" }}>
      <Title>Join our newsletter!</Title>

      <Txt>
        You'll be the first to know about seasonal menu changes, special events,
        and more!
      </Txt>

      <Form
        initialValues={{}}
        getFormState={(e) => console.log("e", e)}
        schema={mailingListSchema}
        onSubmit={submitEmail}
        submitText={"Join"}
        loading={loading}
      />

      <Modal open={success} onClose={() => setSuccess(false)}>
        <ModalBody style={{ minHeight: 0 }}>
          Thanks for your interest! You've been added to our mailing list.
        </ModalBody>
      </Modal>
    </Wrap>
  );
}

const Txt = styled.div`
  margin-bottom: 30px;
  font-weight: 300;
`;
