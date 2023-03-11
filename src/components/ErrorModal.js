import { useState } from "react";

const ErrorModal = ({ message }) => {
  const [closeModal, setCloseModal] = useState(false);
  if (!closeModal)
    return (
      <div
        className="modalOverlay"
        onClick={() => {
          setCloseModal(true);
        }}
      >
        <div className="modalContainer">
          <h3 class="title">Sorry, </h3>
          <h3 class="title">{message} </h3>
        </div>
      </div>
    );
};

export default ErrorModal;
