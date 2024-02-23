import "../css/FeaturedInfo.css";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/order/income");
        console.log(res.data);
        setIncome(res.data);
      } catch {}
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs {income[0]?.total}</span>
        </div>
      </div>
    </div>
  );
}
