import styled from "styled-components";
import { Img } from "../../common/ui";

export default function Bottom() {
  return (
    <Footer>
      <Cell>CONTACT email: lazycowbakery@gmail.com</Cell>

      <Cell>
        <Img src={"cowbaby.webp"} />
      </Cell>

      <Cell>
        VISIT US address: 3418 Fremont Ave N hours: 9-6pm wed-sat 9-4pm sunday
        brunch hours: fri-sun 10-2pm
      </Cell>
    </Footer>
  );
}

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  background: #d4bd76;
  height: 100px;
  width: 100%;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 200px;
`;
