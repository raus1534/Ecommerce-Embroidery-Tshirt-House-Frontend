import "../css/FeaturedInfo.css";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
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
    <div className="flex featured">
      <FeatureItem title="Total Revenue" detail={`Rs ${income[0]?.total}`} />
      <FeatureItem title="Total Users" detail={users} />
      <FeatureItem title="Total Products" detail={products} />
    </div>
  );
}

const FeatureItem = ({ title, detail }) => {
  return (
    <div className="flex flex-col items-center justify-center featuredItem">
      <span className="text-2xl font-bold uppercase ">{title}</span>
      <div className="featuredMoneyContainer">
        <span className="featuredMoney">{detail}</span>
      </div>
    </div>
  );
};
