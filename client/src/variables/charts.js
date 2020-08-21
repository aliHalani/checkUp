// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");

var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;




const dailySalesChart = {
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [[6, 9, 4, 9, 12, 9, 17]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 25, 
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },

  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

const dailyPrescriptionChart = {
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [[3, 4, 1, 3, 4, 7, 9]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 20, 
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },

  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};



module.exports = {
  dailySalesChart,
  dailyPrescriptionChart
};
