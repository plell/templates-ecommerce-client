import api from "./api";

type stripeSessionInput = {
    amount: number,
}

export async function getStripeSession(data: stripeSessionInput) {
    const res = await api.post("stripe/createSessionByCustomer", data);
    return res
}

type mailingListInput = {
    email: string,
}

export async function submitToMailingList(data: mailingListInput) {
    const res = await api.post(`mail/join/${data.email}`);
    return res
}

export async function getShopItemsFromStripe() {
    const res = await api.get(`stripe/items`);
    return res
}