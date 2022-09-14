import { Img, Col, Row, Wrap } from "../../../common/ui";
import { redirect } from "../../../common/helpers";
import { press } from "./constants";

export default function Press() {
  return (
    <Wrap>
      {press.map((m, i) => {
        return (
          <Row key={i} style={{ background: "#c4d9ff", padding: 20 }}>
            <Col style={{ padding: 30, width: 400 }}>
              <div
                onClick={() => redirect(m.link)}
                style={{ fontSize: 41, color: "#fff" }}
              >
                {m.title}
              </div>
              <div>{m.text}</div>
              <div>{m.sub}</div>
            </Col>

            <Col>
              <Img src={m.img} style={{ height: 466, width: 391 }} />
            </Col>
          </Row>
        );
      })}
    </Wrap>
  );
}
