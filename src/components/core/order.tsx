import { useLayoutEffect, useRef } from "react";
import Form from "./form";
import { getStripeSession } from "../../network/actions";
import { loadStripe } from "@stripe/stripe-js";
import { getPriceFromFormForStripe } from "../core/helpers";

type OrderProps = {
  initialValues: any;
  schema: any;
  getFormState: (values: any) => void;
};

type SessionResponse = {
  sessionId: string;
};

const pk = process.env.REACT_APP_STRIPE_PUBLIC_KEY || "none";
const stripePromise = loadStripe(pk);

export default function Order({
  initialValues,
  schema,
  getFormState,
}: OrderProps) {
  const formRef: any = useRef(null);
  const formInnerRef: any = useRef(null);

  useLayoutEffect(() => {
    if (formRef?.current)
      formRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [formRef?.current]);

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
    <Form
      paged
      formRef={formRef}
      formInnerRef={formInnerRef}
      getFormState={getFormState}
      onSubmit={(e: any) => {
        forwardToStripe(e);
      }}
      initialValues={initialValues}
      schema={schema}
    />
  );
}
