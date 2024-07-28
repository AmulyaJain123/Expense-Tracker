import { styling } from "../util/styling";

export default function TopNavButton({ children }) {
  return (
    <div className="p-1">
      <div
        style={{
          backgroundColor: styling.topNavThumbsBgCol,
          border: `2px solid ${styling.topNavThumbsBgCol}`,
        }}
        className="p-1 rounded-lg px-2 flex items-center"
      >
        {children}
      </div>
    </div>
  );
}
