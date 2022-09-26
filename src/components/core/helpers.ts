
export function redirect(link: string) {
    let a = document.createElement("a");
    a.href = link;
    a.target = "_blank";
    a.click();
}
  
export function getPriceFromForm(schema: any, values:any) {
  let priceSum = 0;
  schema?.forEach((s: any) => {
    const currentValue = values[s.name];
    if (currentValue && s.prices) {
      const index = s.options.findIndex((f: string) => f === currentValue)
      priceSum += s.prices[index]
    } else if (currentValue && s.price) {
      priceSum += s.price;
    }
  });
  return priceSum
}

export function getPriceFromFormForStripe(schema: any, values: any) {
  // stripe uses cents with no decimals
  return getPriceFromForm(schema, values) * 100
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));