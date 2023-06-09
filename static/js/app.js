const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
// Fetch the JSON data and console log it
d3.json(url).then(function (importedData) {
  initMyPage(importedData)
})
let globalData = []
function initMyPage(data) {
    globalData = data
    let otu_ids=data.samples[0]["otu_ids"];
    let values=data.samples[0]["sample_values"].reverse();
    let toolTip=data.samples[0]["otu_labels"].reverse();

    let traceData = [{y:otu_ids.map(row=>"OTU "+row),
      x:values,
      type:"bar",
      orientation:'h'
    }];
    // Apply a title to the layout
      let layout = {title: "Top OTUs"};
    // Render the plot to the div tag with id "plot"
      Plotly.newPlot("bar",traceData, layout);

      var select = document.getElementById("selDataset");
      for(var i = 0; i < data.samples.length; i++) {
        var id = data.samples[i]["id"];
        var option = document.createElement("option");
        option.textContent = id;
        option.value = i;
        select.append(option);
    }
    let traceData2 = [{x:otu_ids,
      y:values,
      mode:"markers",
      marker: {
        size:values,
        color: otu_ids,
        // color: [35, 10, 50, 40, 18, 30],
        colorscale: 'YlGnBu',
        sizemode: 'area'
      }}];
    // Apply a title to the layout
    let layout2 = {
      title: {
        text:'Bubble Chart',
        font: {
          family: 'Courier New, monospace',
          size: 24
        },
      },
      xaxis: {
        title: {
          text: 'otu_ids',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        },
      },
    };
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble",traceData2, layout2);
    //d3.selectAll("#selDataset").on("change", updatePlotly);

    // This function is called when a dropdown menu item is selected
    // function updatePlotly() {
    //   // Use D3 to select the dropdown menu
      
    // }
}

function optionChanged(value){
  let values=globalData.samples[value]["sample_values"].reverse()
  let otu_ids=globalData.samples[value]["otu_ids"].reverse()
  let toolTip=globalData.samples[value]["otu_labels"].reverse()

  x = values;
  y = otu_ids.map(row=>"OTU "+row);
  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle("bar", "x", [x]);
  Plotly.restyle("bar", "y", [y]);
  Plotly.restyle("bubble", "x", [otu_ids]);
  Plotly.restyle("bubble", "y", [values]);
}


























// function D (data) {
//   let otu_ids=data.samples[0]["otu_ids"];
//   let values=data.samples[0]["sample_values"].reverse();
//   let toolTip=data.samples[0]["otu_labels"].reverse();

//   let traceData = [{y:otu_ids.map(row=>"OTU "+row),
//   x:values,
//   type:"bar",
//   orientation:'h'
// }];
// // Apply a title to the layout
//   let layout = {title: "Top OTUs"};
// // Render the plot to the div tag with id "plot"
//   Plotly.newPlot("bar",traceData, layout);

//   var select = document.getElementById("selDataset");
//   for(var i = 0; i < input_data.samples.length; i++) {
//     var id = input_data.samples[i]["id"];
//     var option = document.createElement("option");
//     option.textContent = id;
//     option.value = i;
//     select.append(option);
// }
// let traceData2 = [{x:otu_ids,
//   y:values,
//   mode:"markers",
//   marker: {
//     size:values,
//     color: otu_ids,
//     // color: [35, 10, 50, 40, 18, 30],
//     colorscale: 'YlGnBu',
//     sizemode: 'area'
//   }}];
// // Apply a title to the layout
// let layout2 = {
//   title: {
//     text:'Bubble Chart',
//     font: {
//       family: 'Courier New, monospace',
//       size: 24
//     },
//   },
//   xaxis: {
//     title: {
//       text: 'otu_ids',
//       font: {
//         family: 'Courier New, monospace',
//         size: 18,
//         color: '#7f7f7f'
//       }
//     },
//   },
// };
// // Render the plot to the div tag with id "plot"
// Plotly.newPlot("bubble",traceData2, layout2);
// // Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//   // Use D3 to select the dropdown menu
//   let dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   let dataset = dropdownMenu.property("value");
// }
// let values=input_data.samples[dataset]["sample_values"].reverse()
// let otu_ids=input_data.samples[dataset]["otu_ids"].reverse()
// let toolTip=input_data.samples[dataset]["otu_labels"].reverse()

// x = values;
// y = otu_ids.map(row=>"OTU "+row);
// // Note the extra brackets around 'x' and 'y'
// Plotly.restyle("bar", "x", [x]);
// Plotly.restyle("bar", "y", [y]);
// Plotly.restyle("bubble", "x", [otu_ids]);
// Plotly.restyle("bubble", "y", [values]);
// }
// init();
// }

// //   let sData=data.sort(function compareFunction(a, b) {
// //     // resulting order is (3, 2, 1)
// //     return b.samples.otu_ids - a.samples.otu_ids;
// //   });
// // console.log(sData);