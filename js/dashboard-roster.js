var date = new Date();
var today = date.getFullYear() + (date.getMonth() + 1) + date.getDate();
var chart;

//Generate Random Data
var jonData = generateData();
var harData = generateData();
var jerData = generateData();
var adiData = generateData();
var ivaData = generateData();
var combinedEmotion = [];
var combinedData = [];

$(function()
{
    //Logout
    $("#logout-button").click(function()
    {
        var reqBody = {
            "message": "Logged out"
        }
        console.log();
        $.ajax(
            {
                url: "https://auth.afforest89.hasura-app.io/user/logout",
                beforeSend: function(xhrObj)
                {
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('Authorization').toString());
                },
                type: "POST",
                data: JSON.stringify(reqBody),
            })
            .done(function(data)
            {
                window.location = "index.html";
            })
            .fail(function()
            {
                alert("Error");
            });
    });

    for (var i = 0; i < 5; i++)
    {
        for (var j = 0; j < 16; j++)
        {
            combinedEmotion.push((jonData[i][j] + harData[i][j] + jerData[i][j] + adiData[i][j] + ivaData[i][j]) / 5);

        }
        combinedData.push(combinedEmotion);
        combinedEmotion = [];
    }

    //Charts
    var size = "" + (window.innerHeight - 30 - 100);
    $(".roster").css('height', size);
    $("#student-data-container").css('height', size);
    size = "" + window.innerWidth - 400;
    $("#student-data-container").css('width', size);

    chart = Highcharts.chart(
    {
        chart:
        {
            renderTo: 'student-data-container',
            defaultSeriesType: 'spline',
        },
        title:
        {
            text: 'Historical data for student'
        },
        xAxis:
        {
            tickInterval: 7 * 24 * 3600 * 1000,
            type: 'datetime',
            startOnTick: true,
            startOfWeek: 2,
            labels:
            {
                format: '{value:%m/%d/%Y}',
                rotation: -45,
                y: 30,
                align: 'center'
            },
        },
        navigator:
        {
            enabled: true
        },
        yAxis:
        {
            min: 0,
            max: 1,
            title:
            {
                text: 'Relative Frequency'
            }
        },
        credits:
        {
            enabled: false
        },
        legend:
        {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions:
        {
            series:
            {
                pointStart: Date.UTC(2017, 9, 23),
                pointInterval: 7 * 24 * 3600 * 1000
            }
        },
        series: [
        {
            name: 'Happy',
            data: combinedData[0],
        },
        {
            name: 'Angry',
            data: combinedData[1],
        },
        {
            name: 'Sadness',
            data: combinedData[2],
        },
        {
            name: 'Contempt',
            data: combinedData[3],
        },
        {
            name: 'Neutral',
            data: combinedData[4],
        }],

        responsive:
        {
            rules: [
            {
                condition:
                {
                    maxWidth: 500
                },
                chartOptions:
                {
                    legend:
                    {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });

    //Get list of people in MHacks group
    $.ajax(
        {
            url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/mhacks/persons?top=1000",
            beforeSend: function(xhrObj)
            {
                xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "95b7fc92d80b4fcf8f3fcc6423728398");
            },
            type: "GET",
            data: {}
        })
        .done(function(people)
        {
            for (var i = 0; i < people.length; i++)
            {
                var name = people[i].name;

                var elem = '<li class="list-group-item student-id"> <a class="nav-link" onclick="displayStudentData(this);" id="logout-button" sid=' + people[i].personId + '>' + name + '</a></li>'
                    
                $("#list").append(elem);
            }

            var ppl = sessionStorage.detectedPeople.split(",");

            c = $("#list").children();
            for (var i = 0; i < c.length; i++)
            {
                var sid = $($(c[i]).children()[0]).attr('sid');
                if (sessionStorage.detectedPeople.indexOf(sid) != -1)
                {
                    $(c[i]).css('background-color', 'rgba(0, 153, 51,0.5)');
                }
            }

        })
        .fail(function(jqXHR, textStatus, errorThrown)
        {
            console.log(textStatus);
        });

});

function generateData()
{
    var numHappy;
    var numAngry;
    var numSadness;
    var numContempt;
    var numNeutral;
    var total;

    var happyArr = [];
    var angryArr = [];
    var sadnessArr = [];
    var contemptArr = [];
    var neutralArr = [];
    var totalArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    for (var i = 0; i < 16; i++)
    {
        numHappy = Math.random() * Math.random() * Math.random();
        numAngry = Math.random() * Math.random() * Math.random();
        numSadness = Math.random() * Math.random() * Math.random();
        numContempt = Math.random() * Math.random() * Math.random();
        numNeutral = Math.random() * Math.random() * Math.random();
        total = numHappy + numAngry + numSadness + numContempt + numNeutral;

        numHappy = numHappy / total;
        numAngry = numAngry / total;
        numSadness = numSadness / total;
        numContempt = numContempt / total;
        numNeutral = numNeutral / total;

        totalArr[i] = [numHappy, numAngry, numSadness, numContempt, numNeutral];
    }

    for (var i = 0; i < 16; i++)
    {
        happyArr.push(totalArr[i][0]);
        angryArr.push(totalArr[i][1]);
        sadnessArr.push(totalArr[i][2]);
        contemptArr.push(totalArr[i][3]);
        neutralArr.push(totalArr[i][4]);
    }

    return [happyArr, angryArr, sadnessArr, contemptArr, neutralArr];
}

function displayStudentData(element)
{
    if ($(element).html() == "Jonathan")
    {
        //Jonathan
        var size = "" + (window.innerHeight - 30 - 100);
        $(".roster").css('height', size);
        $("#student-data-container").css('height', size);
        size = "" + window.innerWidth - 400;
        $("#student-data-container").css('width', size);

        chart = Highcharts.chart(
        {
            chart:
            {
                renderTo: 'student-data-container',
                defaultSeriesType: 'spline',
            },
            title:
            {
                text: 'Historical data for student'
            },
            xAxis:
            {
                tickInterval: 7 * 24 * 3600 * 1000,
                type: 'datetime',
                startOnTick: true,
                startOfWeek: 2,
                labels:
                {
                    format: '{value:%m/%d/%Y}',
                    rotation: -45,
                    y: 30,
                    align: 'center'
                },
            },
            navigator:
            {
                enabled: true
            },
            yAxis:
            {
                min: 0,
                max: 1,
                title:
                {
                    text: 'Relative Frequency'
                }
            },
            credits:
            {
                enabled: false
            },
            legend:
            {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions:
            {
                series:
                {
                    pointStart: Date.UTC(2017, 9, 23),
                    pointInterval: 7 * 24 * 3600 * 1000
                }
            },
            series: [
            {
                name: 'Happy',
                data: jonData[0],
            },
            {
                name: 'Angry',
                data: jonData[1],
            },
            {
                name: 'Sadness',
                data: jonData[2],
            },
            {
                name: 'Contempt',
                data: jonData[3],
            },
            {
                name: 'Neutral',
                data: jonData[4],
            }],

            responsive:
            {
                rules: [
                {
                    condition:
                    {
                        maxWidth: 500
                    },
                    chartOptions:
                    {
                        legend:
                        {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    }
    else if ($(element).html() == "Harsh")
    {
        //Harsh
        var size = "" + (window.innerHeight - 30 - 100);
        $(".roster").css('height', size);
        $("#student-data-container").css('height', size);
        size = "" + window.innerWidth - 400;
        $("#student-data-container").css('width', size);

        chart = Highcharts.chart(
        {
            chart:
            {
                renderTo: 'student-data-container',
                defaultSeriesType: 'spline',
            },
            title:
            {
                text: 'Historical data for student'
            },
            xAxis:
            {
                tickInterval: 7 * 24 * 3600 * 1000,
                type: 'datetime',
                startOnTick: true,
                startOfWeek: 2,
                labels:
                {
                    format: '{value:%m/%d/%Y}',
                    rotation: -45,
                    y: 30,
                    align: 'center'
                },
            },
            navigator:
            {
                enabled: true
            },
            yAxis:
            {
                min: 0,
                max: 1,
                title:
                {
                    text: 'Relative Frequency'
                }
            },
            credits:
            {
                enabled: false
            },
            legend:
            {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions:
            {
                series:
                {
                    pointStart: Date.UTC(2017, 9, 23),
                    pointInterval: 7 * 24 * 3600 * 1000
                }
            },
            series: [
            {
                name: 'Happy',
                data: harData[0],
            },
            {
                name: 'Angry',
                data: harData[1],
            },
            {
                name: 'Sadness',
                data: harData[2],
            },
            {
                name: 'Contempt',
                data: harData[3],
            },
            {
                name: 'Neutral',
                data: harData[4],
            }],

            responsive:
            {
                rules: [
                {
                    condition:
                    {
                        maxWidth: 500
                    },
                    chartOptions:
                    {
                        legend:
                        {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    }
    else if ($(element).html() == "Jerry")
    {
        //Jerry
        var size = "" + (window.innerHeight - 30 - 100);
        $(".roster").css('height', size);
        $("#student-data-container").css('height', size);
        size = "" + window.innerWidth - 400;
        $("#student-data-container").css('width', size);

        chart = Highcharts.chart(
        {
            chart:
            {
                renderTo: 'student-data-container',
                defaultSeriesType: 'spline',
            },
            title:
            {
                text: 'Historical data for student'
            },
            xAxis:
            {
                tickInterval: 7 * 24 * 3600 * 1000,
                type: 'datetime',
                startOnTick: true,
                startOfWeek: 2,
                labels:
                {
                    format: '{value:%m/%d/%Y}',
                    rotation: -45,
                    y: 30,
                    align: 'center'
                },
            },
            navigator:
            {
                enabled: true
            },
            yAxis:
            {
                min: 0,
                max: 1,
                title:
                {
                    text: 'Relative Frequency'
                }
            },
            credits:
            {
                enabled: false
            },
            legend:
            {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions:
            {
                series:
                {
                    pointStart: Date.UTC(2017, 9, 23),
                    pointInterval: 7 * 24 * 3600 * 1000
                }
            },
            series: [
            {
                name: 'Happy',
                data: jerData[0],
            },
            {
                name: 'Angry',
                data: jerData[1],
            },
            {
                name: 'Sadness',
                data: jerData[2],
            },
            {
                name: 'Contempt',
                data: jerData[3],
            },
            {
                name: 'Neutral',
                data: jerData[4],
            }],

            responsive:
            {
                rules: [
                {
                    condition:
                    {
                        maxWidth: 500
                    },
                    chartOptions:
                    {
                        legend:
                        {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    }
    else if ($(element).html() == "Aditya")
    {
        //Aditya
        var size = "" + (window.innerHeight - 30 - 100);
        $(".roster").css('height', size);
        $("#student-data-container").css('height', size);
        size = "" + window.innerWidth - 400;
        $("#student-data-container").css('width', size);

        chart = Highcharts.chart(
        {
            chart:
            {
                renderTo: 'student-data-container',
                defaultSeriesType: 'spline',
            },
            title:
            {
                text: 'Historical data for student'
            },
            xAxis:
            {
                tickInterval: 7 * 24 * 3600 * 1000,
                type: 'datetime',
                startOnTick: true,
                startOfWeek: 2,
                labels:
                {
                    format: '{value:%m/%d/%Y}',
                    rotation: -45,
                    y: 30,
                    align: 'center'
                },
            },
            navigator:
            {
                enabled: true
            },
            yAxis:
            {
                min: 0,
                max: 1,
                title:
                {
                    text: 'Relative Frequency'
                }
            },
            credits:
            {
                enabled: false
            },
            legend:
            {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions:
            {
                series:
                {
                    pointStart: Date.UTC(2017, 9, 23),
                    pointInterval: 7 * 24 * 3600 * 1000
                }
            },
            series: [
            {
                name: 'Happy',
                data: adiData[0],
            },
            {
                name: 'Angry',
                data: adiData[1],
            },
            {
                name: 'Sadness',
                data: adiData[2],
            },
            {
                name: 'Contempt',
                data: adiData[3],
            },
            {
                name: 'Neutral',
                data: adiData[4],
            }],

            responsive:
            {
                rules: [
                {
                    condition:
                    {
                        maxWidth: 500
                    },
                    chartOptions:
                    {
                        legend:
                        {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    } else{
        //Ivan
        var size = "" + (window.innerHeight - 30 - 100);
        $(".roster").css('height', size);
        $("#student-data-container").css('height', size);
        size = "" + window.innerWidth - 400;
        $("#student-data-container").css('width', size);

        chart = Highcharts.chart(
        {
            chart:
            {
                renderTo: 'student-data-container',
                defaultSeriesType: 'spline',
            },
            title:
            {
                text: 'Historical data for student'
            },
            xAxis:
            {
                tickInterval: 7 * 24 * 3600 * 1000,
                type: 'datetime',
                startOnTick: true,
                startOfWeek: 2,
                labels:
                {
                    format: '{value:%m/%d/%Y}',
                    rotation: -45,
                    y: 30,
                    align: 'center'
                },
            },
            navigator:
            {
                enabled: true
            },
            yAxis:
            {
                min: 0,
                max: 1,
                title:
                {
                    text: 'Relative Frequency'
                }
            },
            credits:
            {
                enabled: false
            },
            legend:
            {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions:
            {
                series:
                {
                    pointStart: Date.UTC(2017, 9, 23),
                    pointInterval: 7 * 24 * 3600 * 1000
                }
            },
            series: [
            {
                name: 'Happy',
                data: ivaData[0],
            },
            {
                name: 'Angry',
                data: ivaData[1],
            },
            {
                name: 'Sadness',
                data: ivaData[2],
            },
            {
                name: 'Contempt',
                data: ivaData[3],
            },
            {
                name: 'Neutral',
                data: ivaData[4],
            }],

            responsive:
            {
                rules: [
                {
                    condition:
                    {
                        maxWidth: 500
                    },
                    chartOptions:
                    {
                        legend:
                        {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    }
    $(this).addClass('active');
}
