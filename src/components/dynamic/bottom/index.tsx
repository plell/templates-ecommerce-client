import styled from "styled-components";
import { useIsMobile } from "../../../hooks";
import { Img } from "../../core/ui";

export default function Bottom({ innerRef }: any) {
  const isMobile = useIsMobile();
  return (
    <Footer ref={innerRef}>
      <Cell>lazycowbakery@gmail.com</Cell>

      {isMobile ? (
        <Img src={"images/cowbaby.png"} style={{ height: 60, width: 60 }} />
      ) : (
        <Cell>
          <div>3418 Fremont Ave N</div>
          <div>9-6pm Wed~Sat, 9-4pm Sunday</div>
          <div>Fri~Sun 10-2pm</div>
        </Cell>
      )}
    </Footer>
  );
}

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #d4bd76;
  padding: 10px 40px;
  width: calc(100% - 80px);
  font-weight: 400;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  // width: 300px;
  text-align: center;
`;
