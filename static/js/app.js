
// REMOVED ALL CODE FOR PLOTLY GRAPHS EXCEPT THE ONES USING 2011-2018 DATA
// PLOT3 - ALL RACE WINNERS OVER TIME
d3.json(`/all_races_winners_averages`).then((data) => {
  var year = [];
  var yearb = [];
  var yearg = [];
  var raceResult = [];
  var gender = [];
  var genderb = [];
  var genderg = [];
  var pace = [];
  var paceb = [];
  var paceg = [];
  var runr_id = [];
  var runner_count = [];

  data.forEach(function (element) {

    year.push(new Date(element.year))
    raceResult.push(element.race_result * .01) //to get seconds
    if (element.gender == "b") {
      genderb.push(1);
      yearb.push(element.year);
      paceb.push(element.pace);
    }
    else if (element.gender == "g") {
      genderg.push(0);
      yearg.push(element.year);
      paceg.push(element.pace);
      console.log(yearg);
    }
    gender.push(element.gender)
    pace.push(element.pace)
    runr_id.push(element.runr_id)
    runner_count.push(element.runner_count)
  });
  
  var males = {
    x: yearb,
    y: paceb,
    name: "Males",
    mode: 'lines+markers',
    marker: {
      // size: runner_count,
      // sizeref: 12,
      color: "#1f77b4",
      opacity: .75
    }
  };

  var females = {
    x: yearg,
    y: paceg,
    name: "Females",
    // text: genderg,
    mode: 'lines+markers',
    marker: {
      // size: runner_count,
      // sizeref: 12,
      color: "#d62728",
      opacity: .5
    }
  };

  var plot3 = [males, females];

  var layout = {
    title: 'Effects of Time and Gender on Pace<br>(averaged pace of all race winners per year)',
    showlegend: true,
    legend: {
      x: .85,
      y: 1.3
    },
    height: 350,
    xaxis: {
      title: {
        text: 'Year'
      }
    },
    yaxis: {
      range: [5, 9],
      title: {
        text: 'Pace (minutes/mile)'
      }
    }
  };
  Plotly.newPlot('plot3', plot3, layout, { responsive: true });
});

var xRunners = ['League Meet', 'Winning Racers', '2018 State Qualifiers'];
var yTotal = [186, 5931, 622];
var yPRs = [31, 1364, 254];
var yGoalsSet = [2, 235, 10];
var yGoalsMet = [0, 67, 0];

var trace1 = {
  x: xRunners,
  y: yTotal,
  name: "Total Racers",
  type: 'bar',
  text: yTotal.map(String),
  textposition: 'auto',
  hoverinfo: 'none',
  marker: {
    color: '#86a4b8',
    line: {
      color: 'rgb(8,48,107)',
      width: .5
    }
  }
};

var trace2 = {
  x: xRunners,
  y: yPRs,
  name: "PRs Achieved",
  type: 'bar',
  text: yPRs.map(String),
  textposition: 'auto',
  hoverinfo: 'none',
  marker: {
    color: 'rgba(58,200,225,.5)',
    line: {
      color: 'rgb(8,48,107)',
      width: .5
    }
  }
};

var trace3 = {
  x: xRunners,
  y: yGoalsSet,
  name: "Goals Set",
  type: 'bar',
  text: yGoalsSet.map(String),
  textposition: 'auto',
  hoverinfo: 'none',
  opacity: 0.5,
  marker: {
    color: '#1f77b4',
    line: {
      color: 'rgb(8,48,107)',
      width: .5
    }
  }
};

var trace4 = {
  x: xRunners,
  y: yGoalsMet,
  name: "Goals Met",
  type: 'bar',
  text: yGoalsMet.map(String),
  textposition: 'auto',
  hoverinfo: 'none',
  marker: {
    color: 'black',
    line: {
      color: 'black',
      width: .5
    }
  }
};

var data = [trace1, trace2, trace3, trace4];

var layout = {
  title: 'Effects of Setting Goals for Specific Groups',
  showlegend: true,
  yaxis: {
    title: {
      text: 'Total Number of Runners'
    }
  },
  legend: {
    x: .65,
    y: 1
  }
};

Plotly.newPlot('plot4', data, layout, { responsive: true });

var data = [
  {
    x: ['Total Racers', 'PRs', 'Goals Set', 'Goals Met'],
    y: [69230, 16848, 3059, 315],
    type: 'bar',
    color: "mutedblue"
  }
];
var layout = {
  title: 'Effects of Setting Goals<br>All Races 2011-2018'
};

Plotly.newPlot('plot5', data, layout);

