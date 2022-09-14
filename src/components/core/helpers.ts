import { PRODUCT_BASE_PRICE } from "../../constants";

export function redirect(link: string) {
    let a = document.createElement("a");
    a.href = link;
    a.target = "_blank";
    a.click();
}
  
export function getPriceFromForm(schema: any, values:any) {
  let priceSum = PRODUCT_BASE_PRICE || 0;
  schema?.forEach((s: any) => {
    const currentValue = values[s.name];
    if (currentValue && s.price) priceSum += s.price;
  });
  return priceSum
}

export function getPriceFromFormForStripe(schema: any, values:any) {
  let priceSum = PRODUCT_BASE_PRICE || 0;
  schema?.forEach((s: any) => {
    const currentValue = values[s.name];
    if (currentValue && s.price) priceSum += s.price;
  });
  return priceSum*100
}