import { styling } from "../util/styling";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SplitHeader() {
  return (
    <header>
      <Link to="create">Create New Split</Link>
    </header>
  );
}
