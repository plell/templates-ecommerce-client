import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { redirect } from "../../common/helpers";
import { headers } from "./constants";

export default function Top() {
  const navigate = useNavigate();

  return (
    <>
      <Spacer />
      <Spacer />

      <Col>
        <Title>Lazy Cow Bakery</Title>
        <Spacer />
        <Sub>100% plant-based</Sub>
      </Col>
      <Spacer />
      <Row>
        {headers.map((h, i) => {
          return (
            <Link
              key={"header" + i}
              onClick={() => {
                if (h.link) redirect(h.link);
                else navigate(h.to || "/");
              }}
            >
              {h.title}
            </Link>
          );
        })}
      </Row>
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
