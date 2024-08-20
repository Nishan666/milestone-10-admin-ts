import { createContext, Dispatch, SetStateAction } from "react";


export interface ModalContextType {
  modal : boolean;
  openModal : () => void;
  closeModal : () => void;
}

const ModalContext = createContext<ModalContextType>({
  modal: false,
  openModal: () => {},
  closeModal: () => {},
});

export default ModalContext;
