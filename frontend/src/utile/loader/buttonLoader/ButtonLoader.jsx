import { Oval } from "react-loader-spinner";
import "./ButtonLoader.scss";

const ButtonLoader = ({ isLoading, message = "Loading...", size = 24 }) => {
  if (!isLoading) return null; // Do not render the spinner if not loading

  return (
    <div className="button-loader">
      <Oval
        height={size}
        width={size}
        color="#ffffff"
        secondaryColor="#ffffff"
        strokeWidth={4}
        strokeWidthSecondary={4}
        visible={true}
        ariaLabel="oval-loading"
      />
      <span className="loader-message">{message}</span>
    </div>
  );
};

export default ButtonLoader;
