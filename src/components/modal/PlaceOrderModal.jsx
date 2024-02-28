import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import khalti from "../../image/Khalti.png";
import eSewa from "../../image/eSewa.png";
import { placeOrder } from "../../api/order";
import { useAuth, useNotification } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function PlaceOrderModal({ visible, onClose, userId }) {
  const [shippingLocation, setShippingLocation] = useState("");
  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { setCart, setCartTotal } = useAuth();

  const makePaymentViaEsewa = (formData) => {
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  const makePaymentViaKhalti = (data) =>
    (window.location.href = data.payment_url);

  const handlePayment = async (payment_method) => {
    const { formData, data, message } = await placeOrder(
      userId,
      shippingLocation,
      payment_method
    );
    if (message && payment_method === "cashOnDelivery") {
      updateNotification(
        "success",
        "Order Placed Successfully ! You will receive the call sooner"
      );
      setCart([]);
      setCartTotal(0);
      navigate("/");
    }
    if (payment_method === "eSewa") makePaymentViaEsewa(formData);
    if (payment_method === "khalti") makePaymentViaKhalti(data);
  };

  if (!visible) return null;

  return (
    <ModalContainer
      visible={visible}
      onClose={onClose}
      clearShippingLocation={() => setShippingLocation("")}
    >
      <div className="flex flex-col items-center space-y-5">
        <div className="flex flex-col-reverse w-full">
          <input
            type="text"
            className="w-full p-1 bg-transparent border-2 border-gray-700 rounded outline-none peer focus:border-black bg-none"
            onChange={({ target }) => setShippingLocation(target.value)}
          />
          <label className="self-start font-semibold text-gray-700 peer-focus:text-black">
            Shipping Location
          </label>
        </div>

        {shippingLocation && (
          <div
            className={`flex flex-col items-center w-full space-y-2 ${
              shippingLocation ? "drop-down" : ""
            }`}
          >
            <button
              onClick={() => handlePayment("cashOnDelivery")}
              className="w-full p-1 text-lg font-bold bg-blue-500 rounded-lg "
            >
              Cash On delivery
            </button>
            <span>OR</span>
            <div className="flex items-center justify-center">
              <button type="button" onClick={() => handlePayment("khalti")}>
                <img src={khalti} alt="khalti" className="w-40" />
              </button>
              <button type="button" onClick={() => handlePayment("eSewa")}>
                <img src={eSewa} alt="eSewa" className="w-40" />
              </button>
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}
