import { useState } from "react";
import styled from "styled-components";
import Form from "../../../core/form";
import { mailingListSchema } from "../../../core/form/schema";
import { submitToMailingList } from "../../../../network/actions";
import { Wrap, Modal, ModalBody, Title, Col } from "../../../core/ui";

export default function Newsletter({ innerRef }: any) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submitEmail(formState: any) {
    setLoading(true);
    try {
      console.log("formState.email", formState.email);
      await submitToMailingList(formState);
      setSuccess(true);
    } catch (e) {
      console.log("failed", e);
    }
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
          <Col style={{ alignItems: "center" }}>
            <div style={{ marginBottom: 20, fontWeight: 500 }}>
              Thanks for your interest!
            </div>
            <div style={{ fontWeight: 300 }}>
              You've been added to our mailing list.
            </div>
          </Col>
        </ModalBody>
      </Modal>
    </Wrap>
  );
}

const Txt = styled.div`
  font-weight: 300;
  padding: 30px;
`;
