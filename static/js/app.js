d3.json(`/2018_race_results`).then((data) => {
  console.log(data)
  var courseId = [];
  var racersInRace = [];
  var raceId = [];
  var meetDate = [];
  var racersWithPRs = [];
  var percentPRs = [];


  data.forEach(function (element) {
    courseId.push(element.course_id)
    racersInRace.push(element.racers_in_race)
    raceId.push(element.race_id)
    meetDate.push(new Date(element.meet_date))
    // meetDate.push(${new Date(element.meet_date).getFullYear()}-${new Date(element.meet_date).getMonth()}-${new Date(element.meet_date).getDate()})
    racersWithPRs.push(element.racers_w_prs)
    percentPRs.push(element.percent_prs)
  });

  var trace1 = {
    x: racersInRace,
    y: racersWithPRs,
    text: percentPRs,
    mode: 'markers',
    marker: {
      size: percentPRs,
      sizeref: 4,
      color: "green"
    }};

  var plot1 = [trace1];

  var layout = {
    showlegend: false,
    height: 400,
    width: 400,
    yaxis: {
      title: {
        text: 'Number of Racers with PRs'
      }
    },
    xaxis: {
      title: {
        text: 'Total Racers in Race'
        // font: {
        //   family: 'Courier New, monospace',
        //   size: 14,
        //   color: '#7f7f7f'
      }
    }
  };
  Plotly.newPlot('plot1', plot1, layout, { responsive: true });
});


d3.json(`/all_races_winners`).then((data) => {
  console.log(data)
  var courseId = [];
  var meetDate = [];
  var raceResult = [];
  var gender = [];
  var distance = [];
  var grade_number = [];
  var goal_flag = [];
  var goal_time = [];


  data.forEach(function (element) {


    if (meetDate < "12/31/2018") {
    // if (element.gender == "b") {



      courseId.push(element.course_id)
      meetDate.push(new Date(element.meet_date))
      // meetDate.push(${new Date(element.meet_date).getFullYear()}-${new Date(element.meet_date).getMonth()}-${new Date(element.meet_date).getDate()})
      raceResult.push(element.race_result * .01) //to get seconds
      if (element.gender == "b") {
        gender.push(1);
      }
      else if (element.gender == "g") {
        gender.push(0);
      }

      // gender.push(element.gender)
      distance.push(element.distance)
      grade_number.push(element.grade)
      goal_flag.push(element.goal_flag)
      goal_time.push(element.goal_time)
    };
  });

  var trace2 = {
    x: meetDate,
    y: raceResult,
    text: gender,
    mode: 'markers',
    marker: {
      // size: percentPRs,
      // sizeref: 4,
      color: gender,
      colorscale: [[0, "mediumblue"], [1, "pink"]],
      hovertext: gender
    }


  };
  console.log(meetDate)
  console.log(raceResult)
  console.log(distance)
  console.log(gender)
  var plot2 = [trace2];

  var layout = {
    showlegend: false,
    height: 400,
    width: 400,
    xaxis: {
      title: {
        text: 'Meet Date'
        // font: {
        //   family: 'Courier New, monospace',
        //   size: 14,
        //   color: '#7f7f7f'
      }
    },
    yaxis: {
      title: {
        text: 'Race Result'
      }
    }

  };
  Plotly.newPlot('plot2', plot2, layout, { responsive: true });
});

// d3.json(`/state_finals_2018`).then((data) => {
//   console.log(data)
//   var courseId = [];
//   var meetDate = [];
//   var raceResult = [];
//   var gender = [];
//   var grade_number = [];
//   var pr_flag = [];
//   var goal_flag = [];
//   var goal_time = [];



//   data.forEach(function (element) {

//     courseId.push(element.course_id)
//     meetDate.push(element.meet_date)
//     raceResult.push(element.race_result)
//     gender.push(element.gender)
//     distance.push(element.distance)
//     grade.push(element.grade)
//     gradeNumber.push(element.grade)
//     goalFlag.push(element.goal_flag)
//     goalTime.push(element.goal_time)
//   });

//   var trace1 = {
//     x: gradeNumber,
//     y: raceResult.length,
//     name: 'SF Zoo',
//     type: 'bar'
//   };

//   var trace2 = {
//     x: ['giraffes', 'orangutans', 'monkeys'],
//     y: [12, 18, 29],
//     name: 'LA Zoo',
//     type: 'bar'
//   };

//   var data = [trace1, trace2];

//   var layout = {barmode: 'group'};

//   Plotly.newPlot('plot3', data, layout);
// });







//     var panel = d3.select("#sample-metadata");

//     // Use `.html("") to clear any existing metadata
//     panel.html("");

//     // Use `Object.entries` to add each key and value pair to the panel
//     // tags for each key-value in the metadata.
//     Object.entries(data).forEach(([key, value]) => {
//       panel.append("p").text(`${key}: ${value}`);

//     })
//   })
// };


// function buildCharts(sample) {

// //  Use `d3.json` to fetch the sample data for the plots
//   d3.json(`/samples/${sample}`).then((response) => {
// //  Build a Bubble Chart using the sample data
//     var trace1 = {
//       x: response.otu_ids,
//       y: response.sample_values,
//       text: response.otu_ids,
//       mode: 'markers',
//       marker: {
//         size: response.sample_values,
//         color: response.otu_ids,
//         colorscale: "Rainbow"
//       }
//     };
//     var bubble = [trace1];

//     var layout = {
//       showlegend: false,
//       height: innerHeight,
//       width: innerWidth,
//       yaxis: {
//         title: {
//           text: 'Samples'
//         }
//       },
//       xaxis: {
//         title: {
//           text: 'OTU ID'
//           // font: {
//           //   family: 'Courier New, monospace',
//           //   size: 14,
//           //   color: '#7f7f7f'
//         }
//       }
//     };

//     Plotly.newPlot('bubble', bubble, layout, { responsive: true });
//   });


//     // Build a Pie Chart
//     // Use slice() to grab the top 10 sample_value
//   d3.json(`/samples/${sample}`).then((response) => {
//     var pieInfo = [{
//       values: response.sample_values.slice(0, 10),
//       labels: response.otu_ids.slice(0, 10),
//       hovertext: response.otu_labels.slice(0, 10),
//       type: 'pie'
//     }];

//     var layout = {
//       height: 500,
//       width: 800,
//       margin: {
//         l: 10,
//         r: 10,
//         b: 10,
//         t: 1,
//         pad: 1
//       }

//     };

//     Plotly.newPlot('pie', pieInfo, layout, { displayModeBar: false }, { responsive: true });
//   });
// };

// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDataset");

//   // Use the list of sample names to populate the select options
//   d3.json("/names").then((sampleNames) => {
//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

//     // Use the first sample from the list to build the initial plots
//     const firstSample = sampleNames[0];
//     buildCharts(firstSample);
//     buildMetadata(firstSample);
//   });
// }

// function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected
//   buildCharts(newSample);
//   buildMetadata(newSample);
// };

// // Initialize the dashboard
// init();
