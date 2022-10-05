import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Col, Modal, ModalBody } from "./ui";

export default function Core() {
  return (
    <Routes>
      <Route path='success' element={<PaymentModal success />} />
      <Route path='fail' element={<PaymentModal />} />
    </Routes>
  );
}

function PaymentModal(props: { success?: boolean }) {
  const [show, setShow] = useState(true);
  let body = <div>Payment was cancelled.</div>;
  if (props.success)
    body = (
      <Col style={{ alignItems: "center" }}>
        <div style={{ marginBottom: 20, fontWeight: 500 }}>
          Thanks for your purchase!
        </div>
        <div style={{ fontWeight: 300 }}>
          Order details and receipt sent to your email.
        </div>
      </Col>
    );

  return (
    <Modal open={show} onClose={() => setShow(false)}>
      <ModalBody>{body}</ModalBody>
    </Modal>
  );
}
