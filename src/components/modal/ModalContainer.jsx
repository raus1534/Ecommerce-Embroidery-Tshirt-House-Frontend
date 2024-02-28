import React from "react";

export default function ModalContainer({
  children,
  visible,
  onClose,
  ignoreContainer,
  clearShippingLocation,
}) {
  const handleOnClose = (e) => {
    if (e.target.id === "modal-container") {
      clearShippingLocation();
      onClose();
    }
  };
  const renderChildren = () => {
    if (ignoreContainer) return children;
    return (
      <div className="w-[40rem] bg-white overflow-auto p-2">{children}</div>
    );
  };
  if (!visible) return null;
  return (
    <div
      id="modal-container"
      onMouseDown={handleOnClose}
      className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-sm"
    >
      {renderChildren()}
    </div>
  );
}
