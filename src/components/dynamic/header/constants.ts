
import About from "../pages/about";
import Newsletter from "../pages/newsletter";
import Order from "../pages/order";
import Shop from "../pages/shop";
import Press from "../pages/press";
import Contact from "../pages/contact";

type Header = {
  title: string,
  to?: string,
  link?: string,
  PageComponent: any
}

export const headers: Header[] = [
    
    {
      title: "About",
      to: "/about",
      PageComponent: About 
    },
    // {
    //   title: "Order A Cake",
    //   to: "/order",
    //   PageComponent: Order 
    // },
    {
      title: "Shop",
      to: "/shop",
      PageComponent: Shop 
    },
    {
      title: "Donate",
      to: "/donate",
      PageComponent: Shop 
    },
    // {
    //   title: "Press",
    //   to: "/press",
    //   PageComponent: Press 
    // },
    {
      title: "Newsletter",
      to: "/newsletter",
      PageComponent: Newsletter
    },
    {
      title: "Contact",
      to: "/contact",
      PageComponent: Contact 
    },
    
    // {
    //   title: "Cake Gallery",
    //   link: "https://www.instagram.com/lazycowbakery/",
    // },
    
  ];