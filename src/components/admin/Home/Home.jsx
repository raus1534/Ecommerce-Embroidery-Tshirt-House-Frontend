import "../css/Home.css";
import Chart from "./Chart";
import FeaturedInfo from "./FeaturedInfo";
import WidgetLg from "./WidgetLg";
import WidgetSm from "./WidgetSm";

export default function Home() {
  return (
    <div className="home">
      <Chart />
      <FeaturedInfo />
      <div className="homeWidget">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
