import { Routes, Route } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Newsletter from "./newsletter";
import Order from "./order";
import Press from "./press";

export default function Dynamic() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='newsletter' element={<Newsletter />} />
      <Route path='order' element={<Order />} />
      <Route path='press' element={<Press />} />

      <Route
        path='*'
        element={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            no page
          </div>
        }
      />
    </Routes>
  );
}
