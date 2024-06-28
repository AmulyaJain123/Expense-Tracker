import { styling } from "../util/styling";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { splitCreateActions } from "../store/main";
import { useSelector, useDispatch } from "react-redux";

export default function SplitHeader() {
  const dispatch = useDispatch();

  return (
    <header>
      <Link to="create">Create New Split</Link>
    </header>
  );
}
