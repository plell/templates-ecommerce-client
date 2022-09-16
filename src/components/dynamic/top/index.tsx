import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Img } from "../../core/ui";

export default function Top({ innerRef }: any) {
  const navigate = useNavigate();
  return (
    <TopWrap>
      <Title>Lazy Cow Bakery</Title>

      <Sub>100% plant-based</Sub>
      <Spacer />

      <Button
        variant='contained'
        style={{ fontSize: 100, background: "purple", color: "#fff7dc" }}
        size={"large"}
        onClick={() => navigate("order")}
      >
        ORDER A CAKE
      </Button>
    </TopWrap>
  );
}

const Spacer = styled.div`
  height: 60px;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 20px);
  color: #639aff;
  font-weight: 700;
  padding: 140px 10px;

  background-image: url("${(p) => "images/lazy_crew.webp"}");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Title = styled.div`
  font-size: 70px;
  // text-align: center;
  // width: 380px;
  margin-bottom: 30px;
`;

const Sub = styled.div`
  font-size: 14px;
  color: #fff;
`;
