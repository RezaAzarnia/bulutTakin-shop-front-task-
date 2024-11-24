import React, { createContext, useContext, useState } from "react";

type ModalStateProps = {
  name: string;
  props: Record<string, any>;
};

type ModalContextProps = {
  modal: ModalStateProps;
  openModal: (
    name: string,
    props?: Record<string, any>,
  ) => void;
  onClose: () => void;
};

type ChildrenProps = {
  children: React.ReactNode;
};

const ModalContext = createContext<ModalContextProps | null>(null);

export default function ModalProvider({ children }: ChildrenProps) {
  const [modal, setModal] = useState<ModalStateProps>({
    name: "",
    props: {},
  });

  const onClose = () => setModal({ name: "", props: {} });

  const openModal = (
    name: string,
    props?: Record<string, any>,
  ) => setModal({ name, props: props || {} });
  return (
    <ModalContext.Provider value={{ onClose, modal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
}
export const useModal = () => {
  const modalData = useContext(ModalContext);
  if (!modalData) {
    throw new Error("this value doesn't exist in the modal");
  }
  return modalData;
}
