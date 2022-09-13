import api from "./api";

export async function getStripeSession() {
    const res = await api.post("stripe/createSessionByCustomer", {
        amount: 10000,
    });
    
    
  
    return res
}