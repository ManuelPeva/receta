import Logo from "./assets/logo.png";
import "./styles/spinner.css";

function Spinner() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen px-4 text-center ">
        <img
          className="w-60 sm:w-50 md:w-48 lg:w-56 rounded-full shadow-lg shadow-gray-500/50 mb-4 md:mb-3 object-cover"
          alt="Animal Home"
          src={Logo}
        />
        <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold">
          Animal Home
        </h1>
      </div>
    </>
  );
}

export default Spinner;
