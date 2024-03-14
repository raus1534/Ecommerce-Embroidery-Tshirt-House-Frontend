import { useEffect, useState } from "react";
import "../css/WidgetLg.css";
import { getOrderDetails } from "../../../api/admin";
import ReactTimeago from "react-timeago";
import { MdVisibility } from "react-icons/md";
import { Link } from "react-router-dom";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { orders } = await getOrderDetails(true);
    setOrders([...orders]);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="bg-white widgetLg rounded-xl">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Order Id</th>
          <th className="widgetLgTh">Date</th>
          <th className="text-center widgetLgTh">Amount</th>
          <th className="text-center widgetLgTh"></th>
        </tr>
        {orders.map((order) => (
          <tr key={order._id}>
            <td className="p-2 widgetLgUser">
              <span className="text-sm widgetLgName">{order.userId}</span>
            </td>
            <td className="widgetLgDate">
              <ReactTimeago date={order.createdAt} />
            </td>
            <td className="text-center widgetLgAmount">रु {order.total}</td>
            <td className="text-center widgetLgAmount">
              <Link to={"/order/" + order._id} className=" rounded-xl">
                <MdVisibility className=" text-[#8293E3]" />
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
