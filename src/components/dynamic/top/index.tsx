import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { redirect } from "../../core/helpers";
import { headers } from "./constants";
import { Modal, ModalBody, Button } from "../../core/ui";
import OrderWrapper from "../pages/order";

export default function Top() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <>
      <Spacer />
      <Spacer />

      <Col>
        <Title>Lazy Cow Bakery</Title>
        <Spacer />
        <Sub>100% plant-based</Sub>
        {/* <Spacer />
        <Button onClick={() => setShowModal(true)}>ORDER A CAKE</Button> */}
      </Col>
      <Spacer />
      <Row>
        {headers.map((h, i) => {
          const selected = currentPath === h.to;
          return (
            <Button
              key={"header" + i}
              style={{
                fontWeight: 900,
                color: selected ? "#be9514" : null,
              }}
              onClick={() => {
                if (h.link) redirect(h.link);
                else navigate(h.to || "/");
              }}
            >
              {h.title.toUpperCase()}
            </Button>
          );
        })}
      </Row>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <ModalBody>
          <OrderWrapper />
        </ModalBody>
      </Modal>
    </>
  );
}

const Link = styled.div`
  cursor: pointer;
  letter-spacing: -0.2px;
`;

const Spacer = styled.div`
  height: 30px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #639aff;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
  color: #639aff;
  font-weight: 700;
  text-transform: uppercase;
`;

const Title = styled.div`
  font-size: 50px;
  text-align: center;
  width: 300px;
`;

const Sub = styled.div`
  font-size: 14px;
  color: #000;
`;
