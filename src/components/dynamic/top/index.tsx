import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Img, Wrap } from "../../core/ui";

export default function Top() {
  const navigate = useNavigate();

  return (
    <TopWrap>
      <Img
        src={"images/cake_movie.gif"}
        style={{
          transition: "opacity 1s",
          height: 600,
          minHeight: 500,
          backgroundSize: "cover",
        }}
      />

      <Wrap style={{ position: "absolute" }}>
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
      </Wrap>
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
  position: relative;
  align-items: center;
  width: 100%;
  color: #639aff;
  font-weight: 700;
  // overflow: hidden;
`;

const Title = styled.div`
  font-size: 70px;
  text-align: center;
  // width: 380px;
  margin-bottom: 10px;
  z-index: 1;
  -webkit-text-stroke: 2px black;
`;

const Sub = styled.div`
  font-size: 28px;
  color: #fff7dc;
  -webkit-text-stroke: 1px black;
  z-index: 1;
`;
