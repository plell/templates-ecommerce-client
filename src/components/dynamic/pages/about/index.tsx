import styled from "styled-components";
import { team, text1, text2, text3, hours } from "./constants";
import { Img, PageWrap } from "../../../core/ui";

export default function About({ innerRef }: any) {
  return (
    <PageWrap ref={innerRef}>
      <Title>Our Mission</Title>
      <Row>
        <Col style={{ padding: 30 }}>
          <Txt>{text1}</Txt>
          <Txt>{text2}</Txt>
          <Txt>{text3}</Txt>
        </Col>

        <W />

        <Col>
          <Img style={{ height: 688, width: 461 }} src={"bakery.jpg"} />
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
        return (
          <Row key={i}>
            <Col style={{ padding: 30, width: 400 }}>
              <Txt>{m.text1}</Txt>
              {m.text2 && <Txt>{m.text2}</Txt>}
            </Col>

            <Col>
              <Img src={m.img} style={{ height: 466, width: 391 }} />
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
  width: calc(100% - 60px);
`;

export const Title = styled.div`
  font-size: 36px;
  margin: 55px 0;
`;

export const Txt = styled.div`
  margin-bottom: 10px;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const W = styled.div`
  width: 40px;
`;
