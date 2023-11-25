import BarChartBox from "../../components/barChartBox/BarChartBox";
import ChartBox from "../../components/chartBox/chartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import {
  chartBoxProduct,
  chartBoxUser,
  chartBoxRevenue,
  chartBoxConversion,
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxCustomers,
} from "../../data";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home">
      <div className="box box1">
      <ChartBox  />

      </div>
      <div className="box box2">
        <ChartBox {...chartBoxCustomers} viewAllLink="/customers"/>
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} viewAllLink="/products"/>
      </div>
      <div className="box box4">
        <PieChartBox/>
        </div>
      {/* <div className="box box5">
      <ChartBox {...chartBoxProduct} />
      </div> */}
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box7">
        <ChartBox {...chartBoxConversion} viewAllLink="/orders" />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxVisit} />
      </div>
    </div>
  );
}
