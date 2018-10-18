var monday;
var tuesday;
var wednesday;
var thursday;
var friday;

var period1;
var period2;
var period3;

var currentDay;
var currentPeriod;

var graph;
function updateDisplay(element){
    if($(element).hasClass("dayTile")){
        $(currentDay).removeClass("active"); 
        currentDay = $(element);
    }
    if($(element).hasClass("periodTile")){
        $(currentPeriod).removeClass("active");  
        currentPeriod = $(element);
    }
    var day = currentDay.attr('day');
    var period = currentPeriod.attr('period');
    
    var series = data[day][period];
    
    for (var i = graph.series.length-1; i>=0; i--) {
            graph.series[i].remove();
        }
    
    graph.addSeries(series, true);
    for (var y = series.length-1; y >= 0; y--) {
            graph.addSeries(series[y]);
        }
    
    
    
    $(element).addClass("active");
}

var data =
{
 
    'monday': {'period1': [0, {'name': 'Happy', 'data': [0.51, 0.94, 0.58, 0.18, 0.05, 0.29, 0.53, 0.67]}, {'name': 'Mad', 'data': [0.11, 0.18, 0.88, 0.3, 0.1, 0.54, 0.92, 0.14]}, {'name': 'Sadness', 'data': [0.9, 0.68, 0.84, 0.57, 0.43, 0.62, 0.58, 0.35]}, {'name': 'Contempt', 'data': [0.27, 0.29, 0.61, 0.68, 0.77, 0.54, 0.8, 0.25]}, {'name': 'Neutral', 'data': [0.65, 0.68, 0.52, 0.65, 0.5, 0.68, 0.98, 0.83]}], 'period2': [0, {'name': 'Happy', 'data': [0.22, 0.73, 0.33, 0.82, 0.46, 0.89, 0.38, 0.04]}, {'name': 'Mad', 'data': [0.3, 0.62, 0.27, 0.46, 0.61, 0.01, 0.49, 0.42]}, {'name': 'Sadness', 'data': [0.23, 0.74, 0.0, 0.19, 0.88, 0.98, 0.33, 0.52]}, {'name': 'Contempt', 'data': [0.65, 0.43, 0.68, 0.02, 0.94, 0.9, 0.62, 0.2]}, {'name': 'Neutral', 'data': [0.46, 0.75, 0.93, 0.17, 0.26, 0.27, 0.99, 0.24]}], 'period3': [0, {'name': 'Happy', 'data': [0.02, 0.29, 0.83, 0.28, 0.01, 1.0, 0.89, 0.25]}, {'name': 'Mad', 'data': [0.45, 0.19, 0.59, 0.84, 0.14, 0.26, 0.8, 0.1]}, {'name': 'Sadness', 'data': [0.06, 0.22, 0.99, 0.25, 0.62, 0.08, 0.08, 0.53]}, {'name': 'Contempt', 'data': [0.94, 0.53, 0.64, 0.99, 0.47, 0.07, 0.98, 0.75]}, {'name': 'Neutral', 'data': [0.67, 0.5, 0.05, 0.69, 0.25, 0.41, 0.45, 0.02]}]},
    'tuesday': {'period1': [0, {'name': 'Happy', 'data': [0.8, 0.43, 0.91, 0.62, 0.65, 0.08, 0.71, 0.65]}, {'name': 'Mad', 'data': [0.84, 0.9, 0.19, 0.02, 0.38, 0.06, 0.21, 0.64]}, {'name': 'Sadness', 'data': [0.07, 0.25, 0.79, 0.99, 0.18, 0.58, 0.53, 0.29]}, {'name': 'Contempt', 'data': [0.4, 0.97, 0.48, 0.02, 0.48, 0.07, 0.45, 0.14]}, {'name': 'Neutral', 'data': [0.11, 0.92, 0.79, 0.53, 0.06, 0.26, 0.28, 0.79]}], 'period2': [0, {'name': 'Happy', 'data': [0.2, 0.06, 0.44, 0.1, 0.21, 0.68, 0.72, 0.31]}, {'name': 'Mad', 'data': [0.81, 0.15, 0.34, 0.47, 0.25, 0.9, 0.49, 0.21]}, {'name': 'Sadness', 'data': [0.45, 0.72, 0.14, 0.86, 0.1, 0.1, 0.86, 0.8]}, {'name': 'Contempt', 'data': [0.09, 0.27, 0.71, 0.58, 0.7, 0.39, 0.41, 0.65]}, {'name': 'Neutral', 'data': [0.98, 0.01, 0.52, 0.87, 0.38, 0.48, 0.55, 0.89]}], 'period3': [0, {'name': 'Happy', 'data': [0.72, 0.7, 0.59, 0.01, 0.08, 0.9, 0.58, 0.35]}, {'name': 'Mad', 'data': [0.14, 0.13, 0.26, 0.08, 0.68, 0.12, 0.57, 0.43]}, {'name': 'Sadness', 'data': [0.26, 0.57, 0.28, 0.64, 0.13, 0.96, 0.62, 0.7]}, {'name': 'Contempt', 'data': [0.37, 0.42, 0.74, 0.18, 0.47, 0.77, 0.73, 0.87]}, {'name': 'Neutral', 'data': [0.9, 0.86, 0.29, 0.89, 0.07, 0.89, 0.39, 0.33]}]},
    'wednesday': {'period1': [0, {'name': 'Happy', 'data': [0.08, 0.12, 0.53, 0.01, 0.88, 0.74, 0.22, 0.4]}, {'name': 'Mad', 'data': [0.33, 0.33, 0.3, 0.28, 0.56, 0.28, 0.89, 0.47]}, {'name': 'Sadness', 'data': [0.12, 0.72, 0.7, 0.88, 0.5, 0.81, 0.34, 0.63]}, {'name': 'Contempt', 'data': [0.19, 0.22, 0.85, 0.84, 0.22, 0.4, 0.09, 0.01]}, {'name': 'Neutral', 'data': [0.05, 0.37, 0.03, 0.85, 0.11, 0.97, 0.36, 0.97]}], 'period2': [0, {'name': 'Happy', 'data': [0.28, 0.07, 0.51, 0.3, 0.44, 0.15, 0.62, 0.28]}, {'name': 'Mad', 'data': [0.69, 0.51, 0.01, 0.87, 0.18, 0.25, 0.95, 0.3]}, {'name': 'Sadness', 'data': [0.68, 0.38, 0.5, 0.46, 0.08, 0.07, 0.99, 0.44]}, {'name': 'Contempt', 'data': [0.16, 0.25, 0.24, 0.71, 0.68, 0.8, 0.1, 0.19]}, {'name': 'Neutral', 'data': [0.42, 0.71, 0.89, 0.95, 0.32, 0.1, 0.3, 0.36]}], 'period3': [0, {'name': 'Happy', 'data': [0.64, 0.88, 0.98, 0.43, 0.41, 0.62, 0.22, 0.1]}, {'name': 'Mad', 'data': [0.83, 0.47, 0.98, 0.5, 0.41, 0.9, 0.95, 0.24]}, {'name': 'Sadness', 'data': [0.73, 0.41, 0.57, 0.04, 0.36, 0.37, 0.96, 0.47]}, {'name': 'Contempt', 'data': [0.36, 0.3, 0.88, 0.46, 0.28, 0.74, 0.73, 0.04]}, {'name': 'Neutral', 'data': [0.05, 0.83, 0.67, 0.3, 0.82, 0.01, 0.13, 0.07]}]},
    'thursday': {'period1': [0, {'name': 'Happy', 'data': [0.86, 0.76, 0.91, 0.55, 0.67, 0.56, 0.93, 0.53]}, {'name': 'Mad', 'data': [0.98, 0.22, 0.65, 0.59, 0.06, 0.5, 0.53, 0.43]}, {'name': 'Sadness', 'data': [0.98, 0.92, 0.39, 0.41, 0.64, 1.0, 0.42, 0.5]}, {'name': 'Contempt', 'data': [0.21, 0.25, 0.12, 0.99, 0.51, 0.14, 0.42, 0.12]}, {'name': 'Neutral', 'data': [0.03, 0.42, 0.46, 0.75, 0.56, 0.37, 0.61, 0.5]}], 'period2': [0, {'name': 'Happy', 'data': [0.57, 0.6, 0.66, 0.91, 0.45, 0.79, 0.05, 0.25]}, {'name': 'Mad', 'data': [0.25, 0.77, 0.14, 0.73, 0.57, 0.69, 0.41, 0.82]}, {'name': 'Sadness', 'data': [0.53, 0.05, 0.3, 0.11, 0.58, 0.04, 0.08, 0.84]}, {'name': 'Contempt', 'data': [0.38, 0.45, 0.41, 0.88, 0.65, 0.42, 0.47, 0.53]}, {'name': 'Neutral', 'data': [0.1, 0.1, 0.49, 0.8, 0.62, 0.51, 0.79, 0.97]}], 'period3': [0, {'name': 'Happy', 'data': [0.04, 0.04, 0.17, 0.44, 1.0, 0.69, 0.9, 0.49]}, {'name': 'Mad', 'data': [0.72, 0.71, 0.23, 0.05, 0.42, 0.05, 1.0, 0.77]}, {'name': 'Sadness', 'data': [0.73, 0.91, 0.17, 0.89, 0.1, 0.66, 0.45, 0.91]}, {'name': 'Contempt', 'data': [0.62, 0.84, 0.78, 0.92, 0.56, 0.27, 0.21, 0.88]}, {'name': 'Neutral', 'data': [0.6, 0.74, 0.41, 0.75, 0.2, 0.15, 0.64, 0.77]}]},
    'friday': {'period1': [0, {'name': 'Happy', 'data': [0.2, 0.52, 0.22, 0.1, 0.51, 0.71, 0.81, 0.24]}, {'name': 'Mad', 'data': [0.56, 0.34, 0.52, 0.81, 0.63, 0.47, 0.32, 0.98]}, {'name': 'Sadness', 'data': [0.14, 0.81, 0.28, 0.25, 0.0, 0.12, 0.57, 0.26]}, {'name': 'Contempt', 'data': [0.04, 0.76, 0.71, 0.19, 0.24, 0.84, 0.76, 0.24]}, {'name': 'Neutral', 'data': [0.84, 0.72, 0.61, 0.39, 0.68, 0.02, 0.65, 0.71]}], 'period2': [0, {'name': 'Happy', 'data': [0.6, 0.63, 0.93, 0.93, 0.81, 0.5, 0.4, 0.79]}, {'name': 'Mad', 'data': [0.81, 0.82, 0.12, 0.24, 0.15, 0.78, 0.19, 0.56]}, {'name': 'Sadness', 'data': [0.73, 0.91, 0.31, 0.87, 0.75, 0.65, 0.18, 0.29]}, {'name': 'Contempt', 'data': [0.01, 0.42, 0.69, 0.28, 0.75, 0.87, 0.25, 0.79]}, {'name': 'Neutral', 'data': [0.57, 0.25, 0.6, 0.19, 0.23, 0.81, 0.8, 0.04]}], 'period3': [0, {'name': 'Happy', 'data': [0.27, 0.63, 0.15, 0.84, 0.33, 0.76, 0.18, 0.36]}, {'name': 'Mad', 'data': [0.27, 0.23, 0.81, 0.79, 0.79, 0.23, 0.34, 0.14]}, {'name': 'Sadness', 'data': [0.01, 0.52, 0.4, 0.14, 0.65, 0.66, 0.36, 0.23]}, {'name': 'Contempt', 'data': [0.17, 0.86, 0.61, 0.77, 0.81, 0.85, 0.7, 0.99]}, {'name': 'Neutral', 'data': [0.09, 0.54, 0.56, 0.19, 0.62, 0.25, 0.77, 0.38]}]}
        
    
}


