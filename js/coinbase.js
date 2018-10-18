var INCENTIVE = 0.12864;
//Run on document load
$(function()
{

	//Authenticate with coinbase API
	var Client = require('coinbase').Client;
	var client = new Client(
	{
		'apiKey': 'hhKG8cG7hSYgTEnW',
		'apiSecret': 'IjURDzyrjwhQMaolni8NwM1LyTMNUNLn',
		'version': '2017-09-26',
		'strictSSL': false
	});

	//Ideally, here we would fetch each teacher's weekly incentive score from a database.
	//but since we forgot the password to our DB, it will be generated here.
	$("#btci").text("This week's incentive " + INCENTIVE + " BTC")
	var weeklyPoints = {};
	var total = 0;
	$(".teacher").each(function(i, teacherE)
	{
		var p = ((100 * Math.random()) + 1).toFixed(2)
		weeklyPoints[$(teacherE).attr("tid")] = p;
		total += +p;
		$(teacherE).find("p").text("Total Engagement Points: " + weeklyPoints[$(teacherE).attr("tid")]);
	});
	//Calculate incentive (as BTC) as a proportion of the total engagent score
	var payout = {}
	$(".teacher").each(function(i, teacherE)
	{
		var p = $(teacherE).attr("tid");
		var b = INCENTIVE * (p / total).toFixed(2);
		$(teacherE).find("span").text("Potential Bonus: " + b + " BTC");
		payout[p] = b;
	});

	//Payout on button click
	$("#pay").click(function()
	{
		//Generate a new wallet for administration to use to pay out the teachers
		var account;
		client.createAccount(
		{
			'name': 'Admin Wallet'
		}, function(err, acct)
		{
			console.log(acct.name + ': ' + acct.balance.amount + ' ' + acct.balance.currency);
			account = acct;

			client.getAccount('primary', function(err, primaryAccount)
			{
				// Generate a new bitcoin address for the admin to use
				account.createAddress(null, function(err, address)
				{

					//Pay each teacher the correct amount
					$(".teacher").each(function(i, teacherE)
					{
						var addr = $(teacherE).attr("addr");
						var amnt = payout[$(teacherE).attr("tid")];
						console.log("Paying " + amnt + " to addr " + addr);
						primaryAccount.sendMoney(
						{
							'to': addr,
							'amount': '' + amnt,
							'currency': 'BTC',
							'description': 'Teacher bonus'
						}, function(err, tx)
						{
							console.log(tx);
						});
					});

				});
			});
		});
	});




});