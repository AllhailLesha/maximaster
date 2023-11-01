const ctx = document.getElementById('myChart');
let cpuLoad;
let temp;
let requests = new Array();

let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [], 
      datasets: [{
        label: 'CPU-Load',
        data: [], 
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
            display: true
        },
        y: {
            beginAtZero: true,
            min: 1,
            max: 100,
            ticks: {
                stepSize: 10,
            }
        }
      }
    }
  });

  function getCpuLoad() {
    fetch("http://cpu-load/server.php")
    .then(response => response.json())
    .then((serverResponse) => {
        console.log(serverResponse);
        if (serverResponse === 0) {
            cpuLoad = temp;
            requests.push(serverResponse);
        } else {
            cpuLoad = serverResponse;
            temp = cpuLoad;
            requests.push(serverResponse);
        }
    })
    .catch(error => console.error(error)); 
}
  

  setInterval(function() {
    var label = requests.length;
    getCpuLoad();
  
    printRequests();
    
    if (chart.data.labels.length > 20) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }

    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(cpuLoad);
    
    chart.update();
  }, 5000);


  function printRequests() {
    let information = document.getElementById("information");
    information.innerHTML = "Число запросов - " + requests.length + ". Процент ошибок - " + printRateOfMistake(searchErrorOnRequests()).toFixed(3) + "%.";
  }

  function searchErrorOnRequests() {
    let numberOfMistakes = 0;
    for(let i = 0; i < requests.length - 1; i++) {
        if (requests[i] == 0) {
            numberOfMistakes++;
        }
    }
    return numberOfMistakes;
}

function printRateOfMistake(numberOfMistakes) {
    if (numberOfMistakes > 0) {
        return numberOfMistakes / requests.length;
    } else {
        return 0;
    }
}