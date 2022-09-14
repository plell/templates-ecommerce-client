import api from "./api";

type stripeSessionInput = {
    amount: number,
}

export async function getStripeSession(data: stripeSessionInput) {
    const res = await api.post("stripe/createSessionByCustomer", data);
    return res
}