var chart; // global
var pichart;
var barchart;

var recording = false;

var startbutton;
var pausebutton;
var stopbutton;
var resumebutton;

var GROUP_ID = "mhacks";
function requestData()
{
	if (recording)
	{
		var series = chart.series[0];
		var piseries = pichart.series[0];
		
		var shift = series.data.length > 20;
		
        getRealtime(GROUP_ID, 24, 5, function(data)
        	{
                series.addPoint(data.percentEngaged, true, shift);
                console.log(data);
				var extremes = chart.xAxis[0].getExtremes();
        		chart.xAxis[0].setExtremes(extremes.dataMax-10, extremes.dataMax);
        		
                var emotions = [
                    ["Anger", data.anger],
                    ["Contempt", data.contempt],
                    ["Happiness", data.happiness],
                    ["Neutral", data.neutral],
                    ["Sadness", data.sadness],
                ];
                piseries.setData(emotions, true);
                
        	});

	}
	setTimeout(requestData, 1000);
}

$(function()
{
	console.log($("#container-fluid").width());
	chart = new Highcharts.chart(
	{
		chart:
		{
			renderTo: 'container',
			defaultSeriesType: 'spline',
			width: window.innerWidth - 200 - 60 - 50,
			height: $("#myElement").height() ,
			events:
			{
				load: function()
				{
					chart = this;
					requestData();

					pausebutton = chart.renderer.button('\u23F8  Pause', chart.chartWidth - 200, 10, function()
					{
						this.hide();
						resumebutton.show();
						recording = false;
					}).add();
					pausebutton.hide();

					resumebutton = chart.renderer.button('\u25BA  Resume', chart.chartWidth - 210, 10, function()
					{
						this.hide();
						pausebutton.show()
						recording = true;
					}).add();
					resumebutton.hide();

					stopbutton = chart.renderer.button('\u25FC  Stop Recording', chart.chartWidth - 130, 10, function()
					{
						let r = confirm("Are you sure you want to stop recording?");
						if (r == true)
						{
							this.hide();
							pausebutton.hide();
							resumebutton.hide();
							recording = false;
						}
					}).add();
					stopbutton.hide();

					startbutton = chart.renderer.button('\u25CF Start Recording', chart.chartWidth / 2 - 50, chart.chartHeight * 5 / 12, function()
					{
						this.hide();
						chart.series[0].setData([]);
						recording = true;
						pausebutton.show();
						stopbutton.show();

					}).add();
				}
			}
		},
		title:
		{
			text: 'Relative Student Engagement Over Time'
		},
		xAxis:
		{
			type: 'datetime',
			tickPixelInterval: 150,
		},
		yAxis:
		{
			min: 0,
			max: 1,
			minPadding: 0.2,
			maxPadding: 0.2,
			title:
			{
				text: 'Relative % of Students in Classroom',
				margin: 80
			}
		},
		navigator:
        {
            enabled: true,
            adaptToUpdatedData: true
        },
		series: [
		{
			name: 'Summative Number of Engaged Students',
			data: [0],
        	zones: [{
	            value: .25,
	            color: '#ff0000'
	        }, {
	            value: .5,
	            color: '#f7a35c'
	        }, {
	            value: 1,
	            color: '#80ff80'
	        }]

		}],
		credits:
		{
			enabled: false
		}
		
	});

	pichart = new Highcharts.Chart(
	{
		chart:
		{
			renderTo: 'pi-chart',
			width: 400,
			height: 200,
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie',
		},
		title:
		{
			text: ''
		},
		tooltip:
		{
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions:
		{
			pie:
			{
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels:
				{
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style:
					{
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				}
			}
		},
		series: [
		{
			name: 'Emotions',
			colorByPoint: true,
			data: [
			{
				name: 'Happy',
				y: 0
			},
			{
				name: 'Anger',
				y: 0
			},
			{
				name: 'Sadness',
				y: 0
			},
			{
				name: 'Contempt',
				y: 0
			},
			{
				name: 'Neutral',
				y: 0
			},
			{
				name: 'Surprise',
				y: 0.00
			}]
		}],
		credits:
		{
			enabled: false
		}
	});

	barchart = new Highcharts.Chart(
	{
		chart:
		{
			renderTo: 'bar-chart',
			width: 400,
			height: 200,
		},
		title:
		{
			text: ''
		},
		subtitle:
		{
			text: ''
		},
		xAxis:
		{
			categories: ['Period 1', 'Period 2'],
			title:
			{
				text: null
			}
		},
		yAxis:
		{
			min: 0,
			title:
			{
				text: 'Number of Students',
				align: 'high'
			},
			labels:
			{
				overflow: 'justify'
			}
		},
		tooltip:
		{
			valueSuffix: ' '
		},
		plotOptions:
		{
			bar:
			{
				dataLabels:
				{
					enabled: true
				}
			}
		},
		legend:
		{
			layout: 'vertical',
			verticalAlign: 'top',
			x: -40,
			y: 80,
			floating: true,
			borderWidth: 1,
			backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
			shadow: true
		},
		credits:
		{
			enabled: false
		},
		series: [
		{
			name: 'Engaged',
			data: [14, 15]
		},
		{
			name: 'Disengaged',
			data: [12, 19]
		}, ]
	});


});