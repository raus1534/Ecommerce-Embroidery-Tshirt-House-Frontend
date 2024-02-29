import { useEffect, useState } from "react";
import "../css/WidgetLg.css";
import { getOrderDetails } from "../../../api/admin";
import ReactTimeago from "react-timeago";

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
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Order Id</th>
          <th className="widgetLgTh">Date</th>
          <th className="text-center widgetLgTh">Amount</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="text-sm widgetLgName">{order.userId}</span>
            </td>
            <td className="widgetLgDate">
              <ReactTimeago date={order.createdAt} />
            </td>
            <td className="text-center widgetLgAmount">Rs {order.total}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
