"use client"
import { useState } from "react";

export type ModalType = "EBOOK" | "NOTES" | "VIDEO" | "CHEATSHEETS"




export default function useModal() {
  const [modal, setModal] = useState<ModalType | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (type: ModalType) => {
    setModal(type);
    setIsOpen(true);
    console.log("openModal", type);
  };

  const closeModal = () => {
    setModal(null);
    setIsOpen(false);
  };

  return {
    type: modal,
    isOpen,
    openModal,
    closeModal,
  };
}
