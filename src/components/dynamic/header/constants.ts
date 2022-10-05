
type Header = {
  title: string,
  to?: string,
  link?:string
}

export const headers: Header[] = [
    
    {
      title: "About",
      to: "/about",
  },
  {
    title: "Order A Cake",
    to: "/order",
  },
  {
    title: "Shop",
    to: "/shop",
  },
    {
      title: "Press",
      to: "/press",
    },
    {
      title: "Newsletter",
      to: "/newsletter",
    },
    // {
    //   title: "Contact",
    //   to: "/contact",
    // },
    
    // {
    //   title: "Cake Gallery",
    //   link: "https://www.instagram.com/lazycowbakery/",
    // },
    
  ];