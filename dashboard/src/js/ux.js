$(".tab-progress").progress();
$(".ui.dropdown").dropdown();

var ctx = document.getElementById("consumptionTrend").getContext('2d');
var consumptionTrendChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["01", "02", "03", "04", "05", "06"],
        datasets: [{
            label: 'Consumption in litres',
            data: [12, 10,30,0,0,0],
            backgroundColor: [
                'rgba(54, 162, 235, .9)', 'rgba(54, 162, 235, .9)', 'rgba(54, 162, 235, .9)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

var ctx1 = document.getElementById("trendOne").getContext('2d');
var trendOne = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ["01", "02", "03", "04", "05", "06"],
        datasets: [{
            label: 'Volume (cubic meters)',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(162, 54, 235, .9)',
            ],
            borderColor: [
                'rgba(162, 54, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

var ctx2 = document.getElementById("trendTwo").getContext('2d');
var trendTwo = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ["01", "02", "03", "04", "05", "06"],
        datasets: [{
            label: 'Spillage (litres)',
            data: [19, 10, 7, 5, 0, 0],
            backgroundColor: [
                'rgba(235, 54, 162, .9)',
            ],
            borderColor: [
                'rgba(235, 54, 162, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

var ctx3 = document.getElementById("trendThree").getContext('2d');
var trendThree = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ["01", "02", "03", "04", "05", "06"],
        datasets: [{
            label: 'Accounts',
            data: [2, 9, 13, 15, 22, 33],
            backgroundColor: [
                'rgba(162, 235, 54, .9)',
            ],
            borderColor: [
                'rgba(162, 235, 54, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});