import { styling } from "../util/styling";
import { useLocation, useParams } from "react-router-dom";
import TopNavThumbs from "../UIComponents/TopNavThumbs";
import { createSplitHeirachy } from "../util/componentNavigation";

export default function TopNav() {
  const location = useLocation();
  const isOnCreateSplit = location.pathname === "/split/create";
  const isOnCreateBill = location.pathname === "/vault/create";

  return (
    <div
      style={{
        marginTop: `${styling.spacing}px`,
        backgroundColor: styling.navColor,
      }}
      className="flex  items-center p-2 h-14 rounded-l-xl"
    >
      {isOnCreateSplit
        ? createSplitHeirachy.map((status) => (
            <TopNavThumbs key={status} bool={location.search}>
              {status}
            </TopNavThumbs>
          ))
        : ""}
      {isOnCreateBill ? (
        <div className="p-1">
          <div
            style={{
              backgroundColor: styling.topNavThumbsBgCol,
              border: `2px solid ${styling.topNavThumbsBgCol}`,
            }}
            className="p-1 rounded-lg px-2 flex items-center"
          >
            Bill Upload
          </div>
        </div>
      ) : null}
    </div>
  );
}
