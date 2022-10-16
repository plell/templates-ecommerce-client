import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import { Wrap } from "../../core/ui";
import { headers } from "../header/constants";

export default function Dynamic() {
  const page1 = useRef();
  const page2 = useRef();
  const page3 = useRef();
  // const page4 = useRef();
  // const page5 = useRef();
  // const page6 = useRef();

  // const refGroup = [page1, page2, page3, page4, page5, page6];

  // scroller refs
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
      {headers.map((page: any, i: number) => {
        const { PageComponent, to } = page;
        return (
          <PageComponent key={i + "pagecomponent"} innerRef={refsByRoute[to]} />
        );
      })}
    </Wrap>
  );
}
