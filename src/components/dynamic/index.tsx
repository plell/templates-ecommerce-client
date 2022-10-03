import Pages from "./pages";
import Top from "./top";
import Bottom from "./bottom";
import Header from "./header";
import { Wrap } from "../core/ui";
import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

export default function Content() {
  const scrollRef: any = useRef();
  const bottomRef: any = useRef();
  const location = useLocation();
  const path = location.pathname;

  const [scrollTop, setScrollTop] = useState(0);

  function doScroll(e: any) {
    setScrollTop(e.target.scrollTop);
  }

  return (
    <Wrap
      onScroll={doScroll}
      ref={scrollRef}
      style={{
        height: "100%",
        background: "#ffffff",
        overflow: path === "/order" ? "hidden" : "auto",
        overflowX: "hidden",
      }}
    >
      <Header scrollTop={scrollTop} />
      <Top />
      <Pages />
      <Bottom innerRef={bottomRef} />
    </Wrap>
  );
}
