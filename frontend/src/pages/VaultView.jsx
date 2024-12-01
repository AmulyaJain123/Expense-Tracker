import { useLoaderData } from "react-router-dom";
import BillIcon from "../components/vaultViewComponents/BillIcon";
import { useNavigate } from "react-router-dom";
import folderIcon from "../assets/folder.png";
import { useSearchParams } from "react-router-dom";
import warrantyIcon from "../assets/warranty-icon.png";
import expiredIcon from "../assets/expired-icon.png";

export default function VaultView() {
  const data = useLoaderData();
  // console.log(data);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  let selectDefault = searchParams.get("sortBy");

  function sortingChange(event) {
    navigate(`/vault/view?sortBy=${event.target.value}`);
  }

  return (
    <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-r-2xl lg:rounded-r-none rounded-l-2xl">
      <div className="flex flex-grow flex-col items-center mt-[30px] sm:mt-0 sm:flex-row justify-between p-3">
        <div className="flex space-x-10 pl-[20px] sm:pl-[50px] items-center">
          <span className="text-[25px] sm:text-[30px] font-bold">
            Saved Bills
          </span>
        </div>
        <div className="justify-center space-x-[20px] xl:space-x-[50px] hidden md:flex scale-[80%] xl:scale-[90%] items-center">
          <div className="flex w-[40px] flex-col justify-center items-center">
            <img className="h-[40px] w-[40px]" src={expiredIcon} alt="" />
            <div className="flex flex-col text-center text-xs font-semibold">
              <p>Warranty Expired</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img className="h-[50px] w-[50px]" src={folderIcon} alt="" />
            <div className="flex flex-col text-center text-xs font-semibold">
              <p>Bill Name</p>
              <p>Bill Date</p>
            </div>
          </div>
          <div className="flex w-[40px] flex-col justify-center items-center">
            <img className="h-[40px] w-[40px]" src={warrantyIcon} alt="" />
            <div className="flex flex-col text-center text-xs font-semibold">
              <p>Warranty Active</p>
            </div>
          </div>
        </div>
        <div className="flex items-center ml-6 sm:ml-0 sm:mr-4">
          <div className="items-center text-base my-4 md:text-lg font-semibold flex ">
            <label className="mr-2" htmlFor="sort">
              Sort By:
            </label>
            <select
              className="text-center"
              onChange={(event) => sortingChange(event)}
              name="sort"
              defaultValue={selectDefault}
              id=""
            >
              <option value="createdOn">Created On</option>
              <option value="billDate">Bill Date</option>
              <option value="expiryDate">Expiration Date</option>
            </select>
          </div>
        </div>
      </div>
      {data.empty ? (
        <p className="text-lg ml-[70px] font-medium mt-[40px]">
          No Bills Created
        </p>
      ) : (
        <div className="flex flex-wrap gap-x-10 p-8 px-10 gap-y-10">
          {data.docs.map((doc) => {
            return <BillIcon key={Math.random()} data={doc} />;
          })}
        </div>
      )}
    </div>
  );
}
