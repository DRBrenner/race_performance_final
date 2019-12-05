
// d3.json(`/2018_race_results`).then((data) => {
//   console.log(data)
//   var courseId = [];
//   var racersInRace = [];
//   var raceId = [];
//   var meetDate = [];
//   var racersWithPRs = [];
//   var percentPRs = [];


//   data.forEach(function (element) {
//     courseId.push(element.course_id)
//     racersInRace.push(element.racers_in_race)
//     raceId.push(element.race_id)
//     meetDate.push(new Date(element.meet_date))
//     // meetDate.push(${new Date(element.meet_date).getFullYear()}-${new Date(element.meet_date).getMonth()}-${new Date(element.meet_date).getDate()})
//     racersWithPRs.push(element.racers_w_prs)
//     percentPRs.push(element.percent_prs)
//   });

//   var trace1 = {
//     x: racersInRace,
//     y: racersWithPRs,
//     name: "Marker size represents percentage of PRs in the race",
//     text: racersWithPRs,
//     mode: 'markers',
//     marker: {
//       size: percentPRs,
//       sizeref: 4,
//       color: "#86a4b8" //color is bluish gray
//     }
//   };

//   var plot1 = [trace1];

//   var layout = {
//     title: "Effects of Race Size on Personal Records (PRs) in 2018",
//     showlegend: true,
//     legend: {
//       x: .28,
//       y: 1.15
//     },
//     // height: 650,
//     // width: 650,
//     yaxis: {
//       title: {
//         text: 'Number of PRs in Race'
//       }
//     },
//     xaxis: {
//       title: {
//         text: 'Total Racers in Race'
//         // font: {
//         //   family: 'Courier New, monospace',
//         //   size: 14,
//         //   color: '#7f7f7f'
//       }
//     }
//   };
//   Plotly.newPlot('plot1', plot1, layout, { responsive: true });
// });



// d3.json(`/state_finals_2018_all`).then((data) => {
//   console.log(data)
//   var courseId = [];
//   var meetDate = [];
//   var raceResult = [];
//   var gender = [];
//   var distance = [];
//   var grade_number = [];
//   var goal_flag = [];
//   var goal_time = [];
//   var pace = [];
//   var runr_id = [];
//   var runner_count = [];
//   var max_effort_log_entries_nov = [];


//   data.forEach(function (element) {

//     //if (meetDate < "12/31/2018") {
//     // if (element.gender == "b") {

//     courseId.push(element.course_id)
//     meetDate.push(new Date(element.meet_date))
//     // meetDate.push(${new Date(element.meet_date).getFullYear()}-${new Date(element.meet_date).getMonth()}-${new Date(element.meet_date).getDate()})
//     raceResult.push(element.race_result * .01) //to get seconds
//     if (element.gender == "b") {
//       gender.push(1);
//     }
//     else if (element.gender == "g") {
//       gender.push(0);
//     }
//     // gender.push(element.gender)
//     distance.push(element.distance)
//     grade_number.push(element.grade)
//     goal_flag.push(element.goal_flag)
//     goal_time.push(element.goal_time)
//     pace.push(element.pace)
//     runr_id.push(element.runr_id)
//     runner_count.push(element.runner_count)
//     max_effort_log_entries_nov.push(element.max_effort_log_entries_nov)

//   });
//   console.log(runner_count)


//   var trace2 = {
//     x: pace,
//     y: pace,
//     text: runner_count,
//     mode: 'markers',
//     marker: {
//       size: runner_count,
//       sizeref: 8,
//       // color: runner_count,
//       // colorscale: "Rainbow",
//       color: gender,
//       colorscale: [[0, "#d62728"], [1, "#1f77b4"]], //colors are male(0): mutedblue, girl(1): brick red
//       opacity: .5,
//       hovertext: runner_count
//     }


//   };


//   var plot2 = [trace2];

//   var layout = {
//     title: "Effects of Gender & School Size - State Finals 2018<br>(Males: Blue, Females: Red<br>Bubble Size: Size of School's Track Team)",
//     showlegend: false,
//     // height: 650,
//     // width: 650,
//     xaxis: {
//       title: {
//         text: 'Finish Placement (left to right)'
//         // font: {
//         //   family: 'Courier New, monospace',
//         //   size: 14,
//         //   color: '#7f7f7f'
//       },
//       showticklabels: false
//     },
//     yaxis: {
//       title: {
//         text: 'Pace (minute mile)'
//       }
//     }

//   };
//   Plotly.newPlot('plot2', plot2, layout, { responsive: true });
// });

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
    text: genderg,
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
    title: 'Effects of Time on Pace<br>Average Pace (seconds) of all XC Race Winners between 2011 - 2018',
    showlegend: true,
    legend: {
      x: .85,
      y: 1
    },
    // height: 400,
    // width: 1100,
    xaxis: {
      title: {
        text: 'Year'
        // font: {
        //   family: 'Courier New, monospace',
        //   size: 14,
        //   color: '#7f7f7f'
      }
    },
    yaxis: {
      range: [4, 16],
      title: {
        text: 'Pace (minutes/mile)'
      }
    }
  };
  Plotly.newPlot('plot3', plot3, layout, { responsive: true });
});

