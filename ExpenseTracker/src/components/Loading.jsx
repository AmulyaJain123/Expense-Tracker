import loadingIcon from "../assets/loading-desktop.gif"

export default function Loading ({text}){
    return (
        <div className="absolute top-0 left-0 z-50 w-[100vw] h-[100vh] bg-black/50">
          <div className="flex flex-col h-screen items-center justify-center">
          <div className="text-2xl text-center p-3 bg-white flex flex-col space-y-5 px-[50px] py-[40px] border-4 border-black rounded-xl text-black font-semibold">
            <span>{text}</span>
          <img className="w-[100px] z-60" src={loadingIcon} alt="" />
          </div>
          
          </div>
        </div>
    );
}