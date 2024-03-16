import React from "react";
import ModalContainer from "./ModalContainer";
import SubmitBtn from "../SubmitBtn";

export default function ConfirmModal({ visible, onClose, onConfirm }) {
  if (!visible) return null;
  return (
    <ModalContainer visible={true} onClose={onClose} ignoreContainer>
      <div className="flex flex-col p-6 space-y-4 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-semibold">Are you sure want to delete?</h1>
        <div className="flex space-x-4">
          <SubmitBtn
            className="px-3 py-1 font-bold uppercase bg-blue-500 rounded-xl"
            onClick={onConfirm}
          >
            Confirm
          </SubmitBtn>
          <SubmitBtn
            className="px-3 py-1 font-bold uppercase bg-red-500 rounded-xl"
            onClick={onClose}
          >
            Cancel
          </SubmitBtn>
        </div>
      </div>
    </ModalContainer>
  );
}
