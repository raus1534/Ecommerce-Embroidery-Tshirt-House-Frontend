import "../css/FeaturedInfo.css";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaArrowDown, FaArrowUp, FaUserAstronaut } from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";

import { useEffect, useState } from "react";
import { useNotification } from "../../../hooks";
import { getFeatureInfoDetail } from "../../../api/admin";

export default function FeaturedInfo() {
  const [featureInfo, setFeatureInfo] = useState({
    income: [],
    users: 0,
    products: 0,
    totalSales: 0,
  });

  const { updateNotification } = useNotification();

  const getFeatureInfo = async () => {
    const { income, users, products, totalSales, error } =
      await getFeatureInfoDetail();
    if (error) return updateNotification("error", error);
    setFeatureInfo({ income: [...income], users, products, totalSales });
  };
  useEffect(() => {
    getFeatureInfo();
  }, []);

  const { income, users, products, totalSales } = featureInfo;

  const getPercentage = () => {
    const perc =
      ((income[1]?.total - income[0]?.total) / income[0]?.total) * 100;
    return perc.toFixed(1);
  };

  return (
    <div className="flex px-5 py-2 space-x-5 featured">
      <FeatureItem
        avatar={<FaMoneyBillTrendUp size={40} />}
        title="This Month Sales"
        detail={`रु ${income[1]?.total}`}
        percentage={getPercentage()}
      />
      <FeatureItem
        avatar={<FaUserAstronaut size={40} />}
        title="Total Users"
        detail={users}
      />
      <FeatureItem
        avatar={<MdInventory2 size={40} />}
        title="Total Products"
        detail={products}
      />
      <FeatureItem
        avatar={<FaMoneyBillTrendUp size={40} />}
        title="Total Revenue"
        detail={`रु ${totalSales}`}
      />
    </div>
  );
}

const FeatureItem = ({ title, detail, avatar, percentage }) => {
  return (
    <div className="flex px-8 py-3 space-x-2 featuredItem">
      <div className="flex items-center justify-center p-4 bg-[#8293E3] rounded-lg">
        {avatar}
      </div>
      <div className="flex flex-col justify-evenly">
        <div className="flex items-center">
          <span
            className={`font-semibold ${percentage ? "text-2xl" : "text-3xl"}`}
          >
            {detail}
          </span>
          {percentage && (
            <div className="flex">
              <span className="ml-2 text-sm text-gray-600">{`${percentage} %`}</span>
              <span className="ml-2 text-base text-gray-600">
                {percentage >= 0 ? (
                  <FaArrowUp size={15} className="text-green-600" />
                ) : (
                  <FaArrowDown size={15} className="text-red-500" />
                )}
              </span>
            </div>
          )}
        </div>
        <span className="text-base text-gray-600">{title}</span>
      </div>
    </div>
  );
};
