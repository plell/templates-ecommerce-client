import styled from "styled-components";
import { team, text1, text2, text3, hours } from "./constants";
import { Img, PageWrap, Row, Col } from "../../../core/ui";
import { useIsMobile } from "../../../../hooks";

export default function About({ innerRef }: any) {
  const isMobile = useIsMobile();

  return (
    <PageWrap
      ref={innerRef}
      style={{ textAlign: "center", alignItems: "center" }}
    >
      <Title>Our Mission</Title>
      <Row style={{ width: "100%" }}>
        <Col style={{ padding: 30, maxWidth: 500 }}>
          <Txt>{text1}</Txt>
          <Txt>{text2}</Txt>
          <Txt>{text3}</Txt>
        </Col>

        {!isMobile && <W />}

        <Col>
          <Img
            style={{ height: 688, minWidth: 461 }}
            src={"images/bakery.jpg"}
          />
        </Col>
      </Row>

      <HoursBox>
        <Txt>{hours.label1}</Txt>
        <Txt>{hours.text1}</Txt>
        <Txt>{hours.text2}</Txt>
        <Txt>{hours.label2}</Txt>
        <Txt>3{hours.text3}</Txt>
        <Txt>{hours.text4}</Txt>
      </HoursBox>

      <Title>Our Team</Title>

      {team.map((m: any, i: number) => {
        let offset = i % 2;

        if (offset < 1) offset = -1;

        return (
          <Row
            key={i}
            style={{
              justifyContent: "space-around",
              maxWidth: 1000,
              width: "100%",
            }}
          >
            <Col
              style={{
                padding: 30,
                width: 400,
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Txt>{m.text1}</Txt>
              {m.text2 && <Txt>{m.text2}</Txt>}
            </Col>

            <Col>
              <Img
                src={"images/" + m.img}
                style={{
                  height: 466,
                  width: 391,
                  transform: `rotate(${offset * 5}deg)`,
                }}
              />
            </Col>
          </Row>
        );
      })}
    </PageWrap>
  );
}

export const HoursBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: #d4bd76;
  margin-top: 20px;
  width: calc(100% - 60px);
`;

export const Title = styled.div`
  font-size: 36px;
  margin: 55px 0;
`;

export const Txt = styled.div`
  display: flex;
  font-size: 17px;
  margin-bottom: 10px;
  line-height: 24px;
`;

const W = styled.div`
  width: 40px;
`;
