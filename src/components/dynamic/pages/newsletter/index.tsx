import styled from "styled-components";
import { Wrap } from "../../../core/ui";

export default function Newsletter({ innerRef }: any) {
  return (
    <Wrap ref={innerRef} style={{ background: "#d9fff6", height: 800 }}>
      <Title>Join our newsletter!</Title>

      <Txt>
        You'll be the first to know about seasonal menu changes, special events,
        and more!
      </Txt>
    </Wrap>
  );
}

const Txt = styled.div``;

const Title = styled.div``;
