import { styling } from "../util/styling";
import styled from "styled-components";
import PageTile from "./PageTile";

const Main = styled.div`
  height: calc(100vh - ${styling.spacing * 2}px);
  margin-top: ${styling.spacing}px;
  background-color: ${styling.navColor};
`;
const Logo = styled.div`
  padding: 10px;
  font-size: 40px;
  font-weight: 900;
  font-family: ${styling.logoFont};
  text-align: center;
`;
const Tiles = styled.div`
  margin-top: 50px;
`;

const pages = [
  {
    name: "Home",
    path: "",
    iconClass: "fi fi-rr-home",
    iconClassBold: "fi fi-ss-home",
  },
  {
    name: "Split",
    path: "split",
    iconClass: "fi fi-rs-hexagon-divide",
    iconClassBold: "fi fi-ss-hexagon-divide",
  },
];

export default function SideNav() {
  return (
    <Main className="w-72 rounded-r-xl">
      <Logo>BILLBUD</Logo>
      <Tiles>
        {pages.map((page) => {
          return <PageTile key={page.name} details={{ ...page }} />;
        })}
      </Tiles>
    </Main>
  );
}
