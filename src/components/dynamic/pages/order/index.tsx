import { useState } from "react";
import styled from "styled-components";
import {
  cakeSchema,
  cakeSchemaSwitcher,
  cakeTypes,
} from "../../../core/form/schema";
import { initialValues, doCakeImages, cakeImages } from "./constants";
import Order from "../../../core/order";
import { Img, Row } from "../../../core/ui";

export default function OrderWrapper() {
  const [formState, setFormState]: any = useState({});
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

  const imgs: string[] = doCakeImages(schema, formState);

  if (!imgs.length) imgs.push(cakeImages["cake_base_Round"]);

  return (
    <div style={{ minHeight: 800 }}>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: 40,
          marginBottom: 40,
        }}
      >
        Order a Cake
      </div>

      <Row>
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
    </div>
  );
}

const Cake = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-grow: 0;
  max-height: 400px;
  min-width: 450px;
  background: #eee;
  border-radius: 20px;
`;
