import * as Yup from "yup";
import React from "react";

const strValidator = Yup.string().trim().required("Required");
const strValidatorNotRequired = Yup.string().trim();
const repoStrValidator = Yup.string()
  .trim()
  .matches(/^[^\/]+\/[^\/]+$/, "Incorrect format")
  .required("Required");

export const presetCake = [
  {
    type: "element",
    element: <div />,
    page: 2,
  },
  {
    label: "Choose your Cake",
    type: "header",
    page: 2,
  },
  {
    name: "cake_size",
    label: "Size",
    type: "select",
    options: ["6-inch", "8-inch"],
    prices: [55, 75],
    page: 2,
  },
  {
    name: "cake_base",
    label: "Base",
    type: "toggleButtons",
    options: ["Heart", "Round"],
    page: 2,
  },
  {
    name: "cake_design",
    label: "Design",
    type: "toggleButtons",
    options: ["Pink Ruffle", "Baby Blue", "Mushroom Cake"],
    page: 2,
  },
  // ruffle and baby can add text
  {
    name: "cake_text",
    label: "Cake Text",
    type: "text",
    price: 3,
    page: 2,
  },
];

export const customCake = [
  {
    type: "element",
    element: <div />,
    page: 2,
  },
  {
    label: "Design Your Own Cake",
    type: "header",
    page: 2,
    persistHeader: true,
  },
  {
    name: "cake_size",
    label: "Size",
    type: "select",
    options: ["6-inch", "8-inch"],
    prices: [55, 75],
    page: 2,
  },
  {
    name: "cake_top",
    label: "Top",
    type: "toggleButtons",
    options: ["Shell", "Heart Line", "Rosettes"],
    page: 2,
  },
  {
    name: "cake_bottom",
    label: "Bottom",
    type: "toggleButtons",
    options: ["Shell", "Heart Line", "Rosettes"],
    page: 2,
  },
  {
    name: "cake_side",
    label: "Side",
    type: "toggleButtons",
    options: ["Shell", "Heart Line", "Rosettes"],
    page: 2,
  },
  {
    label: "Accents",
    type: "subheader",
    page: 3,
  },
  {
    name: "cake_trim_accent",
    label: "Trim Accent",
    price: 5,
    type: "toggleButtons",
    options: ["Bows", "Pearls", "Rosettes", "Shell"],
    page: 3,
  },
  {
    name: "cake_string_accent",
    label: "Single/Double String Accent",
    price: 5,
    type: "toggleButtons",
    options: ["Bows", "Pearls", "Rosettes", "Shell"],
    page: 3,
  },
  {
    name: "cake_flat_ribbon_accent",
    label: "Flat Ribbon Accent",
    price: 5,
    type: "toggleButtons",
    options: ["Bows", "Pearls", "Rosettes", "Shell"],
    page: 3,
  },
  {
    label: "Final Touch",
    type: "subheader",
    page: 4,
  },
  {
    name: "cake_text",
    label: "Cake Text",
    price: 3,
    type: "text",
    page: 4,
  },
  {
    name: "cake_topping",
    label: "Cake Topping",
    type: "toggleButtons",
    price: 3,
    options: ["Sprinkles", "Pearls"],
    page: 4,
  },
];

export const cakeSchema = [
  {
    label: "Order a Cake!",
    type: "header",
    page: 1,
  },
  {
    name: "name",
    label: "Your Name",
    type: "text",
    page: 1,
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    page: 1,
  },
  {
    name: "phone",
    label: "Phone",
    type: "number",
    page: 1,
  },
  {
    name: "pickup_date",
    label: "Pickup Date",
    type: "date",
    page: 1,
  },
];
