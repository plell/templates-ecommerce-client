import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { redirect } from "../../core/helpers";
import { headers } from "./constants";
import { Button, FadeIn, Img, Row } from "../../core/ui";

export default function Header({ scrollTop }: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const topRef: any = useRef();
  const path = location.pathname;

  useEffect(() => {
    if (location.pathname === "/") {
      topRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const headerHeight = 60;
  const logo = <Img style={{ height: 60, width: 60 }} src={"cowbaby.webp"} />;

  const header = (
    <Row
      style={{
        height: headerHeight,
        width: "calc(100% - 40px)",
        padding: "5px 20px",
        background: "#fff7dc",
        justifyContent: "space-between",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div
        style={{ cursor: "pointer", marginRight: 20 }}
        onClick={() => {
          navigate("/");
        }}
      >
        {logo}
      </div>

      <>
        {headers.map((h: any, i: number) => {
          const selected = path === h.to;
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
      <div ref={topRef} />
      {header}
      {floatingHeader}
    </>
  );
}
