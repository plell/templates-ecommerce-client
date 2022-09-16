import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { redirect } from "../../core/helpers";
import { headers } from "./constants";
import { Button, FadeIn, Img, Row } from "../../core/ui";

export default function Header({ innerRef, scrollTop }: any) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const headerHeight = 60;

  const header = (
    <Row
      ref={innerRef}
      style={{
        height: headerHeight,
        width: "calc(100% - 40px)",
        padding: "5px 20px",
        background: "#fff7dc",
        justifyContent: "space-between",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Img
        src={"cowbaby.webp"}
        style={{ height: 60, width: 60, marginRight: 20 }}
      />
      <>
        {headers.map((h: any, i: number) => {
          const selected = currentPath === h.to;
          return (
            <Button
              // variant='contained'
              // variant='outlined'
              // variant="text"
              key={"header" + i}
              style={{
                fontWeight: 600,
                color: selected ? "#be9514" : null,
              }}
              onClick={() => {
                if (h.link) redirect(h.link);
                else navigate(h.to || "/");
              }}
            >
              {h.title.toUpperCase()}
            </Button>
          );
        })}
      </>
      <div style={{ width: 60 }} />
    </Row>
  );

  const floatingHeader = (
    <FadeIn
      isMounted={scrollTop > headerHeight}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: headerHeight,
        width: "100%",
        zIndex: 20,
      }}
      direction='up'
      drift={-20}
    >
      {header}
    </FadeIn>
  );

  return (
    <>
      {header}
      {floatingHeader}
    </>
  );
}
