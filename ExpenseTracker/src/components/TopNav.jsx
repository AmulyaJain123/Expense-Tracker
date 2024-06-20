import { styling } from "../util/styling";

export default function TopNav() {
  return (
    <div
      style={{
        marginTop: `${styling.spacing}px`,
        backgroundColor: styling.navColor,
      }}
      className="w-full h-14 rounded-l-xl"
    ></div>
  );
}
