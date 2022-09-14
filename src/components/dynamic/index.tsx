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
import { Wrap } from "../core/ui";

export default function Content() {
  return (
    <Wrap style={{ justifyContent: "space-between" }}>
      <Top />
      <Pages />
      <Bottom />
    </Wrap>
  );
}
