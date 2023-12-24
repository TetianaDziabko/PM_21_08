async function getData(dataType) {
  try {
    const response = await fetch('./data.json');
    const jsonData = await response.json();

    if (jsonData.doughnutData && Array.isArray(jsonData.doughnutData)) {
      return jsonData.doughnutData;
    } else {
      throw new Error('Invalid or missing doughnutData in the data file.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function buildChart() {
  try {
    const doughnutData = await getData('doughnut');

    const labels = doughnutData.map(item => item.label);
    const values = doughnutData.map(item => item.value);

    let ctx = document.getElementById('marceting_camping').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: values,
          backgroundColor: [
            '#85c875',
            '#00cccc',
            '#3366ff',
            '#f1a80a'
          ],
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }
        }
      },
      plugins: [{
        id: 'text',
        beforeDraw: function (chart, a, b) {
          let width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

          ctx.restore();
          let fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          let text = 'MC',
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }],
    });
  } catch (error) {
    console.error('Error processing data:', error);
    // Опрацювання помилки
  }
}

// Виклик функції для побудови графіка
buildChart();