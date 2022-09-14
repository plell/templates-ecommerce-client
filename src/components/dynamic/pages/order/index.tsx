import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import {
  cakeSchema,
  customCake,
  presetCake,
} from "../../../common/form/schema";

import { Button, Modal } from "@mui/material";
import Order from "../../../core/order";

import { Img, Wrap } from "../../../common/ui";

const cakeDesignSchemas: any = {
  preset: presetCake,
  custom: customCake,
};

const presetCakes = [
  {
    img: "cake/example cakes/baby blue with cherries.png",
  },
  {
    img: "cake/example cakes/mushroom cake.png",
  },
  {
    img: "cake/example cakes/pastel pink with ruffles.png",
  },
];

const initialValues = {
  cake_size: "8-inch",
  cake_compote: "No Compote",
  cake_flavor: "Cardamom",
  cake_shape: "Round",
};

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

      <Wrap>
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
      </Wrap>
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
