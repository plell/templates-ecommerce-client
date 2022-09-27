import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { Wrap, Row, FadeIn, IconButton } from "../../../core/ui";
import { Close } from "@mui/icons-material";

export default function FadeInWrapper({
  children,
  path,
  title,
  headerControls,
  innerRef,
  onMount,
}: any) {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const visibleState = location.pathname === path;
    setVisible(visibleState);

    if (visibleState && onMount) onMount();
  }, [location]);

  const headerPadding = 20;
  const headerHeight = 100 - headerPadding * 2;

  return (
    <FadeIn
      fullScreen
      drift={40}
      direction='up'
      style={{ overflow: "hidden", zIndex: 400 }}
      isMounted={visible}
    >
      <>
        <Header style={{ height: headerHeight, padding: headerPadding }}>
          <div style={{ minWidth: 80 }}>
            <IconButton onClick={() => navigate("")}>
              <Close style={{ fontSize: 40 }} />
            </IconButton>
          </div>

          {title && <Title style={{ minWidth: 80 }}>{title}</Title>}

          <Row style={{ alignItems: "center", minWidth: 80 }}>
            {headerControls}
          </Row>
        </Header>

        <Wrap
          ref={innerRef}
          style={{
            height: `calc(100vh - ${headerHeight}px`,
            overflow: "auto",
          }}
        >
          {children}
        </Wrap>
      </>
    </FadeIn>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
  z-index: 20;
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  color: #000;
`;
