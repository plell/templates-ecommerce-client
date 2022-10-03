import { useState } from "react";
import styled from "styled-components";
import {
  cakeSchema,
  cakeSchemaSwitcher,
  cakeTypes,
} from "../../../core/form/schema";
import {
  initialValues,
  doCakeImages,
  cakeImages,
  cakeInformation,
} from "./constants";
import Order from "../../../core/order";
import { Img, Row } from "../../../core/ui";
import { getPriceFromForm } from "../../../core/helpers";
import FadeInWrapper from "../../../core/ui/hoc/fadeInWrapper";
import { useIsMobile } from "../../../../hooks";

export default function OrderWrapper() {
  const [formState, setFormState]: any = useState({});

  const isMobile = useIsMobile();

  function getFormState(values: any) {
    setFormState(values);
  }

  let schema: any[] = [...cakeSchema];
  if (formState?.cake_type) {
    schema = [...cakeSchema, ...cakeSchemaSwitcher[formState.cake_type]];
  }

  // remove cake text from green mushroom
  if (
    formState?.cake_type === cakeTypes.preset.label &&
    formState?.cake_design === cakeInformation["Green Mushroom"].label
  ) {
    const cakeTextIndex = schema.findIndex((f: any) => f.name === "cake_text");
    if (cakeTextIndex > -1) schema.splice(cakeTextIndex, 1);
  }

  // adjust cake base prices
  if (
    formState?.cake_type === cakeTypes.preset.label &&
    (formState?.cake_design === cakeInformation["Green Mushroom"].label ||
      formState?.cake_design === cakeInformation["Pink Ruffle"].label)
  ) {
    const cakeSizeIndex = schema.findIndex((f: any) => f.name === "cake_size");
    if (cakeSizeIndex > -1) schema[cakeSizeIndex].prices = [60, 70];
  } else {
    const cakeSizeIndex = schema.findIndex((f: any) => f.name === "cake_size");
    if (cakeSizeIndex > -1) schema[cakeSizeIndex].prices = [40, 50];
  }

  if (formState?.cake_type === cakeTypes.preset.label) {
    initialValues["cake_base"] = "Round";
  }

  const imgs: string[] = doCakeImages(schema, formState);

  if (!imgs.length) imgs.push(cakeImages["cake_base_Round"]);

  const headerControls = (
    <Total>
      SUBTOTAL:{" "}
      <Price>${getPriceFromForm(schema, formState).toFixed(2)} USD</Price>
    </Total>
  );

  return (
    <FadeInWrapper
      title='Order a Cake'
      path='/order'
      headerControls={headerControls}
    >
      <>
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
                  src={`images/cake/${c}`}
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
          {!isMobile && <div style={{ width: 50 }} />}
          <div style={{ display: "flex", maxWidth: 420 }}>
            <Order
              getFormState={getFormState}
              initialValues={initialValues}
              schema={schema}
            />
          </div>
        </Row>
      </>
    </FadeInWrapper>
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
