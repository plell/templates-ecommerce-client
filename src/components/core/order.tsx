import { useRef } from "react";
import Form from "./form";
import { getStripeSession } from "../../network/actions";
import { loadStripe } from "@stripe/stripe-js";
import { getPriceFromFormForStripe } from "../core/helpers";

type OrderProps = {
  initialValues: any;
  schema: any;
};

type SessionResponse = {
  sessionId: string;
};

const pk = process.env.REACT_APP_STRIPE_PUBLIC_KEY || "none";
const stripePromise = loadStripe(pk);

export default function Order({ initialValues, schema }: OrderProps) {
  const formRef = useRef(null);

  async function forwardToStripe(formValues: any) {
    const amount = getPriceFromFormForStripe(schema, formValues);
    try {
      const session: SessionResponse = await getStripeSession({ amount });

      const stripe = await stripePromise;

      if (!stripe) throw new Error("Stripe didnt load");

      await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Form
        paged
        formRef={formRef}
        onSubmit={(e: any) => {
          forwardToStripe(e);
        }}
        initialValues={initialValues}
        schema={schema}
      />
    </>
  );
}
