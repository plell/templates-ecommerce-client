import api from "./api";

type stripeAmountSessionInput = {
    amount: number,
}

type stripeProductSessionInput = {
    products: any,
    customer:any
}

export async function getStripeAmountSession(data: stripeAmountSessionInput) {
    const res = await api.post("stripe/createAmountSessionByCustomer", data);
    return res
}

export async function getStripeProductSession(data: stripeProductSessionInput) {
    const res = await api.post("stripe/createProductSessionByCustomer", data);
    return res
}

type mailingListInput = {
    email: string,
}

export async function submitToMailingList(data: mailingListInput) {
    const res = await api.post(`mail/join/${data.email}`);
    return res
}

export async function getProductsFromStripe() {
    const res = await api.get(`stripe/products`);
    return res
}