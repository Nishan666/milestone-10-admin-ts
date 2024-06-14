import { createContext } from "react";

const ModalContext = createContext({
  modal: false,
  openModal: () => {},
  closeModal: () => {},
});

export default ModalContext;
