import { useState } from "react";
import Form from "./form";
import { getStripeAmountSession } from "../../network/actions";
import { loadStripe } from "@stripe/stripe-js";
import { getPriceFromFormForStripe } from "../core/helpers";
import { SessionResponse } from "../../types";

type OrderProps = {
  initialValues: any;
  schema: any;
  getFormState: (values: any) => void;
};

const pk = process.env.REACT_APP_STRIPE_PUBLIC_KEY || "none";
const stripePromise = loadStripe(pk);

export default function Order({
  initialValues,
  schema,
  getFormState,
}: OrderProps) {
  const [loading, setLoading] = useState(false);

  async function forwardToStripe(formValues: any) {
    try {
      setLoading(true);
      const amount = getPriceFromFormForStripe(schema, formValues);
      const session: SessionResponse = await getStripeAmountSession({ amount });
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
