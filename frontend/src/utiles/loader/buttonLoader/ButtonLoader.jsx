import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const ButtonLoader = () => {
  return (
    <ClipLoader
    color={"green"}
    loading={true}
    cssOverride={override}
    size={30}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  )
}

export default ButtonLoader