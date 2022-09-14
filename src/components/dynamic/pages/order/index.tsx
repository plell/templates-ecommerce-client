import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { cakeSchema } from "../../../core/form/schema";
import { cakeDesignSchemas, presetCakes, initialValues } from "./constants";

import Order from "../../../core/order";

import { Img, Row, Wrap, Button } from "../../../core/ui";

export default function OrderWrapper() {
  const [cakeType, setCakeType] = useState("preset");

  let schema: any = [...cakeSchema, ...cakeDesignSchemas[cakeType]];

  const elementIndex = schema.findIndex((f: any) => f.type === "element");

  if (elementIndex > -1) {
    schema[elementIndex].element = (
      <Button
        variant='text'
        style={{ marginBottom: 20 }}
        onClick={() => setCakeType(cakeType === "custom" ? "preset" : "custom")}
      >
        {cakeType === "custom" ? "Choose Your Cake?" : "Design Your Own Cake?"}
      </Button>
    );
  }

  return (
    <div>
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
          {presetCakes.map((c, i) => {
            return (
              <Img
                key={"img" + i}
                src={c.img}
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
        <div style={{ width: 70 }} />
        <div style={{ display: "flex", width: 380 }}>
          <Order initialValues={initialValues} schema={schema} />
        </div>
      </Row>
    </div>
  );
}

const Cake = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 360px;
  width: 360px;
`;
