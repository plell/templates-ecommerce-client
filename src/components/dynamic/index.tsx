import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/home";
import About from "./pages/about";
import News from "./pages/newsletter";
import Order from "./pages/order";
import Press from "./pages/press";

import Pages from "./pages";
import Top from "./top";
import Bottom from "./bottom";

export default function Dynamic() {
  return (
    <Wrap>
      <Top />
      <Pages />
      <Bottom />
    </Wrap>
  );
}

const Wrap = styled.div`
  // display:flex;
  // flex-direction:column;
  height: 100%;
  width: 980px;
  align-items: center;
`;
