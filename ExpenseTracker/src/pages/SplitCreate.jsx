import Friends from "../components/Friends";
import Bills from "../components/Bills";

export default function SplitCreate() {
  return (
    <>
      <div className="flex">
        <Friends />
        <Bills />
      </div>
    </>
  );
}
