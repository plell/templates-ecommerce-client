import { useState } from "react";
import Form from "./form";
import { getStripeAmountSession } from "../../network/actions";
import { loadStripe } from "@stripe/stripe-js";
import { getPriceFromFormForStripe } from "../core/helpers";
import { SessionResponse } from "../../types";

type OrderProps = {
  initialValues: any;
  schema: any;
  inputStyle?: any;
  getFormState: (values: any) => void;
};

const pk = process.env.REACT_APP_STRIPE_PUBLIC_KEY || "none";
const stripePromise = loadStripe(pk);

export default function Order({
  initialValues,
  schema,
  getFormState,
  inputStyle,
}: OrderProps) {
  const [loading, setLoading] = useState(false);

  function cleanForm(formValues: any) {
    const f: any = {};
    schema?.forEach((s: any) => {
      const key = s.name;
      if (!key || !formValues[key]) return;
      f[key] = formValues[key];
    });
    return f;
  }

  async function forwardToStripe(formValues: any) {
    // remove values not included in current schema (schemas sometimes change)
    const form = cleanForm(formValues);
    try {
      setLoading(true);
      const amount = getPriceFromFormForStripe(schema, form);

      const session: SessionResponse = await getStripeAmountSession({
        amount,
        form,
      });
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe didnt load");
      await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <Form
      paged
      inputStyle={inputStyle}
      loading={loading}
      getFormState={getFormState}
      validateOnMount={true}
      onSubmit={(e: any) => {
        forwardToStripe(e);
      }}
      initialValues={initialValues}
      submitText={"Checkout"}
      schema={schema}
    />
  );
}
