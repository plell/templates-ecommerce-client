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
