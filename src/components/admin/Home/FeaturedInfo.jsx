import "../css/FeaturedInfo.css";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaUserAstronaut } from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";

import { useEffect, useState } from "react";
import { useNotification } from "../../../hooks";
import { getFeatureInfoDetail } from "../../../api/admin";

export default function FeaturedInfo() {
  const [featureInfo, setFeatureInfo] = useState({
    income: [],
    users: 0,
    products: 0,
  });

  const { updateNotification } = useNotification();

  const getFeatureInfo = async () => {
    const { income, users, products, error } = await getFeatureInfoDetail();
    if (error) return updateNotification("error", error);
    setFeatureInfo({ income: [...income], users, products });
  };
  useEffect(() => {
    getFeatureInfo();
  }, []);

  const { income, users, products } = featureInfo;

  return (
    <div className="flex px-5 py-2 space-x-5 featured">
      <FeatureItem title="Total Revenue" detail={`Rs ${income[0]?.total}`} />
      <FeatureItem title="Total Users" detail={users} />
      <FeatureItem title="Total Products" detail={products} />
      <FeatureItem title="Total Products" detail={products} />
    </div>
  );
}

const FeatureItem = ({ title, detail }) => {
  return (
    <div className="flex px-8 py-3 space-x-2 featuredItem">
      <div className="flex items-center justify-center p-4 bg-[#8293E3] rounded-lg">
        <FaMoneyBillTrendUp size={40} />
      </div>
      <div className="flex flex-col justify-evenly">
        <span className="text-4xl font-semibold">{detail}</span>
        <span className="text-base text-gray-600">{title}</span>
      </div>
    </div>
  );
};
