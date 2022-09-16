import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Home from "./home";
import About from "./about";
import Newsletter from "./newsletter";
import Order from "./order";
import Press from "./press";
import { Wrap } from "../../core/ui";

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
  const path = location.pathname;

  useEffect(() => {
    const thisRef = refsByRoute[path];
    if (thisRef) {
      thisRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [path]);

  return (
    <Wrap>
      <About innerRef={page1} />

      <Press innerRef={page2} />

      <Newsletter innerRef={page3} />

      {/* <Home innerRef={page5} /> */}

      <Order />
    </Wrap>
  );
}
