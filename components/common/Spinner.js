import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Spinner = () => {
  return (
    <div className='spinner-container'>
      <div className='animate-spin'>
        <FontAwesomeIcon icon={faCircleNotch} />
      </div>
    </div>
  );
};

export default Spinner;
