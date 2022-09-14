export function redirect(link: string) {
    let a = document.createElement("a");
    a.href = link;
    a.target = "_blank";
    a.click();
  }