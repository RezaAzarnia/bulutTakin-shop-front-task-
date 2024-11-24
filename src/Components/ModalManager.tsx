import { useEffect, useRef, useState } from "react";
import { useModal } from "../context/ModalProvider";
import { createPortal } from "react-dom";
import AddBookModal from "./AddBookForm";
import DeleteModal from "./DeleteBook";
import EditModal from "./EditForm";

const modalsName = {
  editModal: EditModal,
  deleteModal: DeleteModal,
  addModal: AddBookModal,
};

export default function ModalManager() {
  const [isVisible, setIsVisible] = useState(false);
  const { modal, onClose } = useModal();
  const Modal = modalsName[modal.name as keyof typeof modalsName];
  const modalRef = useRef(null)

  useEffect(() => {
    setIsVisible(!!modal.name);
  }, [modal]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if ((e.target as Element).contains(modalRef.current)) {
        onClose();
      }
    }
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);


  return createPortal(
    <div
      className={`fixed top-0 left-0 bottom-0  h-full bg-[rgba(18,18,18,0.3)] transition-all duration-300 ease-in-out z-30 w-full ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}
      ref={modalRef}
    >
      {modal.name && (
        // here in the size of the modal i did it in hard code way but if the project scale get bigger i could add type to modal state to have the type of modal size
        <div
          className={`absolute z-50 py-10 overflow-auto transition-all duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg px-14 top-1/2 left-1/2 rounded-3xl  ${modal.name === "deleteModal" ? "w-[460px]" : "w-[960px]"} ${isVisible ? "scale-100 visible" : "scale-0 invisible"}`}

        >
          <Modal {...modal.props} onClose={onClose} />
        </div>
      )}
    </div>,
    document.querySelector(".modal-root")!
  );
}
