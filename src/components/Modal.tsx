import { useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  resetFields: () => void;
  children: ReactNode;
  deleteData?: boolean;
}

const Modal = ({ open, resetFields, children, deleteData }: ModalProps) => {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialogElement = dialog.current;

    if (dialogElement) {
      if (open) {
        dialogElement.showModal();
        dialogElement.addEventListener("cancel", handleCancel);
      } else {
        dialogElement.close();
        resetFields();
      }

      return () => {
        if (dialogElement) {
          dialogElement.removeEventListener("cancel", handleCancel);
        }
      };
    }
  }, [open, resetFields]);

  const handleCancel = (event: Event) => {
    event.preventDefault();
  };

  const modalRoot = document.getElementById("modal");

  // Render only if modalRoot exists
  if (!modalRoot) return null;

  return createPortal(
    <>
      {open && <div className="modal-backdrop"></div>}
      <dialog
        className={
          deleteData
            ? "fixed flex justify-center items-center bg-white rounded-lg shadow-md"
            : "fixed top-96 left-1/3 transform -translate-x-1/2 -translate-y-1/3 w-1/3 bg-white rounded-lg shadow-md"
        }
        ref={dialog}
      >
        {open ? children : null}
      </dialog>
    </>,
    modalRoot
  );
};

export default Modal;
