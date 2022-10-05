import * as Yup from "yup";
import { cakeInformation } from "../../dynamic/pages/order/constants";

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
  // {
  //   label: "Choose a Preset Cake",
  //   type: "header",
  //   page: 3,
  // },
  {
    name: "cake_design",
    label: "Cake Design",
    type: "toggleButtons",
    options: [
      cakeInformation["Baby Blue w/ Cherries"].label,
      cakeInformation["Pink Ruffle"].label,
      cakeInformation["Green Mushroom"].label,
    ],
    neverNull: true,
    page: 3,
    validator: strValidator,
  },
  {
    name: "cake_flavor",
    label: "Cake Flavor",
    type: "toggleButtons",
    options: ["Vanilla", "Chocolate", "Cardamom"],
    validator: strValidator,
    page: 3,
  },
  {
    name: "cake_compote",
    label: "Cake Compote",
    type: "toggleButtons",
    options: ["Raspberry", "Strawberry"],
    price: 5,
    page: 3,
  },
  {
    name: "cake_size",
    label: "Size",
    type: "select",
    options: ["6-inch", "8-inch"],
    prices: [40, 50],
    page: 3,
    validator: strValidator,
  },
  // baby blue can add text
  {
    name: "cake_text",
    label: "Cake Text",
    type: "text",
    // price: 3,
    page: 3,
  },
];

export const customCake = [
  {
    label: "Size and Shape",
    type: "header",
    page: 3,
  },
  {
    name: "cake_size",
    label: "Size",
    type: "select",
    options: ["6-inch", "8-inch"],
    prices: [55, 75],
    page: 3,
    validator: strValidator,
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
    label: "Trim",
    type: "header",
    page: 4,
  },
  {
    name: "cake_top",
    label: "Top Trim",
    price: 2,
    type: "toggleButtons",
    options: ["Shell", "Ruffles", "Rosettes"],
    page: 4,
  },
  {
    name: "cake_bottom",
    label: "Bottom Trim",
    price: 2,
    type: "toggleButtons",
    options: ["Shell", "Ribbon"],
    page: 4,
  },
  {
    name: "cake_side",
    label: "Side Trim",
    price: 2,
    type: "toggleButtons",
    options: [
      "Double String",
      "Single String",
      "Flat Ribbon",
      "Ribbon",
      "Ruffles",
    ],
    page: 4,
  },
  {
    label: "Flavors",
    type: "header",
    page: 5,
  },
  {
    name: "cake_flavor",
    label: "Cake Flavor",
    type: "toggleButtons",
    options: ["Vanilla", "Chocolate", "Cardamom"],
    validator: strValidator,
    page: 5,
  },
  {
    name: "cake_compote",
    label: "Cake Compote",
    type: "toggleButtons",
    options: ["Raspberry", "Strawberry"],
    price: 5,
    page: 5,
  },
  {
    label: "Decorations",
    type: "header",
    page: 6,
  },
  {
    name: "cake_decorations_cherries",
    label: "Cherries",
    price: 2,
    type: "toggleButtons",
    options: ["Cherries"],
    page: 6,
  },
  {
    name: "cake_decorations_sprinkles",
    label: "Sprinkles",
    price: 1,
    type: "toggleButtons",
    options: ["Pearls", "Rainbow"],
    page: 6,
  },
  {
    name: "cake_decorations_trim_accent",
    label: "Trim Accent",
    prices: [2, 1, 2, 1],
    type: "toggleButtons",
    options: ["Rosettes", "Shells", "Pearls", "Bows"],
    page: 6,
  },
  {
    label: "Final Touch",
    type: "header",
    page: 7,
  },
  {
    name: "cake_text",
    label: "Cake Text",
    // price: 3,
    type: "text",
    page: 7,
  },
  {
    name: "cake_color",
    label: "Cake Color",
    // price: 3,
    type: "color",
    page: 7,
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

export const shopSchema = [
  {
    name: "pickup_date",
    label: "Pickup Date",
    type: "date",
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
];

export const mailingListSchema = [
  {
    name: "email",
    label: "Email",
    type: "text",
    validator: emailValidator,
  },
];

export const contactFormSchema = [
  {
    name: "name",
    label: "Your Name",
    type: "text",
    validator: strValidator,
  },
  {
    name: "email",
    label: "Your Email",
    type: "text",
    validator: emailValidator,
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    validator: strValidator,
  },
];
