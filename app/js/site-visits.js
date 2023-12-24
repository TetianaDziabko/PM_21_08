const paddingBelowLegends={
    id:'paddingBelowLegends',
    beforeInit(chart, legend, options){
      const fitValue=chart.legend.fit;
  
      chart.legend.fit=function fit(){
        fitValue.bind(chart.legend)();
        return this.height += 20
      }
    }
  }
  let ctx2 = document.getElementById('site_visits').getContext('2d');
  let site_visits = new Chart(ctx2,{
      type: 'line',
      data:{
          labels: [
            'Red',
            'Blue',
            'Yellow'
          ],
          datasets: [{
            label: 'New Visitors',
            data: [300, 50, 100],
            backgroundColor: [
              '#00cccc'
            ],
            borderColor:'#00cccc',
            yAxisID: 'y2',
          },
          {
            label: 'Old Visitors',
            data: [300, 400, 100],
            backgroundColor: [
              '#f1a80a'
            ],
            borderColor:'#f1a80a',
            yAxisID: 'y1',
          }
        ]
        },
        plugins: [paddingBelowLegends],
      options: {
        plugins: {
          legend: {
            align:'start'
        },
          chartAreaBorder: {
            borderColor: 'rgb(255, 205, 86)',
            borderWidth: 2,
            borderDash: [5, 5],
            borderDashOffset: 3,
          }
        },
        elements: {
          point: {
              pointBorderColor: "#ffffff",
              borderWidth: 6,
              pointHitRadius: 13,
              hoverBorderWidth: 8,
              pointHoverRadius: 14,
              pointRadius: 10,
          },
  
      },
        scales: {
          x: {
            grid: {
              color: '#cfcfcf',
              borderDash: [5, 5],
              borderDashOffset: 3,
              borderColor:'white',
            },
            ticks: {
              display:false,
              }
          },
          y2: {
            display: false,
          },
          y1: {
            display: false,
          },
        },
      }
  })