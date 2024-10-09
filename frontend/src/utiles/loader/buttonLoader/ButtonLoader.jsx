import { Oval } from "react-loader-spinner";

const ButtonLoader = ({ isLoading, message = "Loading...", size = 50 }) => {
  if (!isLoading) return null; // Do not render the spinner if not loading

  return (
    <div style={styles.container}>
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
      <p style={styles.message}>{message}</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Center the spinner in full viewport height
    width: "100%", // Full width
  },
  message: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#555",
  },
};

export default ButtonLoader;
