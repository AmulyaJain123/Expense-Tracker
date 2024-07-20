export default function NullFilter() {
  return (
    <div className="flex relative flex-col flex-grow bg-[#fefae0] mr-4 justify-center rounded-r-xl p-4 px-16">
      <div className="text-2xl tracking-widest font-semibold mx-auto mb-[20px] uppercase">
        No filter selected
      </div>
      <div className="text-xl font-medium mx-auto mb-[20px] captalize">
        Select a filter to continue
      </div>
    </div>
  );
}
