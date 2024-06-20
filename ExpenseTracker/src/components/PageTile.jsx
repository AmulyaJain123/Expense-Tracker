import { styling } from "../util/styling";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";

const Main = styled.div`
  background-color: ${styling.navColor};

  &:hover {
    background-color: ${styling.pageTileHover};
  }
`;

const Iframe = styled.i`
  margin-right: 30px;
  font-size: x-large;
`;

function setActive(location, name, path) {
  if (name === "Home") {
    if (location.pathname === "/") {
      return true;
    }
    return false;
  } else if (location.pathname.includes("/" + path)) {
    return true;
  }
  return false;
}

export default function PageTile({ details }) {
  const { name, path, iconClass, iconClassBold } = details;
  const location = useLocation();
  const active = setActive(location, name, path);

  return (
    <>
      <NavLink
        to={path}
        className={({ isActive }) => {
          return isActive ? "active" : undefined;
        }}
      >
        <Main className="py-3 mb-2 pl-4 w-[90%] flex items-center rounded-r-lg">
          <Iframe
            className={`${
              active ? iconClassBold : iconClass
            } flex justify-center items-center`}
          ></Iframe>
          <span>{name}</span>
        </Main>
      </NavLink>
    </>
  );
}
