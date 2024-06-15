import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, resetFields, children ,deleteData}) => {
  const dialog = useRef();

  console.log(deleteData);

  useEffect(() => {
    const dialogElement = dialog.current;

    if (open) {
      dialogElement.showModal();
      dialogElement.addEventListener("cancel", handleCancel);
    } else {
      dialogElement.close();
      resetFields();
    }

    return () => {
      dialogElement.removeEventListener("cancel", handleCancel);
    };
  }, [open, resetFields]);

  const handleCancel = (event) => {
    event.preventDefault();
  };

  return createPortal(
    <>
      {open && <div className="modal-backdrop"></div>}
      <dialog
        className={deleteData ?"fixed flex justify-center items-center bg-white rounded-lg shadow-md" : "fixed top-96 left-1/3 transform -translate-x-1/2 -translate-y-1/3 w-1/3 bg-white rounded-lg shadow-md"}
        ref={dialog}  
      >
        {open ? children : null}
      </dialog>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
