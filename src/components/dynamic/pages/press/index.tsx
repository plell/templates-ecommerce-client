import { Img, Col, Row, PageWrap, Wrap } from "../../../core/ui";
import { redirect } from "../../../core/helpers";
import { press } from "./constants";
import styled from "styled-components";

export default function Press({ innerRef }: any) {
  return (
    <PageWrap
      ref={innerRef}
      style={{ textAlign: "center", alignItems: "center", width: "auto" }}
    >
      {press.map((m, i) => {
        return (
          <Row
            key={i}
            style={{
              background: "#c4d9ff",
              padding: "20px 40px",
              borderRadius: 30,
              marginBottom: 50,
              width: "auto",
            }}
          >
            <Col style={{ padding: 30, maxWidth: 400, width: "100%" }}>
              <div
                onClick={() => redirect(m.link)}
                style={{ fontSize: 41, color: "#fff" }}
              >
                {m.title}
              </div>
              <div>
                <Txt>{m.text}</Txt>
                <Txt>{m.sub}</Txt>
              </div>
            </Col>

            <Col>
              <Img
                src={"images/" + m.img}
                style={{ height: 466, width: 391, minWidth: 200 }}
              />
            </Col>
          </Row>
        );
      })}
    </PageWrap>
  );
}

export const Txt = styled.div`
  font-size: 17px;
  margin-bottom: 10px;
  line-height: 24px;
`;
