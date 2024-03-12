import { useEffect, useState } from "react";
import "../css/Chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useNotification } from "../../../hooks";
import { getOrderStats, getUserStats } from "../../../api/admin";
import { MONTHS } from "../../../utils/helper";

export default function Chart() {
  const [userStats, setUserStats] = useState([]);
  const [orderStats, setOrderStats] = useState([]);
  const { updateNotification } = useNotification();

  const getStats = async () => {
    const { userStats } = await getUserStats();
    const { ordersStats } = await getOrderStats();
    console.log(ordersStats);
    if (!userStats)
      return updateNotification("error", "Error Fetching The User Stats");
    if (!ordersStats)
      return updateNotification("error", "Error Fetching The Order Stats");
    userStats.map((item) =>
      setUserStats((prev) => [
        ...prev,
        { name: MONTHS[item._id - 1], "Active User": item.total },
      ])
    );
    ordersStats.map((item) =>
      setOrderStats((prev) => [
        ...prev,
        {
          day: item._id.day,
          month: item._id.month,
          "Total Amount": item.totalAmount,
          Orders: item.orderCount,
        },
      ])
    );
  };

  useEffect(() => {
    getStats();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex space-x-3">
      <ChartContainer title="Order Analytics" className="w-2/3">
        <ResponsiveContainer width="100%" aspect={5 / 1}>
          <LineChart data={orderStats}>
            <XAxis dataKey="day" stroke="#5550bd" strokeWidth={1} />
            <Line
              type="monotone"
              dataKey="Total Amount"
              stroke="#5550bd"
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      <ChartContainer title="User Analytics" className="w-1/3">
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <PieChart>
            <Pie
              data={userStats}
              dataKey="Active User"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {userStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

const ChartContainer = ({ children, title, className }) => {
  return (
    <div className={"chart rounded-xl " + className}>
      <h3 className="text-xl font-bold text-center uppercase chartTitle">
        {title}
      </h3>
      {children}
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="p-3 font-bold bg-white shadow-2xl rounded-xl">
        <p>{`${MONTHS[data.month]} ${data.day}`}</p>
        <p>{`Total Amount: ${data["Total Amount"]}`}</p>
        <p>{`Total Orders: ${data["Orders"]}`}</p>
      </div>
    );
  }

  return null;
};
