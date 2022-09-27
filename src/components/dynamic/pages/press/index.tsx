import { Img, Col, Row, PageWrap, Wrap } from "../../../core/ui";
import { redirect } from "../../../core/helpers";
import { press } from "./constants";
import styled from "styled-components";

export default function Press({ innerRef }: any) {
  return (
    <PageWrap ref={innerRef}>
      {press.map((m, i) => {
        return (
          <Row
            key={i}
            style={{
              background: "#c4d9ff",
              padding: "20px 40px",
              borderRadius: 30,
              marginBottom: 50,
            }}
          >
            <Col style={{ padding: 30, width: 400 }}>
              <div
                onClick={() => redirect(m.link)}
                style={{ fontSize: 41, color: "#fff" }}
              >
                {m.title}
              </div>
              <Wrap style={{ justifyContent: "center" }}>
                <Txt>{m.text}</Txt>
                <Txt>{m.sub}</Txt>
              </Wrap>
            </Col>

            <Col>
              <Img
                src={"images/" + m.img}
                style={{ height: 466, width: 391 }}
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
