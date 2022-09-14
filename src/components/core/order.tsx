import { useState, useRef } from "react";
import Form from "../common/form";
import { getStripeSession } from "../../network/actions";
import { loadStripe } from "@stripe/stripe-js";

type OrderProps = {
  initialValues: any;
  schema: any;
};

type SessionResponse = {
  sessionId: string;
};

const pk =
  "pk_test_51LYb5jC4gzWsdFFD7KSV63VB7ug91qmp3DKKcjFod7zY4TYal91d44G9bGB7PK4F83W2oIESHBn9rhgTMnO4mjU5008HuwBBpc";
const stripePromise = loadStripe(pk);

export default function Order({ initialValues, schema }: OrderProps) {
  const formRef = useRef(null);

  function getPriceSum() {
    return 10000;
  }

  async function forwardToStripe(formState: any) {
    // look through form state and get
    try {
      const session: SessionResponse = await getStripeSession({
        amount: getPriceSum(),
      });

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
          console.log(e);
          forwardToStripe(e);
        }}
        initialValues={initialValues}
        schema={schema}
      />
    </>
  );
}
