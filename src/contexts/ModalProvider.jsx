import { useState } from "react";
import ModalContext from "./modalContext";

// eslint-disable-next-line react/prop-types
const ModalProvider = ({ children }) => {
  const [modal, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const contextValue = {
    modal,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
