import React, { ReactNode, useState } from "react";
import ModalContext , {ModalContextType} from "./modalContext";

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModalIsOpen] = useState<boolean>(false);

  const openModal: () => void = () => {
    setModalIsOpen(true);
  };

  const closeModal: () => void = () => {
    setModalIsOpen(false);
  };

  const contextValue : ModalContextType = {
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
