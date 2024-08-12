import { Doughnut, Chart } from 'react-chartjs-2';

var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);

    var chart = this.chart;
    var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

    var fontSize = (height / 114).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";

    var sum = calculateGrade(chart.config.data.datasets[2].data, chart.config.data.datasets[1].data).toFixed(1);

    var text = sum,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = (height / 2);

    ctx.fillText(text, textX, textY);
  }
});

const calculateGrade = (grades, credits) => {
  var sum = 0
  var creditSum = 0
  for(let i = 0; i < grades.length; i++){
    sum = sum + grades[i] * credits[i]
    creditSum = creditSum + credits[i]
  }
  return sum / creditSum
}
