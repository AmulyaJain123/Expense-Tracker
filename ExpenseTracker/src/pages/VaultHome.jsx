import vault from "../assets/vault.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import vaultImg from "../assets/vault-icon.png";
import styles from "./VaultHome.module.css";

const Span = styled.span`
  font-weight: 600;
  transition: all 200ms;
  padding: 0 1px;
`;

export default function VaultHome() {
  return (
    <div className="h-full w-full bg-white overflow-auto pb-[200px] text-stone-700 rounded-l-xl rounded-r-xl lg:rounded-r-none">
      <h2 className="flex justify-center  text-[35px] sm:text-[40px] xl:text-[50px] mt-12 p-4 font-bold capitalize ">
        BillVault
      </h2>
      <div className=" mt-8 flex flex-col space-y-[30px] sm:space-y-0 items-center sm:flex-row mx-[50px] md:mx-[100px] justify-center space-x-[20px] 2xl:space-x-[80px]">
        <div className="flex text-sm sm:text-xs lg:text-base xl:text-lg flex-col max-w-[900px] space-y-6  my-auto">
          <p className=" font-medium flex justify-center items-center text-center ">
            BillVault is your personal digital archive for all your important
            bills and receipts. With BillVault, you can effortlessly save photos
            of your bills and add essential details such as the name, date, and
            description.
          </p>
          <p className=" font-medium flex justify-center items-center text-center ">
            Whether it's for tracking expenses, managing warranties, or keeping
            records for future reference, BillVault ensures that all your
            critical documents are securely stored and easily accessible.
          </p>
        </div>
        <img
          className="h-fit my-auto w-[200px]  sm:w-[300px] xl:w-[450px]"
          src={vault}
          alt=""
        />
      </div>
      <div id="menu">
        <div className="flex justify-center space-x-10 mt-[100px] sm:mt-[175px]">
          <Span className="text-base sm:text-xl border-b-2 sm:border-b-4 border-black">
            How to Use BillVault
          </Span>
        </div>
        <div id={`${styles.menuContent}`} className={``}>
          <div className="mt-16 flex flex-col space-y-2">
            <div className=" ">
              <div className="font-medium  pl-2 sm:w-1/3">
                Create a New Bill{" "}
              </div>
              <div className="sm:w-2/3 flex  flex-col space-y-2">
                <p>
                  Navigate to the BillVault section and click on "Add Bill".
                </p>
                <p>
                  Fill in the required details like Bill Date, Bill Name, Bill
                  Amount, Etc.
                </p>
              </div>
            </div>
            <div className=" ">
              <div className="font-medium   pl-2 sm:w-1/3">
                {"Add Warranty Information (Optional)"}{" "}
              </div>
              <div className="sm:w-2/3 flex flex-col space-y-2">
                <p>
                  If your Bill includes a warranty, you can provide additional
                  details by specifying either the warranty duration or the
                  warranty expiration date.
                </p>
                <p>
                  This information will be used to display the warranty status
                  when you view your saved Bills.
                </p>
              </div>
            </div>
            <div className=" ">
              <div className="font-medium   pl-2 sm:w-1/3">
                Upload Bill Images
              </div>
              <div className="sm:w-2/3 flex flex-col space-y-2">
                <p>
                  You can upload up to four images of your Bill to keep a visual
                  record of your documents.
                </p>
              </div>
            </div>
            <div className=" ">
              <div className="font-medium   pl-2 sm:w-1/3">Save Your Bill</div>
              <div className="sm:w-2/3 flex flex-col space-y-2">
                <p>
                  After entering all the necessary details and uploading images,
                  click "Save" to store your Bill in BillVault.
                </p>
              </div>
            </div>
            <div className=" ">
              <div className="font-medium   pl-2 sm:w-1/3">
                View and Manage Saved Bills
              </div>
              <div className="sm:w-2/3 flex flex-col space-y-2">
                <p>
                  Access your saved Bills anytime from the BillVault section.
                </p>
                <p>
                  Each Bill entry will display its warranty status if warranty
                  information was provided.
                </p>
                <p>
                  You can also download the images attached to each BIll for
                  your records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-[150px]">
        <div className="flex justify-between items-center p-3 px-6 rounded-xl bg-slate-100 mx-[50px] sm:mx-[100px]">
          <span className="text-[25px] sm:text-[30px] lg:text-[40px] ml-[10px] sm:ml-[20px] font-bold">
            Vault
          </span>
          <Link
            className="p-1 sm:p-2 px-2 sm:px-4 h-fit text-sm sm:text-base rounded-lg font-semibold bg-[#9d4edd] border-2 border-[#9d4edd] text-[#f7ebfd] hover:bg-[#f7ebfd] duration-500 hover:text-[#9d4edd] hover:scale-105 hover:shadow-md"
            to={"create"}
          >
            Add Bill
          </Link>
        </div>
        <div className="flex mt-[20px] p-3 px-6  rounded-xl bg-slate-100 mx-[50px] sm:mx-[100px]">
          <div className="relative flex group mx-auto sm:mx-0">
            <span className="text-sm sm:text-xl opacity-0 sm:group-hover:opacity-100 flex font-extrabold  sm:group-hover:translate-x-[200px] duration-[0.5s] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]  items-center justify-center">
              {"Open Vault -->"}
            </span>
            <Link to={"view?sortBy=createdOn"}>
              <img
                className="p-4 absolute left-0 w-[150px] h-fit sm:w-[200px] group-hover:scale-110 duration-500"
                src={vaultImg}
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
