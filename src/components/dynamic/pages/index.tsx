import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import About from "./about";
import Newsletter from "./newsletter";
import Order from "./order";
import Shop from "./shop";
import Press from "./press";
import { Wrap } from "../../core/ui";
import Contact from "./contact";

export default function Dynamic() {
  const page1 = useRef();
  const page2 = useRef();
  const page3 = useRef();

  const refsByRoute: any = {
    "/about": page1,
    "/press": page2,
    "/newsletter": page3,
  };

  const location = useLocation();

  useEffect(() => {
    const thisRef = refsByRoute[location.pathname];
    if (thisRef) {
      thisRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <Wrap>
      <About innerRef={page1} />
      <Press innerRef={page2} />
      <Newsletter innerRef={page3} />

      <Order />
      <Shop />

      {/* <Contact /> */}
    </Wrap>
  );
}
