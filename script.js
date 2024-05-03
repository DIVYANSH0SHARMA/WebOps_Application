const apikey = 'demo'; // Replace with your Alpha Vantage API key
const symbol = 'IBM';
const interval = '5min';

fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo`)
   .then(response => response.json())
   .then(data => {
        const series = [];
        Object.keys(data['Time Series (5min)']).forEach(key => {
            const date = new Date(key);
            const open = data['Time Series (5min)'][key]['1. open'];
            const high = data['Time Series (5min)'][key]['2. high'];
            const low = data['Time Series (5min)'][key]['3. low'];
            const close = data['Time Series (5min)'][key]['4. close'];
            // const volume = data['Time Series (5min)'][key]['5. volume'];
            series.push({
                x: date,
                y: [open, high, low, close,]
            });
        });

        const options = {
            series: [{
                data: series
            }],
            chart: {
                type: 'candlestick',
                height: 350
            },
            title: {
                text: 'CandleStick Chart',
                align: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true
                }
            }
        };

        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    })
   .catch(error => console.error(error));