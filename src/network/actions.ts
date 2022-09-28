import api from "./api";

type stripeAmountSessionInput = {
    amount: number,
    form:any
}

type stripeProductSessionInput = {
    products: any,
    form:any
}

export async function getStripeAmountSession(data: stripeAmountSessionInput) {
    const res = await api.post("stripe/createAmountSessionByCustomer", data);
    console.log('res',res)
    return res
}

export async function getStripeProductSession(data: stripeProductSessionInput) {
    const res = await api.post("stripe/createProductSessionByCustomer", data);
    console.log('res',res)
    return res
}

type mailingListInput = {
    email: string,
}

export async function submitToMailingList(data: mailingListInput) {
    const res = await api.post(`email/subscribe`,data);
    return res
}

type contactFormInput = {
    email: string,
    name: string,
    message: string
}

export async function sendContactForm(data: contactFormInput) {
    const res = await api.post(`email/contact`,data);
    return res
}



export async function getProductsFromStripe() {
    const res = await api.get(`stripe/products`);
    return res
}