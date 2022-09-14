import { Routes, Route } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Newsletter from "./newsletter";
import Order from "./order";
import Press from "./press";
import { Wrap } from "../../core/ui";

export default function Dynamic() {
  return (
    <Wrap>
      <Routes>
        <Route index element={<Home />} />
        <Route path='*' element={<About />} />
        <Route path='newsletter' element={<Newsletter />} />
        <Route path='order' element={<Order />} />
        <Route path='press' element={<Press />} />
      </Routes>
    </Wrap>
  );
}
