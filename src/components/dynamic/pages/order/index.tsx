import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  cakeSchema,
  cakeSchemaSwitcher,
  cakeTypes,
} from "../../../core/form/schema";
import { initialValues, doCakeImages, cakeImages } from "./constants";
import Order from "../../../core/order";
import { Img, Wrap, Row, FadeIn, IconButton } from "../../../core/ui";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { getPriceFromForm } from "../../../core/helpers";
import { Close } from "@mui/icons-material";

export default function OrderWrapper({ innerRef }: any) {
  const [showOrder, setShowOrder] = useState(false);
  const [formState, setFormState]: any = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  useEffect(() => {
    const orderVisibleState = path === "/order";
    setShowOrder(orderVisibleState);
  }, [path]);

  function getFormState(values: any) {
    setFormState(values);
  }

  let schema: any[] = [...cakeSchema];
  if (formState?.cake_type) {
    schema = [...cakeSchema, ...cakeSchemaSwitcher[formState.cake_type]];
  }

  if (
    formState?.cake_type === cakeTypes.preset.label &&
    formState?.cake_design === "Green Mushroom"
  ) {
    const textIndex = schema.findIndex((f: any) => f.name === "cake_text");
    schema.splice(textIndex, 1);
  }

  if (formState?.cake_type === cakeTypes.preset.label) {
    initialValues["cake_base"] = "Round";
  }

  const imgs: string[] = doCakeImages(schema, formState);

  if (!imgs.length) imgs.push(cakeImages["cake_base_Round"]);

  const headerPadding = 20;
  const headerHeight = 100 - headerPadding * 2;
  return (
    <FadeIn
      fullScreen
      drift={40}
      direction='up'
      style={{ overflow: "hidden", zIndex: 400 }}
      isMounted={showOrder}
      dismountCallback={() => {
        navigate("/top");
      }}
    >
      <>
        <Header style={{ height: headerHeight, padding: headerPadding }}>
          <IconButton onClick={() => setShowOrder(false)}>
            <Close style={{ fontSize: 40 }} />
          </IconButton>

          <Title>Order a Cake</Title>

          <Total>
            TOTAL:{" "}
            <Price>${getPriceFromForm(schema, formState).toFixed(2)} USD</Price>
          </Total>
        </Header>

        <Wrap
          ref={innerRef}
          style={{
            height: `calc(100vh - ${headerHeight}px`,
            overflow: "auto",
          }}
        >
          <Row
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Cake>
              {imgs.map((c, i) => {
                return (
                  <Img
                    key={"img" + i}
                    src={`cake/${c}`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                );
              })}
            </Cake>
            <div style={{ width: 50 }} />
            <div style={{ display: "flex", width: 420 }}>
              <Order
                getFormState={getFormState}
                initialValues={initialValues}
                schema={schema}
              />
            </div>
          </Row>
        </Wrap>
      </>
    </FadeIn>
  );
}

const Cake = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 450px;
  width: 450px;
  height: 450px;
  background: #eee;
  border-radius: 20px;
  margin-top: -60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
`;

const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: #00000099;
  font-size: 15px;
`;

const Price = styled.div`
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  color: #000;
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  color: #000;
`;
