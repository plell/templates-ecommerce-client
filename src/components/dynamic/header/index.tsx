import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { redirect } from "../../core/helpers";
import { headers } from "./constants";
import { Button, FadeIn, Img, Row, Select, MenuItem } from "../../core/ui";
import { useIsMobile } from "../../../hooks";
import { Menu } from "@mui/icons-material";

export default function Header({ scrollTop }: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const topRef: any = useRef();
  const [path, setPath]: any = useState(location.pathname);

  useEffect(() => {
    if (location.pathname === "/") {
      topRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
    setPath(location.pathname);
  }, [location]);

  const headerHeight = 60;
  const logo = (
    <Img style={{ height: 60, width: 60 }} src={"images/cowbaby.png"} />
  );

  let header = (
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

      {isMobile ? (
        <Select
          IconComponent={() => (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              <Menu />
            </div>
          )}
          value=''
          style={{ width: 60 }}
          onChange={(e: any) => {
            const h = e.target.value;
            const thisHeader = headers.find((f) => h === f.title);
            if (thisHeader?.link) redirect(thisHeader?.link);
            else {
              navigate(thisHeader?.to || "/");
            }
          }}
        >
          {headers.map((o: any, i: number) => {
            return (
              <MenuItem key={i + "options"} value={o.title}>
                {o.title.toUpperCase()}
              </MenuItem>
            );
          })}
        </Select>
      ) : (
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
      )}

      {!isMobile && <div style={{ width: 60 }} />}
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
