import { useState, useEffect } from "react";
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
  const [imgs, setImgs]: any = useState([]);

  const isMobile = useIsMobile();

  function getFormState(values: any) {
    setFormState(values);
  }

  let schema: any[] = [...cakeSchema];
  if (formState?.cake_type) {
    schema = [...cakeSchema, ...cakeSchemaSwitcher[formState.cake_type]];
  }

  useEffect(() => {
    const images: string[] = doCakeImages(schema, formState);
    if (!images.length) images.push(cakeImages["cake_base_Round"]);
    setImgs(images);
  }, [formState]);

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
        <div
          style={{
            padding: 20,
            fontWeight: 300,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          <div>Please Read Before Ordering:</div>
          <div
            style={{
              margin: "10px 0 40px",
              fontWeight: 400,
              color: "#4d8dff",
            }}
          >
            <div style={{ marginBottom: 10 }}>
              <i>Cake pickup hours are 1-4pm on the date you selected.</i>
            </div>
            <div style={{ marginBottom: 10 }}>
              Cake orders must be placed at least 48-hours in advance. The pink
              color on the example cake pictured is for illustration purposes,
              your cake may not be pink. No-shows will be held for one day
              unless we are contacted. Pickup instructions will also be sent out
              in a confirmation email.
            </div>
            <div>
              ALLERGEN WARNING: Cakes contain GLUTEN and SOY. We do not make
              gluten free cakes.
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          <Cake isMobile={isMobile}>
            {imgs.map((c: any, i: number) => {
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
              inputStyle={{ width: 300 }}
              getFormState={getFormState}
              initialValues={initialValues}
              schema={schema}
            />
          </div>
        </div>
        <div style={{ minHeight: 100 }} />
      </>
    </FadeInWrapper>
  );
}

type CakeProps = {
  isMobile: boolean;
};

const Cake = styled.div<CakeProps>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  ${(p) =>
    p.isMobile
      ? `
      
  min-width: 200px;
  width: 200px;
    height: 200px;
    margin-bottom:20px;
    `
      : `
    min-width: 450px;
    width: 450px;
    height: 450px;`}

  background: #eee;
  border-radius: 20px;
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
