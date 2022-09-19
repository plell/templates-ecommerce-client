import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const rq = "Required";
const phoneValidator = Yup.string()
  .max(10)
  .matches(phoneRegExp, "Phone number is not valid")
  .required(rq);
const strValidator = Yup.string().trim().nullable().required(rq);
const nomValidator = Yup.number().required(rq);
const emailValidator = Yup.string().email("Not a valid email").required(rq);
const strValidatorNotRequired = Yup.string().trim();
const repoStrValidator = Yup.string()
  .trim()
  .matches(/^[^\/]+\/[^\/]+$/, "Incorrect format")
  .required("Required");

export const presetCake = [
  {
    label: "Choose a Preset Cake",
    type: "header",
    page: 3,
  },
  {
    name: "cake_design",
    label: "Cake Design",
    type: "toggleButtons",
    options: ["Baby Blue w/ Cherries", "Pink Ruffle", "Green Mushroom"],
    page: 3,
    validator: strValidator,
  },
  // baby blue can add text
  {
    name: "cake_text",
    label: "Cake Text",
    type: "text",
    price: 3,
    page: 3,
  },
];

export const customCake = [
  {
    label: "Design Your Own Cake",
    type: "header",
    page: 3,
  },
  {
    name: "cake_base",
    label: "Base",
    type: "toggleButtons",
    options: ["Heart", "Round"],
    neverNull: true,
    page: 3,
    validator: strValidator,
  },
  {
    name: "cake_top",
    label: "Top Trim",
    type: "toggleButtons",
    options: ["Shell", "Ruffles", "Rosettes"],
    page: 3,
  },
  {
    name: "cake_bottom",
    label: "Bottom Trim",
    type: "toggleButtons",
    options: ["Shell", "Ruffles", "Heart Line"],
    page: 3,
  },
  {
    name: "cake_side",
    label: "Side Trim",
    type: "toggleButtons",
    options: [
      "Double String",
      "Single String",
      "Flat Ribbon",
      "Ribbon",
      "Ruffles",
    ],
    page: 3,
  },
  {
    label: "Decorations",
    type: "subheader",
    page: 4,
  },
  {
    name: "cake_decorations_cherries",
    label: "Cherries",
    price: 5,
    type: "toggleButtons",
    options: ["Cherries"],
    page: 4,
  },
  {
    name: "cake_decorations_sprinkles",
    label: "Sprinkles",
    price: 5,
    type: "toggleButtons",
    options: ["Pearls", "Rainbow"],
    page: 4,
  },
  {
    name: "cake_decorations_trim_accent",
    label: "Trim Accent",
    price: 5,
    type: "toggleButtons",
    options: ["Bows", "Pearls", "Rosettes"],
    page: 4,
  },
  {
    label: "Final Touch",
    type: "subheader",
    page: 5,
  },
  {
    name: "cake_text",
    label: "Cake Text",
    price: 3,
    type: "text",
    page: 5,
  },
];

// change cake lables here!
export const cakeTypes = {
  preset: {
    schema: presetCake,
    label: "Choose a Preset Cake",
  },
  custom: {
    schema: customCake,
    label: "Design Your Own Cake",
  },
};

export const cakeSchemaSwitcher = {
  [cakeTypes.preset.label]: cakeTypes.preset.schema,
  [cakeTypes.custom.label]: cakeTypes.custom.schema,
};

export const cakeSchema = [
  {
    name: "cake_size",
    label: "Size",
    type: "select",
    options: ["6-inch", "8-inch"],
    prices: [55, 75],
    page: 1,
    validator: strValidator,
  },
  {
    name: "pickup_date",
    label: "Pickup Date",
    type: "date",
    page: 1,
    validator: strValidator,
  },
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    page: 1,
    validator: strValidator,
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    page: 1,
    validator: strValidator,
  },
  {
    name: "phone",
    label: "Phone",
    type: "number",
    page: 1,
    validator: phoneValidator,
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    page: 1,
    validator: emailValidator,
  },
  {
    name: "cake_type",
    label: "",
    options: [cakeTypes.preset.label, cakeTypes.custom.label],
    neverNull: true,
    type: "toggleButtons",
    page: 2,
    validator: strValidator,
  },
];

export const mailingListSchema = [
  {
    name: "email",
    label: "Email",
    type: "text",
    validator: emailValidator,
  },
];
