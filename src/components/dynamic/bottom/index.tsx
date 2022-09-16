import styled from "styled-components";
import { Img } from "../../core/ui";

export default function Bottom({ innerRef }: any) {
  return (
    <Footer ref={innerRef}>
      <Cell>CONTACT email: lazycowbakery@gmail.com</Cell>

      <Img src={"cowbaby.webp"} style={{ height: 80, width: 80 }} />

      <Cell>
        <div>ADDRESS: 3418 Fremont Ave N</div>
        <div>HOURS: 9-6pm wed-sat 9-4pm sunday</div>
        <div>BRUNCH HOURS: fri-sun 10-2pm</div>
      </Cell>
    </Footer>
  );
}

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #d4bd76;
  padding: 5px 20px;
  width: calc(100% - 40px);
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;
