import { useParams } from "react-router-dom";
import "../admin/css/product.css";
import { useEffect, useState } from "react";
import { useNotification } from "../../hooks";
import { getOrderDetail } from "../../api/order";

export default function Order() {
  const [orderDetail, setOrderDetail] = useState({});
  const { orderId } = useParams();

  const { updateNotification } = useNotification();

  const getOrderDetails = async () => {
    const { error, order } = await getOrderDetail(orderId);
    if (error) return updateNotification("error", error);
    if (!order) return updateNotification("error", "Product Not Found");

    setOrderDetail({ ...order });
  };

  useEffect(() => {
    getOrderDetails();
    // eslint-disable-next-line
  }, [orderId]);

  return (
    <div className="h-full product">
      <div className="w-full h-full bg-white shadow-lg rounded-xl">
        <div className="flex flex-col w-full p-5 space-y-4">
          <div className="flex">
            <div className="w-2/3">
              <div className="flex flex-col w-11/12 space-y-3">
                <div className="w-full flex flex-col space-y-3 max-h-[65vh] overflow-auto">
                  {orderDetail?.productsDetail?.map(
                    ({ img, title, price }, index) => {
                      return (
                        <>
                          <div className="flex space-x-3">
                            <img
                              src={img}
                              alt=""
                              className="w-32 h-32 rounded-xl"
                            />
                            <p className="flex items-center flex-1 px-4 text-2xl font-semibold tracking-wide capitalize">
                              {title}
                            </p>
                            <span className="flex items-center justify-center w-1/12 text-xl font-semibold">
                              {orderDetail?.products[index]?.quantity}
                            </span>
                            <span className="flex items-center justify-center w-1/6 text-2xl font-semibold">
                              रु{" "}
                              {orderDetail?.products[index]?.quantity * price}
                            </span>
                          </div>
                          <hr className="border border-zinc-700" />
                        </>
                      );
                    }
                  )}
                </div>
                <div className="flex justify-end py-2 border-b-2 border-black">
                  <span className="flex items-center justify-center w-1/12 text-xl font-semibold">
                    Total
                  </span>
                  <span className="flex items-center justify-center w-1/6 text-2xl font-bold">
                    रु {orderDetail?.total}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-1/3">
              <div className="flex flex-wrap">
                <InputField title="Order Id" value={orderDetail?._id} />
                <InputField title="Status" value={orderDetail?.status} />
                <InputField
                  title="Shipping Details"
                  value={orderDetail?.shippingAddress}
                  value2={orderDetail?.shippingContact}
                />
                <InputField
                  title="Payment Via"
                  value={orderDetail?.paymentMethod}
                />
                <InputField
                  title="Transaction Code"
                  value={orderDetail?.transactionCode}
                />
                <InputField
                  title="Created At"
                  value={orderDetail?.createdAt?.split("T")[0]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const InputField = ({ title, value, value2 = "" }) => {
  return (
    <div className="flex flex-col w-1/2 h-24 pl-4 mt-5 space-x-3">
      <label
        htmlFor="Title"
        className="text-xl font-semibold text-gray-600 capitalize"
      >
        {title}
      </label>
      <span className="text-base">{value}</span>
      <span className="text-base">{value2}</span>
    </div>
  );
};
