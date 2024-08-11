import BillCreate from "../components/vaultCreateComponents/BillCreate";

export default function VaultCreate() {
  return (
    <>
      <div className="h-full w-full bg-white whiteScr overflow-auto pb-[80px] rounded-r-xl lg:rounded-r-none rounded-l-xl">
        <BillCreate />
      </div>
    </>
  );
}
