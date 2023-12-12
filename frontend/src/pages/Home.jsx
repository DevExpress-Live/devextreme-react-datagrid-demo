import React from "react";
import PieChart, {
  Series,
  Label,
  Connector,
  Legend,
  Font,
} from "devextreme-react/pie-chart";

const Home = () => {
  const chartData = [
    { region: "Employees", val: 10 },
    { region: "Customers", val: 20 },
  ];

  const customizeText = (arg) => {
    return `${arg.valueText} (${arg.percentText})`;
  };

  return (
    <div>
      <h2>Home</h2>
      <div className="chart">
        <PieChart
          title={"Employees vs Customers"}
          type="doughnut"
          palette="Dark Violet"
          dataSource={chartData}
        >
          <Font size={16} color="blue" />
          <Legend
            orientation="vertical"
            itemTextPosition="right"
            horizontalAlignment="center"
            verticalAlignment="bottom"
            columnCount={4}
          >
            <Font size={16} color="blue" />
          </Legend>
          <Series argumentField="region" valueField="val">
            <Label
              visible={true}
              position="columns"
              customizeText={customizeText}
            >
              <Connector visible={true} width={1} />
            </Label>
          </Series>
        </PieChart>
      </div>
    </div>
  );
};

export default Home;
