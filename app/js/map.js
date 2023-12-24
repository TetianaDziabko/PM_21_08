(async () => {
    const topology = await fetch(
       'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());
    Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population-density.json', function (data) {
       data.forEach(function (p) {
          p.value = (p.value < 1 ? 1 : p.value);
       });
       Highcharts.mapChart('topSearch_map', {
          chart: {
             map: topology,
             backgroundColor: '#ffffff',
          },
          title: {
             text: " ",
          },
          legend: {
             enabled: false,
          },
          tooltip: {
             backgroundColor: '#222222',
             padding: 8,
             headerFormat: '',
             pointFormat: '<span style="color: #ffffff">{point.name}</span>',
          },

          exporting: {
             buttons: {
                contextButton: {
                   enabled: false,
                }
             }
          },
          mapNavigation: {
             enabled: true,
             enableDoubleClickZoomTo: true,
          },
          series: [{
             data: data,
             joinBy: ['iso-a2', 'code'],
             color: '#c6c6c6',
          }]
       });
    });
 })();