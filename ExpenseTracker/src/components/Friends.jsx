import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { splitCreateActions } from "../store/main";
import styled from "styled-components";
import { styling } from "../util/styling";

const Main = styled.div`
  background-color: ${styling.friendsBoxBgCol};
`;

const Header = styled.div`
  background-color: ${styling.friendsTitleBgCol};
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

  return (
    <Main className="rounded-xl flex flex-col min-w-[300px] shadow-md  w-[500px] h-[500px]">
      <Header className="w-full py-4 flex justify-center items-center rounded-t-xl  text-xl font-bold uppercase">
        Friends
      </Header>

      <div className="w-full flex-grow p-6 overflow-auto">
        {friends.length != 0 ? (
          <ul>
            {friends.map((obj, index) => {
              return (
                <li className="mb-4 flex w-full text-lg" key={obj.name}>
                  <span className="min-w-[35px] m-r-2">{`${index + 1}.`}</span>
                  <span>{obj.name}</span>
                  <button
                    onClick={() => {
                      removeClick(obj.name);
                    }}
                    className="ml-auto"
                  >
                    <i className="fi fi-ss-cross-circle text-xl"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-lg">No Friends added</p>
        )}
      </div>
      <div
        style={{
          display: `${error === null ? "none" : "block"}`,
        }}
        className="bg-red-300 mx-3 text-sm rounded-xl p-2 px-4"
      >
        <p>{error}</p>
      </div>
      <div className="flex w-full h-[55px] p-2">
        <input
          ref={friendName}
          placeholder="Write Name..."
          className="rounded-lg px-4 w-full mr-2"
          type="text"
        />
        <Button
          className="text-white w-48 rounded-md ml-auto"
          onClick={addFriendClick}
        >
          &#43; Friend
        </Button>
      </div>
    </Main>
  );
}