var xRunners = ['League Meet', 'Winning Racers', 'State Qualifiers'];
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

Plotly.newPlot('plot4', data, layout);

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

// d3.json(`/grade_levels_at_state`).then((data) => {
//   console.log(data)
//   var gradeg = [];
//   var gradeb = [];
//   var grade = [];
//   var gender = [];
//   var genderg = [];
//   var genderb = [];
//   var runr_idg = [];
//   var runr_idb = [];

//   data.forEach(function (element) {

//     grade.push(element.grade_number)
//     if (element.gender == "b") {
//       genderb.push(1);
//       gradeb.push(element.grade_number);
//       runr_idb.push(element.runr_id);
//     }
//     else if (element.gender == "g") {
//       genderg.push(0);
//       gradeg.push(element.grade_number);
//       runr_idg.push(element.runr_id);
//     }

//   });
  

//   var trace1 = {
//     x: ['Seniors', 'Juniors', 'Sophomores', 'Freshmen'],
//     y: runr_idb,
//     name: 'Males',
//     type: 'bar',
//     marker: {
//       color: '#1f77b4',
//       opacity: .75
//     }

//   };

//   var trace2 = {
//     x: ['Seniors', 'Juniors', 'Sophomores', 'Freshmen'],
//     y: runr_idg,
//     name: 'Females',
//     type: 'bar',
//     marker: {
//       color: '#d62728',
//       opacity: .75

//     }
//   };

//   var data = [trace1, trace2];

//   var layout = {
//     title: "Effects of Grade (Age) on Race Speed<br>CA State Meet 2018 Qualifiers",
//     barmode: 'group',
//     showlegend: true,
//     legend: {
//       x: .75,
//       y: 1
//     }
//   };

//   Plotly.newPlot('plot6', data, layout, { responsive: true });
// });

// d3.json(`/state_finals_2018_all`).then((data) => {
//   console.log(data)
//   var logEntriesNov = [];
//   var maxEffortLogEntriesNov = [];
//   var pace = [];
//   var prFlag = [];


//   data.forEach(function (element) {

//     logEntriesNov.push(element.log_entries_nov)
//     maxEffortLogEntriesNov.push(element.max_effort_log_entries_nov)
//     pace.push(element.pace)
//     prFlag.push(element.pr_flag)
//   });
//   console.log(maxEffortLogEntriesNov)

//   var trace7 = {
//     x: pace,
//     y: maxEffortLogEntriesNov,
//     text: logEntriesNov,
//     type: 'bar',
//     marker: {
//       color: prFlag,
//       colorscale: [[0, "#d62728"], [1, "#1f77b4"]], //colors are No PR(0): mutedblue, PR(1): brick red
//       opacity: .5,
//       hovertext: logEntriesNov
//     }
//   };

//   var plot7 = [trace7];

//   var layout = {
//     title: "Effects of Max Effort Training Log Entries on PRs<br>CA State Finals 2018<br>(red bar indicates a PR was achieved)",
//     showlegend: false,
//     // height: 650,
//     // width: 650,
//     xaxis: {
//       title: {
//         text: 'Finish Placement (left to right)'
//         // font: {
//         //   family: 'Courier New, monospace',
//         //   size: 14,
//         //   color: '#7f7f7f'
//       },
//       showticklabels: false
//     },
//     yaxis: {
//       title: {
//         text: '# Max Effort Log Entries in Month Prior to Meet'
//       }
//     }

//   };
//   Plotly.newPlot('plot7', plot7, layout, { responsive: true });
// });

// d3.json(`/cvc1_meet_all`).then((data) => {
//   console.log(data)
//   var logEntriesSept = [];
//   var maxEffortLogEntriesSept = [];
//   var pace = [];
//   var prFlag = [];


//   data.forEach(function (element) {

//     logEntriesSept.push(element.log_entries_sept)
//     maxEffortLogEntriesSept.push(element.max_effort_log_entries_sept)
//     pace.push(element.pace)
//     prFlag.push(element.pr_flag)
//   });
//   console.log(maxEffortLogEntriesSept)

//   var trace8 = {
//     x: pace,
//     y: maxEffortLogEntriesSept,
//     text: logEntriesSept,
//     type: 'bar',
//     marker: {
//       color: prFlag,
//       colorscale: [[0, "#d62728"], [1, "#1f77b4"]], //colors are No PR(0): mutedblue, PR(1): brick red
//       opacity: .5,
//       hovertext: logEntriesSept
//     }
//   };

//   var plot8 = [trace8];

//   var layout = {
//     title: "Effects of Max Effort Training Log Entries on PRs<br>First Central Valley Meet 2018<br>(red bar indicates a PR was achieved)",
//     showlegend: false,
//     // height: 650,
//     // width: 650,
//     xaxis: {
//       title: {
//         text: 'Finish Placement (left to right)'
//         // font: {
//         //   family: 'Courier New, monospace',
//         //   size: 14,
//         //   color: '#7f7f7f'
//       },
//       showticklabels: false
//     },
//     yaxis: {
//       title: {
//         text: '# Max Effort Log Entries in Month Prior to Meet'
//       }
//     }

//   };
//   Plotly.newPlot('plot8', plot8, layout, { responsive: true });
// });
