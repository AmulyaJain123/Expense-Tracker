import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { splitCreateActions } from "../store/main";
import styled from "styled-components";
import { styling } from "../util/styling";

const Main = styled.div`
  /* background-color: ${styling.friendsBoxBgCol}; */
`;

const Header = styled.div`
  /* background-color: ${styling.friendsTitleBgCol}; */
`;

const Div = styled.div`
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 30px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 30px;
  }
`;

const Button = styled.button`
  background-color: ${styling.friendsButtonBgCol};
  border: solid 1px black;
  &:hover {
    background-color: white;
    color: black;
    transition: 200ms;
  }
`;

export default function Friends() {
  const friends = useSelector((state) => state.splitCreate.friends);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const friendName = useRef();
  const buttonRef = useRef();

  function checkForDuplicacy() {
    for (let i of friends) {
      if (i.name === friendName.current.value.trim()) {
        return true;
      }
    }
    return false;
  }

  function addFriendClick() {
    if (checkForDuplicacy() === true) {
      setError(
        "Names of 2 Friends cannot be same. Try Aliases or change Casing."
      );
      return;
    } else if (error != null) {
      setError(null);
    }
    const nameVal = friendName.current.value.trim();
    if (nameVal != "") {
      const name = nameVal;
      friendName.current.value = "";
      dispatch(splitCreateActions.addFriend({ name: name }));
    }
  }
  function removeClick(friend) {
    if (error != null) {
      setError(null);
    }
    dispatch(splitCreateActions.removeFriend({ name: friend }));
  }

  function changeHandler() {
    if (checkForDuplicacy() === true) {
      setError(
        "Names of 2 Friends cannot be same. Try Aliases or change Casing."
      );
      return;
    } else {
      setError(null);
    }
  }

  function keyDownHandle(event) {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  }

  return (
    <Main className="rounded-lg flex flex-col min-w-[300px] bg-slate-100 p-3  h-[500px]">
      <Header className="w-full py-2 bg-black text-white flex justify-center items-center rounded-lg  text-lg font-semibold uppercase">
        Friends
      </Header>

      <Div className="w-full text-stone-500 mt-4 rounded-lg  flex-grow p-6 overflow-auto">
        {friends.length != 0 ? (
          <ul>
            {friends.map((obj, index) => {
              return (
                <li className="mb-4 flex w-full text-lg" key={obj.name}>
                  <div className="min-w-[50px]">
                    <span className="bg-[white] flex justify-center items-center w-[35px] h-[35px] rounded-lg ">{`${
                      index + 1
                    }`}</span>
                  </div>

                  <span className="bg-[white] flex-grow mr-4 flex px-4 items-center h-[35px] rounded-lg ">
                    <span>{obj.name}</span>
                    <button
                      onClick={() => {
                        removeClick(obj.name);
                      }}
                      className="ml-auto "
                    >
                      <i className="fi fi-ss-cross-circle text-xl flex h-[35px] justify-center items-center"></i>
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-lg">No Friends added</p>
        )}
      </Div>
      <div
        style={{
          display: `${error === null ? "none" : "flex"}`,
        }}
        className="bg-red-300 text-sm items-center rounded-lg p-2 px-4"
      >
        <i className="fi fi-rs-exclamation mr-2 text-lg flex justify-center items-center"></i>
        <p>{error}</p>
      </div>
      <div className="flex mt-4 text-lg ">
        <input
          ref={friendName}
          onChange={changeHandler}
          onKeyDown={(event) => keyDownHandle(event)}
          placeholder="Write Name..."
          className="rounded-lg px-4 py-2 w-full mr-2"
          type="text"
        />
        <Button
          className="text-white w-48 rounded-md ml-auto"
          onClick={addFriendClick}
          ref={buttonRef}
        >
          &#43; Friend
        </Button>
      </div>
    </Main>
  );
}
