import { Oval } from "react-loader-spinner";
import './PageLoader.scss'; 

const PageLoader = ({ isLoading, message = "Loading...", size = 80 }) => {
  if (!isLoading) return null; // Do not render the spinner if not loading

  return (
    <div className="page-loader">
      <Oval
        height={size}
        width={size}
        color="#4fa94d"
        secondaryColor="#4fa94d"
        strokeWidth={4}
        strokeWidthSecondary={4}
        visible={true}
        ariaLabel="oval-loading"
      />
      <span className="loader-message">{message}</span>
    </div>
  );
};

export default PageLoader;