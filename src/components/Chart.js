import React, { useEffect } from "react";
import Chart from "chart.js";
import variables from "../sass/_variables.scss";
import "../sass/_Chart.scss";

function getRandomData(number) {
  const date = [];
  for (let i = 0; i < number; i++) {
    const randomDate = parseInt(Math.random() * 100);
    date.push(randomDate);
  }
  return date;
}

const MyChart = () => {
  const canvasRef = React.useRef(null);
  const dateSets = 3;

  useEffect(() => {
    draw();
  }, []);
  function draw() {
    const chartData = getRandomData(dateSets);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 100, 50);
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Work", "Drugs", "Love"],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: ["green", "black", "red"],
            borderColor: `${variables.accentColor}`,
            data: chartData
          }
        ]
      },
      // Configuration options go here
      options: {
        title: {
          display: true,
          fontColor: `white`,
          fontSize: `${variables.fontSize}`,
          fontFamily: `${variables.fontFamily}`,
          text: "Happiness chart",
          position: "top"
        },
        legend: {
          position: "bottom",
          labels: {
            // This more specific font property overrides the global property
            fontColor: `white`,
            fontFamily: `${variables.fontFamily}`
          }
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const meta = dataset._meta[Object.keys(dataset._meta)[0]];
              const total = meta.total;
              const currentValue = dataset.data[tooltipItem.index];
              const percentage = parseFloat(
                ((currentValue / total) * 100).toFixed(1)
              );
              return currentValue + " (" + percentage + "%)";
            },
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        }
      }
    });
  }

  const myChart = (
    <section className="chart section" id="chart">
      <canvas ref={canvasRef} height={320} width={window.innerWidth}></canvas>;
    </section>
  );
  return myChart;
};
export default MyChart;
