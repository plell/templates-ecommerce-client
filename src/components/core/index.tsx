import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Modal, ModalBody } from "./ui";

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
  let body = <div>failure</div>;
  if (props.success) body = <div>SUCCESS</div>;

  return (
    <Modal open={show} onClose={() => setShow(false)}>
      <ModalBody>{body}</ModalBody>
    </Modal>
  );
}
