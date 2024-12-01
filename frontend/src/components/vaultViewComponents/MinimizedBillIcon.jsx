import folderIcon from "../../assets/folder.png";

export default function MinimizedBillIcon({ name, date }) {
  return (
    <div className="relative w-fit h-fit group flex flex-col p-3">
      <img className="w-[100px] h-[100px] z-30" src={folderIcon} alt="" />
      <div className="w-[100px] z-30 mt-1 font-semibold text-xs text-center flex flex-col items-center justify-center">
        <span>{name}</span>
        <span className="mt-1">{date}</span>
      </div>
    </div>
  );
}