$(function() {
    currentDay = $("#monday");
    currentPeriod = $("#period1");
    $("#logout-button").click(function() {
        var reqBody = {
            "message": "Logged out"
        }
        console.log();
        $.ajax({
                url: "https://auth.afforest89.hasura-app.io/user/logout",
                beforeSend: function(xhrObj) {
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('Authorization').toString());
                },
                type: "POST",
                data: JSON.stringify(reqBody),
            })
            .done(function(data) {
                window.location = "index.html";
            })
            .fail(function() {
                alert("Error");
            });
    });
    
    graph = new Highcharts.Chart(
	{
		chart:
		{
			renderTo: 'container',
			defaultSeriesType: 'spline',
			width: window.innerWidth - 200
		},
        title: {
            text: 'Emotional Range of Students'
        },

        yAxis: {
            title: {
                text: '# of Engaged Students'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                pointStart: 1
            }
        },
        
        credits: {
            enabled: false
        },  

        series: [{
            name: 'Happy',
            data: [0.24, 0.43, 0.31, 0.56, 0.64, 0.76, 0.91, 0.87]
        }, {
            name: 'Mad',
            data: [0.34, 0.23, 0.10, 0.55, 0.61, 0.43, 0.31, 0.24]
        }, {
            name: 'Sadness',
            data: [0.87, 0.76, 0.82, 0.42, 0.39, 0., 0.91, 0.87]
        }, {
            name: 'Contempt',
            data: [0.72, 0.54, 0.32, 0.45, 0.21, 0.24, 0.37, 0.28]
        }, {
            name: 'Neutral',
            data: [0.28, 0.47, 0.31, 0.45, 0.61, 0.78, 0.80, 0.90]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
});
