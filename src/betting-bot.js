const { Client } = require('pg');
const { exec } = require("child_process");
const con = new Client({
    connectionString: process.env.DATABASE_URL,
});
con.connect();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.bottoken;
const bot = new TelegramBot(token, { polling: true });
var bal, isSyntaxWrong = false, x, bool1 = false, bool2 = false, admins = '1399340100 1130854062 1341350794 1473152324',cmds='/START@BETTINGGAMEROBOT /HELP@BETTINGGAMEROBOT /SETTINGS@BETTINGGAMEROBOT /INFO@BETTINGGAMEROBOT /CREDITS@BETTINGGAMEROBOT /BET@BETTINGGAMEROBOT /SETBETDEF@BETTINGGAMEROBOT /SBET@BETTINGGAMEROBOT /BAL@BETTINGGAMEROBOT /MYSTATS@BETTINGGAMEROBOT /MINIGAME@BETTINGGAMEROBOT /MINIGAMEHELP@BETTINGGAMEROBOT /SETMINIDEF@BETTINGGAMEROBOT /BUTTONMINIGAME@BETTINGGAMEROBOT /GIVE@BETTINGGAMEROBOT /REFERRALS@BETTINGGAMEROBOT /DAILYREWARD@BETTINGGAMEROBOT /LEADERBOARD@BETTINGGAMEROBOT /RLEADERBOARD@BETTINGGAMEROBOT /USERS@BETTINGGAMEROBOT /BROADCAST@BETTINGGAMEROBOT /REWARD@BETTINGGAMEROBOT /SETBAL@BETTINGGAMEROBOT /SETWRI@BETTINGGAMEROBOT /FULLUSERS@BETTINGGAMEROBOT /STATS@BETTINGGAMEROBOT /DELUSER@BETTINGGAMEROBOT /BANK@BETTINGGAMEROBOT /WITHDRAW@BETTINGGAMEROBOT /START /HELP /SETTINGS /INFO /CREDITS /BET /SETBETDEF /SBET /BAL /MYSTATS /MINIGAME /MINIGAMEHELP /SETMINIDEF /BUTTONMINIGAME /GIVE /REFERRALS /DAILYREWARD /LEADERBOARD /RLEADERBOARD /USERS /BROADCAST /REWARD /SETBAL /SETWRI /FULLUSERS /STATS /DELUSER /BANK /WITHDRAW';//, rt = false;
con.query("select * from main", function (err, res) {
    if (err) throw err;
    for(x=0 ;x<5;x++) {
    	console.log(res.rows[x]);
    }
    console.log('\n\nNo of users: ' + res.rows.length + '\n\n');
	for(x=0;x<res.rows.length;x++) {
		if(res.rows[x].state=='null') {
			con.query("update main set state='0' where userid=$1",[res.rows[x].userid],(err,res)=> {if(err) throw err;});		
		}
		if(res.rows[x].deposit=='null') {
			con.query("update main set deposit='0' where userid=$1",[res.rows[x].userid],(err,res)=> {if(err) throw err;});		
		}
		if(res.rows[x].deposittime=='null') {
			con.query("update main set deposittime='0' where userid=$1",[res.rows[x].userid],(err,res)=> {if(err) throw err;});		
		}
		if(res.rows[x].numreferrals=='null') {
			con.query("update main set numreferrals='0' where userid=$1",[res.rows[x].userid],(err,res)=> {if(err) throw err;});		
		}
	}
	console.log('done');
});
bot.on('message', async function (msg) {
	var state='0',wris='0',chatId=msg.chat.id,text=msg.text,userid=msg.from.id.toString(),id=msg.from.id;
	var user=await con.query('select * from main where userid=$1',[msg.from.id.toString()]).catch((e)=>{throw e;})
	if(user.rows[0]!=undefined) { 
		state=user.rows[0].state;
	}
	if(state=='0'||user.rows[0]==undefined) {
		rt = false;
		//isSyntaxWrong=false;
		if (text == undefined) { text = ''; }
		
		var res = await con.query('select lastcommanded from main where userid=$1', [userid]).catch((err) => { console.log(err); });
		if (msg.entities != undefined && msg.entities[0].type == 'bot_command' && msg.entities[0].offset == 0) {
			if (msg.date - parseFloat(res.rows[0].lastcommanded) <= 0.5) {
				bot.sendMessage(chatId, 'Commanding too fast.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
				return;
			}
			else {
				con.query('update main set lastcommanded=$1 where userid=$2', [msg.date.toString(), userid], function (err, res) {
					if (err) throw err;
				});
			}
		}

		//console.log(rt);
		//const {exec} = require ('child_process')



		if (msg.entities != undefined && msg.entities[0].type == 'bot_command' && msg.entities[0].offset == 0) {
			bot.forwardMessage(-483228807, msg.chat.id, msg.message_id).then((m) => {
				bot.sendMessage(-483228807, JSON.stringify(msg), { reply_to_message_id: m.message_id, allow_sending_without_reply: true });

			});
		}
		//if (rt) { return; }
		//bot.forwardMessage(-425529612, msg.chat.id, msg.message_id).then((m) => {
		//	bot.sendMessage(-425529612, JSON.stringify(msg), { reply_to_message_id: m.message_id, allow_sending_without_reply: true });
		//});
		/*if(text=='/restartownerbot') {
			exec("app/run.bat", (error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
			});
		}*/
		if (text.toUpperCase().startsWith('/START') || text.toUpperCase().startsWith('/START@BETTINGGAMEROBOT')) {
			bot.sendMessage(chatId, 'Hello Mate 👋👋\n\nI am online✅✅.\n\nMy name is Betting Game Robot 🤖🤖\n\nUsually I entertain people with my game🙂🙂\n\nHope You will like my game 😊😊\n\nFor help click on /help.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
		}
		if (text.toUpperCase().startsWith('/START') && text.toUpperCase() != '/START') {
			var refid = text.toUpperCase().replace('/START', '');
			if (refid[0] == ' ') {
				refid = refid.replace(' ', '').toString();
				console.log(refid);
				con.query('select count(*) as count from main where userid=$1', [refid], function (err, result3, fields) {
					if (err) throw err;
					var count = result3.rows[0].count;
					console.log('count:' + count);
					if (count != '0') {
						console.log(1);
						if (refid != userid) {
							console.log(2);
							con.query('select count(*) as count from main where userid=$1', [userid], function (err, result, fields) {
								if (err) throw err;
								console.log(3);
								console.log('count2::' + result.rows[0].count);
								if (result.rows[0].count == '0') {
									console.log(4);
									con.query('insert into main (userid,balance,numReferrals,wri,state,deposit) values ($1,$2,$3,$4,$5,$6)', [userid, '3000', null, '0','0','0'], function (err, result2, fields) {
										if (err) throw err;
										console.log(5);
										con.query('select numReferrals as numR from main where userid=$1', [refid], function (err, result3, fields) {
											if (err) throw err;
											var numR;
											console.log(result3.rows[0].numr);
											if (result3.rows[0].numr == undefined || result3.rows[0].numr == null) {
												con.query("update main set numReferrals =($1) where userid=($2)", ['1', refid], function (err, result) {
													if (err) throw err;
													console.log(result);
													console.log('safe');
													//con.commit();
													con.query('select * from main where userid=$1', [refid], function (err, res, fields) {
														if (err) throw err;
														if (msg.from.username == null || msg.from.username == undefined) {
															bot.sendMessage(refid, 'You got a new referral !\nThis person used your link:-\n\nName: ' + msg.from.first_name + '\nUserID: [' + userid + '](tg://user?id=' + userid + ')\nUsername: No username\n\n+10000💰\n+1 win rate increaser\nNumber of referrals you have earned: ' + res.rows[0].numreferrals, { parse_mode: 'Markdown' });
														}
														else {
															bot.sendMessage(refid, 'You got a new referral !\nThis person used your link:-\n\nName: ' + msg.from.first_name + '\nUserID: [' + userid + '](tg://user?id=' + userid + ')\nUsername: @' + msg.from.username + '\n\n+10000💰\n+1 win rate increaser\nNumber of referrals you have earned: ' + res.rows[0].numreferrals, { parse_mode: 'Markdown' });
														}
														add(10000, parseInt(res.rows[0].balance), refid);
														if (res.rows[0].wri == null || res.rows[0].wri == 'NaN') {
															addwri(1, 0, refid);
														}
														else {
															addwri(1, parseInt(res.rows[0].wri), refid);
														}
													});
												});
											}
											else {
												var tempo = (parseInt(result3.rows[0].numr) + 1).toString();
												con.query('update main set numReferrals =($1) where userid=($2)', [tempo, refid], function (err, result) {
													if (err) throw err;
													console.log(result);
													con.query('select * from main where userid=$1', [refid], function (err, res, fields) {
														if (err) throw err;
														if (msg.from.username == null || msg.from.username == undefined) {
															bot.sendMessage(refid, 'You got a new referral !\nThis person used your link:-\n\nName: ' + msg.from.first_name + '\nUserID: [' + userid + '](tg://user?id=' + userid + ')\nUsername: No username\n\n+10000💰\n+1 win rate increaser\nNumber of referrals you have earned: ' + res.rows[0].numreferrals, { parse_mode: 'Markdown' });
														}
														else {
															bot.sendMessage(refid, 'You got a new referral !\nThis person used your link:-\n\nName: ' + msg.from.first_name + '\nUserID: [' + userid + '](tg://user?id=' + userid + ')\nUsername: @' + msg.from.username + '\n\n+10000💰\n+1 win rate increaser\nNumber of referrals you have earned: ' + res.rows[0].numreferrals, { parse_mode: 'Markdown' });
														}
														add(10000, parseInt(res.rows[0].balance), refid);
														if (res.rows[0].wri == null || res.rows[0].wri == 'NaN') {
															addwri(1, 0, refid);
														}
														else {
															addwri(1, parseInt(res.rows[0].wri), refid);
														}
													});
												});
											}
										});
									});
								}
							});
						}
					}
				});
			}
		}
		if (text.toUpperCase() == '/HELP' || text.toUpperCase() == '/HELP@BETTINGGAMEROBOT') {
			bot.sendMessage(chatId, 'Here is the help👇👇\n\n➡️Use /bet<number> to bet coins.\n➡️Use /help to see the help message\n➡️Use /bal to see how many coins you have\n➡️Use /give<number> to donate coins to your friends.\n➡️Use /minigame<number> to play minigame with the number(or use just /minigame to choose your number by buttons).\n➡️Use /minigamehelp to know more about minigame.\n➡️Use /referrals to know your number of referrals and referral link.\n➡️Use /sbet<x> <n> to bet n coins with x number of win rate increasers(it means your winning chances would become (50+x)% instead of 50%).\n➡️Use /dailyreward to claim your daily reward.\n➡️Use /leaderboard to see leaderboard of people having highest balances.\nUse /bank for bank\n\nFor more information see /info ℹ️ℹ️', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
		}
		if (text.toUpperCase() == '/SETTINGS' || text.toUpperCase() == '/SETTINGS@BETTINGGAMEROBOT') {
			bot.sendMessage(chatId, 'Here are the settings:-\n\nUse /setbetdef<x> to set default betting amount to x, so after setting this, whenever you just type /bet or /bet@bettinggamerobot, bot will automatically bet x coins.\nUse /setminidef<x> to set default minigame number to x, so after setting this, whenever you just type /minigame or /minigame@bettinggamerobot, bot will automatically play minigame with the number as x.\n\nNote: Use /setbetdef0 or /setminidef0 to disable this feature so if you type just /bet or /minigame or /bet@bettinggamerobot or /minigame@bettinggamerobot after disabling it would neither bet anything nor play minigame.\n\nNote: All these things are changable.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
		}
		if (text.toUpperCase() == '/INFO' || text.toUpperCase() == '/INFO@BETTINGGAMEROBOT') {
			bot.sendMessage(chatId, 'Here is the ℹ️infoℹ️.\n\n🔶 Join @bettinggamerobotupdates for updates\n\n🔶 Join @bettinggamerobotchat for chat and playing\n\n🔶 Give feedback about this bot at 👇👇\n\n➡️ @Bettinggamerobotfeedbackbot\n\nIf you find any misbehaviours of this bot or any bugs kindly report to @Xhalfosain or to any other admin. You will get prizes for finding bug in this bot.\n\nNote: If you bet all of your coins and you lose, or you donate all of your coins, then your balance becomes 0 and then you can not bet anything so in this condition to gain coins use /minigame.\n\nIf you want to become admin then you need to help other admins in bot development in @bettinggamerobotdevs or in PM of @xhalfosain.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
		}
		if (text.toUpperCase() == '/CREDITS' || text.toUpperCase() == '/CREDITS@BETTINGGAMEROBOT' || text.toUpperCase() == '/START CREDITS' || text.toUpperCase() == '/START@BETTINGGAMEROBOT CREDITS') {
			if (msg.chat.type == 'private') {
				bot.sendMessage(chatId, 'Credits:-\n\nMain Developers : @Xhalfosain\nMain testers and smaller devs : @RITking, @XhaIfosain, @Spidey_13\nHelpers in developing : @Ric3cir121, @Rev3rse\nSome Other helpers : @VprojectsDev, @OPname_13, @infotechbro, @SpaceX2006\nLogo by :- Mr. Hitesh(Deleted Account)', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
			else {
				bot.sendMessage(chatId, 'You can see credits only in PM!', {
					reply_to_message_id: msg.message_id, allow_sending_without_reply: true, reply_markup: {
						inline_keyboard: [[{ text: 'PM', url: 'https://t.me/BettingGameRobot?start=credits' }]]
					}
				});
			}
		}
		if (text.toUpperCase().startsWith('/BET')) {
			//var numm=defbet();
			//console.log(defbet());
			//setTimeout(function(){
			defbet(function (numm) {
				console.log('numm' + numm);
				if (numm == 0) {
					bot.sendMessage(chatId, 'Seriously what\'s the point of betting 0 coins....huh??!! Gone mad or what...😏', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
				}
				else if (numm != -1) {
					con.query('SELECT COUNT(*) AS var FROM main WHERE userid = $1', [userid], function (err, result, fields) {
						if (err) throw err;
						var count = parseInt(result.rows[0].var);
						if (count === 0) {
							bal = 3000;
							con.query('INSERT INTO main (userid,balance,wri,state,deposit) VALUES ($1,$2,$3,$4,$5)', [userid, '3000', '0','0','0'], function (err, result) {
								if (err) throw err;
								console.log('inserted');
								bet(bal, numm, 0);
							});
						}
						else {
							con.query('SELECT balance AS bal FROM main WHERE userid=$1', [userid], function (err, result2, fields) {
								if (err) throw err;
								bal = parseInt(result2.rows[0].bal);
								bet(bal, numm, 0);
							});
						}
					});
				}
			});
		}
		if (text.toUpperCase().startsWith('/SETBETDEF')) {
			var numm = numFunc(text, '/setbetdef');
			if (numm != -1) {
				if (numm == 0) {
					con.query('update main set defbet=$1 where userid=$2', [null, userid], function (err, result) {
						if (err) throw err;
						bot.sendMessage(chatId, 'Successfully disabled the default betting feature.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true })
					});
				}
				else {
					con.query('update main set defbet=$1 where userid=$2', [numm.toString(), userid], function (err, result) {
						if (err) throw err;
						bot.sendMessage(chatId, 'Successfully set the default betting amount to: ' + numm, { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					});
				}
			}
		}
		if (text.toUpperCase().startsWith('/SBET')) {
			var x1 = text.toUpperCase().replace('/SBET', '');
			var x2, x3 = '';
			for (x2 = 0; x2 < x1.length; x2++) {
				if (x1[x2] == ' ') {
					break;
				}
			}
			if (x1[x2] == ' ' && x2 != 0) {
				for (y = 0; y < x2; y++) {
					if (x1[y] == '0' || x1[y] == '1' || x1[y] == '2' || x1[y] == '3' || x1[y] == '4' || x1[y] == '5' || x1[y] == '6' || x1[y] == '7' || x1[y] == '8' || x1[y] == '9') {
						x3 += x1[y];
					}
					else {
						bot.sendMessage(chatId, 'Invalid number of win rate increasers🚫🚫.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
						y = x2 + 1;
						x3 = ' ';
					}
				}
				if (x3 != ' ') {
					var x4 = parseInt(x3);
					console.log(x1 + " " + x3);
					var x5 = x1.replace(x3 + ' ', '');
					for (y = 0; y < x5.length; y++) {
						if (x5[y] == '0' || x5[y] == '1' || x5[y] == '2' || x5[y] == '3' || x5[y] == '4' || x5[y] == '5' || x5[y] == '6' || x5[y] == '7' || x5[y] == '8' || x5[y] == '9') {
							//nothing
						}
						else {
							bot.sendMessage(chatId, 'Invalid amount to bet.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
							y = x5.length + 1;
							x5 = ' ';
						}
					}
					if (x5 != ' ' && parseInt(x5) != 0) {
						//bot.sendMessage(chatId, '' + x4 + ' ' + x5);
						con.query('SELECT COUNT(*) AS var FROM main WHERE userid = $1', [userid], function (err, result, fields) {
							if (err) throw err;
							var count = parseInt(result.rows[0].var);
							if (count === 0) {
								bal = 3000;
								con.query('INSERT INTO main (userid,balance,wri,state,deposit) VALUES ($1,$2,$3,$4,$5)', [userid, '3000', '0','0','0'], function (err, result) {
									if (err) throw err;
									console.log('inserted');
									bot.sendMessage(chatId, 'You can\'t use more win rate increasers than you have!!!.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
								});
							}
							else {
								con.query('SELECT * FROM main WHERE userid=$1', [userid], function (err, result2, fields) {
									if (err) throw err;
									bal = parseInt(result2.rows[0].balance);
									bet(bal, parseInt(x5), x4);
								});
							}
						});
					}
					else if (parseInt(x5) == 0) {
						bot.sendMessage(chatId, 'Seriously what\'s the point of betting 0 coins....huh??!! Gone mad or what...😏', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
				}
			}
			else {
				bot.sendMessage(chatId, 'Invalid syntax, to see the correct syntax see /help message', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
		}
		if (text.toUpperCase() == '/BAL' || text.toUpperCase() == '/BAL@BETTINGGAMEROBOT') {
			con.query('SELECT * FROM main WHERE userid=$1', [userid], function (err, result, fields) {
				if (err) throw err;
				if (result.rows[0] == undefined) {
					bot.sendMessage(chatId, '🔰⚜️' + msg.from.first_name + '🔰⚜️, your balance is 3000💰 and 0 win rate increasers.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
				}
				else {
					var bal = result.rows[0].balance, wri = result.rows[0].wri;
					if (wri == null) {
						wri = 0;
					}
					if (bal == '0') {
						bot.sendMessage(chatId, '🔰⚜️' + msg.from.first_name + '🔰⚜️, your balance is 0 ❗️❗️.\n\n⚠️⚠️Now you cant play bet as you have no coins but still you can play /minigame and as soon as you win anything in minigame your balance will no longer remain 0 and you would be able to bet coins again👍🏻👍🏻.\nAnd win rate increasers are ' + wri, { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
					else {
						bot.sendMessage(chatId, '🔰⚜️' + msg.from.first_name + '🔰⚜️, your balance is ' + bal + '💰 and ' + wri + ' win rate increasers.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
				}
			});
		}
		if (text.toUpperCase() == '/MYSTATS' || text.toUpperCase() == '/MYSTATS@BETTINGGAMEROBOT') {
			con.query('select * from main where userid=$1', [userid], (err, res) => {
				if (err) throw err;
				console.log(res);
				if (res.rows[0] == undefined) {
					bot.sendMessage(chatId, 'You have not started the game yet', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					return;
				}
				if (res.rows[0].lastdaycollected == null)
					res.rows[0].lastdaycollected == 'Never';
				if (res.rows[0].numreferrals == null)
					res.rows[0].numreferrals = '0';
				if (res.rows[0].lastcommanded == null) { res.rows[0].lastcommanded = 'Never'; }
				else {
					var date = new Date(res.rows[0].lastcommanded * 1000);
					res.rows[0].lastcommanded = date.getUTCHours() +':'+ date.getUTCMinutes() +':'+ date.getUTCSeconds() + '(UTC) on ' + date.getUTCDate() +'/'+ date.getUTCMonth() +'/'+ date.getUTCFullYear();
				}
				if (res.rows[0].defbet == null)
					res.rows[0].defbet = 'Not set/disabled'
				if (res.rows[0].defmini == null)
					res.rows[0].defmini = 'Not set/disabled'
				bot.sendMessage(chatId, 'UserID : ' + userid + '\nBalance : ' + res.rows[0].balance + '\nWRIs : ' + res.rows[0].wri + '\nLast day when daily reward collected : ' + res.rows[0].lastdaycollected + '\nNumber of referrals : ' + res.rows[0].numreferrals + '\nDefault betting number : ' + res.rows[0].defbet + '\nDefault minigame number : ' + res.rows[0].defmini + '\nLastly Commanded/pressed any button : ' + res.rows[0].lastcommanded);

			});
		}
		if (text.toUpperCase() == '/MINIGAMEHELP' || text.toUpperCase() == '/MINIGAMEHELP@BETTINGGAMEROBOT') {
			bot.sendMessage(chatId, '✳️Use /minigame<number> to play minigame.\n\n➡️➡️In this minigame you have to choose the number from 1, 2, 3, 4 and 5 and If your number comes equal to the random number that bot has choosen then you win and you will be rewarded 1000 coins.\n⚠️But If it does not come equal then you lose, neither get anything nor lose anything\n\nℹ️Note: Bot will choose the number randomly so Bot will not tell you that Which number he has choosen.\n\nℹ️Note: Number must be from 1, 2, 3, 4 or 5.\n\nℹ️Note: You cannot play the minigame If your balance is 10000 or more than that.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
		}
		if (text.toUpperCase().startsWith('/MINIGAME') && text.toUpperCase() != '/MINIGAMEHELP' && text.toUpperCase() != '/MINIGAMEHELP@BETTINGGAMEROBOT') {
			//var numm = numFunc(text, '/minigame');
			defmini(function (numm) {
				if (numm != -1) {
					if (numm == 0 || numm >= 6) {
						bot.sendMessage(chatId, '⚠️⚠️Invalid amount⚠️⚠️.(Because you should use a number from 1,2,3,4 and 5 only and no other number.)', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
					else {
						var temp = Math.random();
						var rand = Math.floor(temp * 5) + 1;
						if (rand == numm) {
							con.query('SELECT COUNT(*) AS var FROM main WHERE userid = $1', [userid], function (err, result, fields) {
								if (err) throw err;
								var count = result.rows[0].var;
								if (count == '0') {
									bal = 3000;
									con.query('INSERT INTO main (userid,balance,wri,state,deposit) VALUES ($1,$2,$3,$4,$5)', [userid, '3000', '0','0','0'], function (err, result) {
										if (err) throw err;
										console.log('inserted');
										add(1000, bal, userid);
										bot.sendMessage(chatId, msg.from.first_name + ', you won the game!🥳🥳\n💰💰1000 coins added to your balance.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
									});
								}
								else {
									con.query('SELECT balance AS bal FROM main WHERE userid=$1', [userid], function (err, result2, fields) {
										if (err) throw err;
										bal = parseInt(result2.rows[0].bal);
										if (bal >= 10000) {
											bot.sendMessage(chatId, msg.from.first_name + ', you can not play minigame because your balance is 10000 or more🚫🚫! Better bet some coins and lose then come😜', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
										}
										else {
											add(1000, bal, userid);
											bot.sendMessage(chatId, msg.from.first_name + ', you won the game!🥳🥳\n💰💰1000 coins added to your balance', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
										}
									});
								}
							});
						}
						else {
							con.query('SELECT balance AS bal FROM main WHERE userid=$1', [userid], function (err, result2, fields) {
								if (err) throw err;
								console.log(result2.rows[0]);
								if (result2.rows[0] == undefined || result2.rows[0] == null) {
									bot.sendMessage(chatId, msg.from.first_name + ', you lost the game☹️☹️! Better luck next time😊👍🏻😊👍🏻!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
								}
								else {
									bal = parseInt(result2.rows[0].bal);
									if (bal >= 10000) {
										bot.sendMessage(chatId, msg.from.first_name + ', you can not play minigame because your balance is 10000 or more🚫🚫! Better bet some coins and lose then come😜', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
									}
									else {
										bot.sendMessage(chatId, msg.from.first_name + ', you lost the game☹️☹️! Better luck next time😊👍🏻😊👍🏻!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
									}
								}
							});
						}
					}
				}
			});
		}
		if (text.toUpperCase().startsWith('/SETMINIDEF')) {
			var numm = numFunc(text, '/setminidef');
			if (numm != -1) {
				if (numm >= 6) {
					bot.sendMessage(chatId, '⚠️⚠️Invalid amount⚠️⚠️.(Because you should use a number from 0,1,2,3,4 and 5 only and no other number.)', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
				}
				else if (numm == 0) {
					con.query('update main set defmini=$1 where userid=$2', [null, userid], function (err, result) {
						if (err) throw err;
						bot.sendMessage(chatId, 'Successfully disabled the default minigame number feature.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true })
					});
				}
				else {
					con.query('update main set defmini=$1 where userid=$2', [numm.toString(), userid], function (err, result) {
						if (err) throw err;
						bot.sendMessage(chatId, 'Successfully set the default minigame number to: ' + numm, { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					});
				}
			}
		}
		if (text.toUpperCase() == '/BUTTONMINIGAME' || text.toUpperCase() == '/BUTTONMINIGAME@BETTINGGAMEROBOT') {
			bot.sendMessage(chatId, 'Choose a number from below to play minigame : ', {
				reply_to_message_id: msg.message_id, allow_sending_without_reply: true, reply_markup: {
					inline_keyboard: [[
						{ text: '1', callback_data: '1' },
						{ text: '2', callback_data: '2' },
						{ text: '3', callback_data: '3' },
						{ text: '4', callback_data: '4' },
						{ text: '5', callback_data: '5' }
					]]
				}
			});
		}
		if (text.toUpperCase().startsWith('/GIVE')) {
			console.log(msg.reply_to_message);
			if (msg.reply_to_message == undefined) {
				bot.sendMessage(chatId, 'ℹ️ℹ️You must reply to someone to give them coins.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
			else if (msg.reply_to_message.from.id == msg.from.id) {
				bot.sendMessage(chatId, 'What will you gain by donating to youself bruh......', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
			else if (msg.reply_to_message.from.is_bot == true) {
				bot.sendMessage(chatId, 'Why you want to donate coins to a bot?!😑', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
			else {
				var numm = numFunc(text, '/give');
				console.log(numm);
				if (numm == 0) {
					bot.sendMessage(chatId, 'Seriously what\'s the point of donating 0 coins....huh??!! Just showing off or what...😒', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
				}
				else if (numm != -1) {
					var bal, bal2;
					con.query('SELECT balance AS bal FROM main WHERE userid=$1', [userid], function (err, result, fields) {
						if (err) throw err;
						if (result.rows[0] == undefined) {
							bal = 3000;
							con.query('INSERT INTO main (userid,balance,wri,state,deposit) VALUES ($1,$2,$3,$4,$5)', [msg.from.id.toString(), '3000', '0','0','0'], function (err, result) {
								if (err) throw err;
								//console.log('inserted');
							});
						}
						else {
							bal = parseInt(result.rows[0].bal);
							console.log(bal);
						}
						bool1 = true;
					});
					con.query('SELECT balance AS bal2 FROM main WHERE userid=$1', [msg.reply_to_message.from.id.toString()], function (err, result, fields) {
						if (err) throw err;
						if (result.rows[0] == undefined) {
							bal2 = 3000;
							con.query('INSERT INTO main (userid,balance,wri,state,deposit) VALUES ($1,$2,$3,$4,$5)', [msg.reply_to_message.from.id.toString(), '3000', '0','0','0'], function (err, result) {
								if (err) throw err;
								//console.log('inserted');
							});
						}
						else {
							bal2 = parseInt(result.rows[0].bal2);
						}
						bool2 = true;
						if (bool1 && bool2) {
							transfer(bal, bal2, numm);
						}
					});
				}
			}
		}
		if (text.toUpperCase() == '/REFERRALS' || text.toUpperCase() == '/REFERRALS@BETTINGGAMEROBOT') {
			con.query('select numReferrals as numR from main where userid=$1', [userid], function (err, result, fields) {
				if (err) throw err;
				if (result.rows[0] == undefined) {
					bot.sendMessage(chatId, 'First play bet one time with any non zero amount to get your referral link.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
				}
				else if (result.rows[0].numr == null || result.rows[0].numr == undefined) {
					bot.sendMessage(chatId, 'Your referral link: https://t.me/BettingGameRobot?start=' + userid, { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					bot.sendMessage(chatId, 'Number of your referrals: 0', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
				}
				else {
					bot.sendMessage(chatId, 'Your referral link: https://t.me/BettingGameRobot?start=' + userid, { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					bot.sendMessage(chatId, 'Number of your referrals: ' + result.rows[0].numr, { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
				}
			});
		}
		if (text.toUpperCase() == '/DAILYREWARD' || text.toUpperCase() == '/DAILYREWARD@BETTINGGAMEROBOT') {
			var today = new Date();
			var reward = dailyReward(today.getDate(), today.getDay());
			con.query('select * from main where userid=$1', [userid], function (err, result, fields) {
				if (err) throw err;
				console.log(result.rows[0]);
				if (result.rows[0] == undefined) {
					con.query('insert into main (userid,balance,lastDayCollected,wri,state,deposit) values ($1,$2,$3,$4,$5,$6)', [userid, '3000', today.getDate() + ' ' + today.getMonth() + ' ' + today.getFullYear(), '0','0','0'], function (err, result, fields) {
						if (err) throw err;
						add(reward.coins, 3000, userid);
						addwri(reward.wri, 0, userid);
						bot.sendMessage(chatId, 'Daily prize of today claimed successfully🥳!\n\n+' + reward.coins + '💰\n+' + reward.wri + '📈\n\nCome tomorrow for the next daily prize!!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					});
				}
				else if (result.rows[0].lastdaycollected == today.getDate() + ' ' + today.getMonth() + ' ' + today.getFullYear()) {
					bot.sendMessage(chatId, 'You have already claimed the daily reward of today..!!!😅😓', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
				}
				else {
					if (result.rows[0].wri == null) {
						add(reward.coins, parseInt(result.rows[0].balance), userid);
						addwri(reward.wri, 0, userid);
					}
					else {
						add(reward.coins, parseInt(result.rows[0].balance), userid);
						addwri(reward.wri, parseInt(result.rows[0].wri), userid);
					}
					bot.sendMessage(chatId, 'Daily prize of today claimed successfully🥳!\n\n+' + reward.coins + '💰\n+' + reward.wri + '📈\n\nCome tomorrow for the next daily prize!!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					con.query('update main set lastDayCollected =$1 where userid=$2', [(today.getDate() + ' ' + today.getMonth() + ' ' + today.getFullYear()).toString(), userid], function (err, result, fields) {
						if (err) throw err;
					});
				}
			})
		}
		if (text.toUpperCase() == '/LEADERBOARD' || text.toUpperCase() == '/LEADERBOARD@BETTINGGAMEROBOT') {
			if (msg.chat.type == 'private') {
				con.query("select * from main", function (err, res) {
					if (err) throw err;
					var arry1 = new Array(res.rows.length);
					for (idd = 0; idd < res.rows.length; idd++) {
						arry1[idd] = parseInt(res.rows[idd].balance);
					}
					for (itr = 0; itr < 10; itr++) {
						if (itr == 0) {
							arry1.sort(function (var1, var2) { return var2 - var1 });
							//let filterfunc = (db) => db.filter((v, i) => db.indexOf(v) === i)
							//filterfunc(arry);
							var arry = [...new Set(arry1)];
							var topp = '';
						}
						console.log(arry[itr]);
						con.query('select userid from main where balance=$1', [arry[itr].toString()], (function (itr) {
							return function (err, res2) {
								if (err) throw err;
								//console.log(res2);
								var arry2 = new Array(res2.rows.length);
								for (itr1 = 0; itr1 < res2.rows.length; itr1++) {
									arry2[itr1] = parseInt(res2.rows[itr1].userid);
									if (itr1 == res2.rows.length - 1) {
										var res1 = [...new Set(arry2)];
										console.log(res1.length + 'id:' + itr + '');
									}
								}
								console.log(res1);
								for (ab = 0; ab < res1.length; ab++) {
									var name = '';
									// bot.getChat(res1[ab]).then(function(user) {
									//console.log(user);
									name = res1[ab];
									if (ab == 0 && res1.length > 1) {
										topp += 'UserID : [' + name + '](tg://user?id=' + res1[ab] + '),';
									}
									else if (ab < res1.length - 1) {
										topp += name + ',';
									}
									else {
										if (res1.length == 1) {
											topp += 'UserID : [' + name + '](tg://user?id=' + res1[ab] + ') ; Balance : ' + arry[itr] + '\n';
										}
										else {
											topp += '[' + name + '](tg://user?id=' + res1[ab] + ') ; Balance :' + arry[itr] + '\n';
										}
									}
									console.log('ab' + ab);
									if (itr == 9 && ab == res1.length - 1) {
										bot.sendMessage(chatId, topp, { reply_to_message_id: msg.message_id, allow_sending_without_reply: true, parse_mode: 'Markdown' });
									}
									// });
									//var name='x';

								}
							}
						})(itr)
						);
					}
				});
			}
			else {
				bot.sendMessage(chatId, 'You can see leaderboard only in PM!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
		}
		if (text.toUpperCase() == '/RLEADERBOARD' || text.toUpperCase() == '/RLEADERBOARD@BETTINGGAMEROBOT') {
			if (msg.chat.type == 'private') {
				con.query("select * from main", function (err, res) {
					if (err) throw err;
					var arry1 = new Array(res.rows.length);
					for (idd = 0; idd < res.rows.length; idd++) {
						arry1[idd] = parseInt(res.rows[idd].numreferrals);
					}
					for (itr = 0; itr < 10; itr++) {
						if (itr == 0) {
							arry1.sort(function (var1, var2) { return var2 - var1 });
							//let filterfunc = (db) => db.filter((v, i) => db.indexOf(v) === i)
							//filterfunc(arry);
							var arry = [...new Set(arry1)];
							var topp = '';
						}
						console.log(arry[itr]);
						con.query('select userid from main where numreferrals=$1', [arry[itr].toString()], (function (itr) {
							return function (err, res2) {
								if (err) throw err;
								//console.log(res2);
								var arry2 = new Array(res2.rows.length);
								for (itr1 = 0; itr1 < res2.rows.length; itr1++) {
									arry2[itr1] = parseInt(res2.rows[itr1].userid);
									if (itr1 == res2.rows.length - 1) {
										var res1 = [...new Set(arry2)];
										console.log(res1.length + 'id:' + itr + '');
									}
								}
								console.log(res1);
								for (ab = 0; ab < res1.length; ab++) {
									var name = '';
									// bot.getChat(res1[ab]).then(function(user) {
									//console.log(user);
									name = res1[ab];
									if (ab == 0 && res1.length > 1) {
										topp += 'UserID : [' + name + '](tg://user?id=' + res1[ab] + '),';
									}
									else if (ab < res1.length - 1) {
										topp += name + ',';
									}
									else {
										if (res1.length == 1) {
											topp += 'UserID : [' + name + '](tg://user?id=' + res1[ab] + ') ; numreferrals : ' + arry[itr] + '\n';
										}
										else {
											topp += '[' + name + '](tg://user?id=' + res1[ab] + ') ; numreferrals :' + arry[itr] + '\n';
										}
									}
									console.log('ab' + ab);
									if (itr == 9 && ab == res1.length - 1) {
										bot.sendMessage(chatId, topp, { reply_to_message_id: msg.message_id, allow_sending_without_reply: true, parse_mode: 'Markdown' });
									}
									// });
									//var name='x';

								}
							}
						})(itr)
						);
					}
				});
			}
			else {
				bot.sendMessage(chatId, 'You can see leaderboard only in PM!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
		}
		if(text.toUpperCase()=='/BANK'||text.toUpperCase()=='/BANK@BETTINGGAMEROBOT') {
			var res=await con.query('select * from main where userid=$1',[userid]).catch((e)=>{throw err;})	
			if(res.rows[0]==undefined) {
				await con.query('insert into main (userid,balance,wri,state,deposit) values ($1,$2,$3,$4,$5)', [userid, '3000', '0','0','0']).catch((e)=>{throw err;})
				if(msg.chat.type=='private') {
						bot.sendMessage(chatId,'Welcome to bank. Rate of simple interest is 5% per hour. Do /withdraw to withdraw your coins from the bank. You need to wait minimum 1 hour to withdraw after depositing. Enter the amount you want to deposit in the very next message. Amount should be less than or equal to 10 million coins.\nDo /cancel to cancel',{reply_to_message_id:msg.message_id,allow_sending_without_reply:true});
						con.query("update main set state='1' where userid=$1",[userid],(err,res)=> {if(err) throw err;});
				}
				else {
					bot.sendMessage(chatId,'Bank related works can only be done in PM!',{reply_to_message_id:msg.message_id,allow_sending_without_reply:true});
				}
			}
			else {
				if(msg.chat.type=='private') {
					if(res.rows[0].deposit=='0') {
						bot.sendMessage(chatId,'Welcome to bank. Rate of simple interest is 5% per hour. Do /withdraw to withdraw your coins from the bank. You need to wait minimum 0 hours to withdraw after depositing. Enter the amount you want to deposit in the very next message. Amount should be less than or equal to 10 million coins.\nDo /cancel to cancel',{reply_to_message_id:msg.message_id,allow_sending_without_reply:true});
						con.query("update main set state='1' where userid=$1",[userid],(err,res)=> {if(err) throw err;});
					}
					else {
						bot.sendMessage(chatId,'Bank isnt empty, so you cant deposit more.',{reply_to_message_id:msg.message_id,allow_sending_without_reply:true})
					}
				}
				else {
					bot.sendMessage(chatId,'Bank related works can only be done in PM!',{reply_to_message_id:msg.message_id,allow_sending_without_reply:true});
				}
			}
		}
		if(text.toUpperCase()=='/WITHDRAW'||text.toUpperCase()=='/WITHDRAW@BETTINGGAMEROBOT') {
			if(msg.chat.type=='private') {
				var res=await con.query('select * from main where userid=$1',[userid]).catch((e)=>{throw err;})
				if(res.rows[0]==undefined) {
					bot.sendMessage(chatId,'Nothing in bank',{reply_to_message_id:msg.message_id,allow_sending_without_reply:true});
				}
				else if(res.rows[0].deposit=='0') {
					bot.sendMessage(chatId,'Nothing in bank',{reply_to_message_id:msg.message_id,allow_sending_without_reply:true});
				}
				else if(msg.date-parseInt(res.rows[0].deposittime)<=3600) {
					bot.sendMessage(chatId,'you cant withdraw before 1 hour after depositing');
				}
				else {
					var amt=Math.floor(parseInt(res.rows[0].deposit)+(parseInt(res.rows[0].deposit)*0.05*(msg.date-parseInt(res.rows[0].deposittime))*0.00027777))+1;
					add(amt,parseInt(res.rows[0].balance),userid);
					bot.sendMessage(chatId,'successfully withdrawn coins from bank, you account has been credited with '+amt+' coins');
					con.query("update main set deposit='0' where userid=$1",[userid],(err,res)=> {if(err) throw err;});
				}
			}
			else {
				bot.sendMessage(chatId,'you can withdraw only in PM!');
			}
		}
		if(text.toUpperCase()=='/CANCEL'||text.toUpperCase()=='/CANCEL@BETTINGGAMEROBOT') {
			bot.sendMessage(chatId,'Nothing to cancel......',{reply_to_message_id:msg.message_id,allow_sending_without_reply:true});
		}
		if (text.toUpperCase() == '/USERS' || text.toUpperCase() == '/USERS@BETTINGGAMEROBOT') {
			if (admins.includes(userid)) {
				con.query("select * from main", function (err, result, fields) {
					if (err) throw err;
					//console.log(result);
					bot.sendMessage(chatId, '🔶Number of users of @BettingGameRobot : ' + result.rows.length, { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
				});
			}
		}
		if (text.toUpperCase().startsWith('/BROADCAST ') || text.toUpperCase().startsWith('/BROADCAST@BETTINGGAMEROBOT')) {
			if ((userid == '1130854062' || userid == '1341350794' || userid == '1473152324') && msg.chat.type == 'private') {
				var mesg = text.replace('/broadcast ', '');
				con.query('select userid from main', function (err, res) {
					if (err) throw err;
					for (k = 0; k < res.rows.length; k++) {
						bot.sendMessage(parseInt(res.rows[k].userid), mesg).catch((e) => {/*¯\_(ツ)_/¯*/ })
					}
				});
			}
			else {
				bot.sendMessage(chatId, 'Broadcast could not be done because either you are not admin or you are not using this command in PM', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
		}
		/*if(text=='') {
			if((userid == '1130854062' || userid == '1341350794' || userid == '1473152324')&&msg.chat.type=='private') {
				con.query('select userid from main',function(err,res){
					if(err) throw err;
					for(k=0;k<res.rows.length;k++) {
						bot.forwardMessage(parseInt(res.rows[k].userid),msg.chat.id,msg.message_id).catch((e) => {/*¯\_(ツ)_/¯*//*})
	}
	});
	}
	else {
	bot.sendMessage(chatId,'Broadcast could not be done because either you are not admin or you are not using this command in PM',{reply_to_message_id:msg.message_id,allow_sending_without_reply:true});
	}
	}*/
		if (text.toUpperCase().startsWith('/REWARD')) {
			if (admins.includes(userid)) {
				var numm = numFunc(text, '/reward');
				if (numm != -1) {
					if (msg.reply_to_message == undefined) {
						bot.sendMessage(chatId, 'ℹ️ℹ️You need to reply to someone to reward them.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
					else if (msg.reply_to_message.from.id.toString() == userid) {
						bot.sendMessage(chatId, 'Please don\'t try to reward yourself, my Master.\nThis is cheating for your kind information.😒😒', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
					else if (numm == 0) {
						bot.sendMessage(chatId, 'Is there any meaning of rewarding 0 coins, huh??😏😏😏', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
					else if (msg.reply_to_message.from.is_bot == true) {
						bot.sendMessage(chatId, 'Why you want to reward coins to a bot?!😑', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
					else {
						con.query('SELECT COUNT(*) AS var FROM main WHERE userid = $1', [msg.reply_to_message.from.id.toString()], function (err, result, fields) {
							if (err) throw err;
							var count = result.rows[0].var;
							if (count === 0) {
								bal = 3000;
								con.query('INSERT INTO main (userid,balance,wri,state,deposit) VALUES ($1,$2,$3,$4,$5)', [msg.reply_to_message.from.id.toString(), '3000', '0','0','0'], function (err, result) {
									if (err) throw err;
									console.log('inserted');
									add(numm, bal, msg.reply_to_message.from.id.toString());
									bot.sendMessage(chatId, 'Reward successfully given, Master👍🏻👍🏻.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
								});
							}
							else {
								con.query('SELECT balance AS bal FROM main WHERE userid=$1', [msg.reply_to_message.from.id.toString()], function (err, result2, fields) {
									if (err) throw err;
									bal = parseInt(result2.rows[0].bal);
									add(numm, bal, msg.reply_to_message.from.id.toString());
									bot.sendMessage(chatId, 'Reward successfully given, Master👍🏻👍🏻.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
								});
							}
						});
					}
				}
			}
			else {
				bot.sendMessage(chatId, msg.from.first_name + ', only admins can use this command!🚫🚫⚠️\nAnd if you want to become any admin then read the /info message full.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
		}
		if (text.toUpperCase().startsWith('/SETBAL')) {
			if (admins.includes(userid)) {
				var numm = numFunc(text, '/setbal');
				if (numm != -1) {
					if (msg.reply_to_message == undefined) {
						bot.sendMessage(chatId, 'ℹ️ℹ️You need to reply to someone to change their balance.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
					else if (msg.reply_to_message.from.is_bot == true) {
						bot.sendMessage(chatId, 'Why you want to change balance of a bot?!😑', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
					else {
						con.query('SELECT COUNT(*) AS var FROM main WHERE userid = $1', [msg.reply_to_message.from.id.toString()], function (err, result, fields) {
							if (err) throw err;
							var count = result.rows[0].var;
							if (count === 0) {
								bal = numm;
								con.query('INSERT INTO main (userid,balance,wri,state,deposit) VALUES ($1,$2,$3,$4,$5)', [msg.reply_to_message.from.id.toString(), bal.toString(), '0','0','0'], function (err, result) {
									if (err) throw err;
									console.log('inserted');
									bot.sendMessage(chatId, 'Done, Master👍🏻👍🏻.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
								});
							}
							else {
								add(numm, 0, msg.reply_to_message.from.id.toString());
								bot.sendMessage(chatId, 'Done, Master👍🏻👍🏻.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
							}
						});
					}
				}
			}
			else {
				bot.sendMessage(chatId, msg.from.first_name + ', only admins can use this command!\nAnd if you want to become any admin then read the /info message full.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
		}
		if (text.toUpperCase().startsWith('/SETWRI')) {
			if (admins.includes(userid)) {
				var numm = numFunc(text, '/setwri');
				if (numm != -1) {
					if (msg.reply_to_message == undefined) {
						bot.sendMessage(chatId, 'ℹ️ℹ️You need to reply to someone to change their WRIs.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
					else if (msg.reply_to_message.from.is_bot == true) {
						bot.sendMessage(chatId, 'Why you want to change WRIs of a bot?!😑', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
					else {
						con.query('SELECT COUNT(*) AS var FROM main WHERE userid = $1', [msg.reply_to_message.from.id.toString()], function (err, result, fields) {
							if (err) throw err;
							var wri;
							var count = result.rows[0].var;
							if (count === 0) {
								wri = numm;
								con.query('INSERT INTO main (userid,balance,wri,state,deposit) VALUES ($1,$2,$3,$4,$5)', [msg.reply_to_message.from.id.toString(), '3000', wri.toString(),'0','0'], function (err, result) {
									if (err) throw err;
									console.log('inserted');
									bot.sendMessage(chatId, 'Done, Master👍🏻👍🏻.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
								});
							}
							else {
								addwri(numm, 0, msg.reply_to_message.from.id.toString());
								bot.sendMessage(chatId, 'Done, Master👍🏻👍🏻.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
							}
						});
					}
				}
			}
			else {
				bot.sendMessage(chatId, msg.from.first_name + ', only admins can use this command!\nAnd if you want to become any admin then read the /info message full.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
		}
		if (text.toUpperCase() == '/FULLUSERS' || text.toUpperCase() == '/FULLUSERS@BETTINGGAMEROBOT') {
			if (admins.includes(userid)) {
				if (msg.chat.type != 'private') {
					bot.sendMessage(chatId, '❗️❗️ You can only view the full users list in PM, 🚫not here🚫, Master.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
				}
				else {
					con.query("select * from main", function (err, result, fields) {
						if (err) throw err;
						//console.log(result);
						bot.sendMessage(chatId, '🔶Number of users of @bettinggamerobot: ' + result.rows.length, { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
						var temp = '';
						var i;
						var num = parseInt(result.rows.length / 30) + 1;
						console.log(num);
						console.log(result);
						for (n = 0; n, n < num; n++) {
							temp = '';
							for (i = n * 30; i < n * 30 + 30 && i < result.rows.length; i++) {
								//console.log(i);
								temp = temp + (i + 1) + ' 🔗 Link : [' + result.rows[i].userid + '](tg://user?id=' + result.rows[i].userid + '); 💰 Balance : ' + result.rows[i].balance + '; numReferrals: ' + result.rows[i].numreferrals + '; LastDayCollected: ' + result.rows[i].lastdaycollected + '; Wri: ' + result.rows[i].wri + '\n\n';
							}
							bot.sendMessage(chatId, temp, { parse_mode: 'Markdown' });
						}
					});
				}
			}
			else {
				bot.sendMessage(chatId, msg.from.first_name + ', only admins can use this command!🚫🚫⚠️\nAnd if you want to become any admin then read the /info message full.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
		}
		if (text.toUpperCase().startsWith('/STATS')) {
			if (admins.includes(userid)) {
				console.log(chatId);
				if (msg.chat.type != 'private') {
					bot.sendMessage(chatId, '❗️❗️ You can only view the full users list in PM, 🚫not here🚫, Master.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
				}
				else {
					console.log(text);
					var text1 = text.toUpperCase().replace('/STATS', '').toString();
					console.log(text1);
					con.query('select * from main where userid=$1', [text1], function (err, result, fields) {
						if (err) throw err;
						console.log(result.rows)
						if (result.rows[0] == undefined) {
							bot.sendMessage(chatId, '❌❌No record found with userid :' + text1, { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
						}
						else {
							var temp;
							for (n = 0; n, n < parseInt(result.rows.length / 30) + 1; n++) {
								temp = '';
								for (i = n * 30; i < n * 30 + 30 && i < result.rows.length; i++) {
									//console.log(i);
									temp = temp + 'Record number: ' + (i + 1) + '\n 🔗 Link : [' + result.rows[i].userid + '](tg://user?id=' + result.rows[i].userid + '); 💰 Balance : ' + result.rows[i].balance + '; Number of referrals: ' + result.rows[i].numreferrals + '; LastDayCollected: ' + result.rows[i].lastdaycollected + '; Wri: ' + result.rows[i].wri + '\n\n';
								}
								bot.sendMessage(chatId, temp, { parse_mode: 'Markdown' });
							}
						}
					});
				}
			}
			else {
				bot.sendMessage(chatId, msg.from.first_name + ', only admins can use this command!🚫🚫⚠️\nAnd if you want to become any admin then read the /info message full.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
		}
		if (text.toUpperCase().startsWith('/DELUSER')) {
			if (userid == '1130854062' || userid == '1341350794' || userid == '1473152324') {
				console.log(chatId);
				console.log(text);
				var text1 = text.toUpperCase().replace('/DELUSER', '').toString();
				console.log(text1);
				if (text1 == '' && msg.reply_to_message != undefined) {
					text1 = msg.reply_to_message.from.id.toString();
				}
				con.query('select count(*) as c from main where userid=$1', [text1], function (err, result, fields) {
					if (err) throw err;
					if (result.rows[0].c === 0) {
						bot.sendMessage(chatId, 'No record with userid: ' + text1, { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					}
					else {
						con.query('delete from main where userid=$1', [text1], function (err, result, fields) {
							if (err) throw err;
							bot.sendMessage(chatId, 'All records with userid: ' + text1 + ' deleted.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
						});
					}
				});
			}
			else {
				bot.sendMessage(chatId, msg.from.first_name + ', only admins can use this command!🚫🚫⚠️\nAnd if you want to become any admin then read the /info message full.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
			}
		}
	}
	else if(state=='1') {
		if(text.toUpperCase()=='/CANCEL'||text.toUpperCase()=='/CANCEL@BETTINGGAMEROBOT') {
			if(msg.chat.type=='private') {
				bot.sendMessage(chatId,'bank deposit cancelled');
				con.query("update main set state='0' where userid=$1",[userid],(err,res)=> {if(err) throw err;});
				con.query("update main set deposit='0' where userid=$1",[userid],(err,res)=> {if(err) throw err;});
			}
			else {
				bot.sendMessage(chatId,'you can cancel only in pm');
			}
		}
		else if(cmds.includes(text.toUpperCase())||text.toUpperCase().startsWith('/START')||text.toUpperCase().startsWith('/BET')||text.toUpperCase().startsWith('/SETBETDEF')||text.toUpperCase().startsWith('/SBET')||text.toUpperCase().startsWith('/MINIGAME')||text.toUpperCase().startsWith('/SETMINIDEF')||text.toUpperCase().startsWith('/GIVE')||text.toUpperCase().startsWith('/BROADCAST')||text.toUpperCase().startsWith('/REWARD')||text.toUpperCase().startsWith('/SETBAL')||text.toUpperCase().startsWith('/SETWRI')||text.toUpperCase().startsWith('/STATS')||text.toUpperCase().startsWith('/DELUSER')) {
			bot.sendMessage(chatId,'Please continue the ongoing bank deposit process first :)\ndo /cancel to cancel');
		}
		else if(msg.chat.type=='private') {
			for (i = 0; i <= text.length-1; i++) {
				var char_ = text[i];
				if (char_ != '1' && char_ != '2' && char_ != '3' && char_ != '4' && char_ != '5' && char_ != '6' && char_ != '7' && char_ != '8' && char_ != '9' && char_ != '0') {
					bot.sendMessage(chatId, 'Invalid amount. Please confirm that your entered amount follows this:-\n\nYou have to use whole numbers only, i.e. the number should not contain any other letter than digits, special character, decimal or \'e\'. And it should also not be negative.\n\nTry different amount.\ndo /cancel to cancel', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
					break;
				}
				else if(i==text.length-1) {
					var ress=await con.query('select * from main where userid=$1',[userid]).catch((e)=>{throw err;})
					if(parseInt(ress.rows[0].balance)-parseInt(text)<0) {
						bot.sendMessage(chatId,'cant deposit more than balance, try different amount\ndo /cancel to cancel');
					}
					else if(parseInt(text)==0) {
						bot.sendMessage(chatId,'cant deposit 0 coins, try different amount\ndo /cancel to cancel');
					}
					else if(parseInt(text)>10000000) {
						bot.sendMessage(chatId,'cant deposit such a big amount, try different amount\ndo /cancel to cancel');
					}
					else {
						con.query("update main set deposit=$1 where userid=$2",[text,userid],(err,res)=> {if(err) throw err;});
						con.query("update main set state='2' where userid=$1",[userid],(err,res)=> {if(err) throw err;});
						bot.sendMessage(chatId,'Are you sure? If yes then send "Yes, sure." exactly without the quotes in the very next message. Note that deposited money can only be taken out after a minimum of 3 hours after deposit time and you cannot deposit more coins until you take this amount out.\n\ndo /cancel to cancel');
					}
				}				
			}
		}
	}
	else if(state=='2') {
		if(text.toUpperCase()=='/CANCEL'||text.toUpperCase()=='/CANCEL@BETTINGGAMEROBOT') {
			if(msg.chat.type=='private') {
				bot.sendMessage(chatId,'bank deposit cancelled');
				con.query("update main set state='0' where userid=$1",[userid],(err,res)=> {if(err) throw err;});
				con.query("update main set deposit='0' where userid=$1",[userid],(err,res)=> {if(err) throw err;});
			}
			else {
				bot.sendMessage(chatId,'you can cancel only in pm');
			}
		}
		else if(text=='Yes, sure.'&&msg.chat.type=='private') {
			bot.sendMessage(chatId,'coins successfully deposited');
			con.query('select * from main where userid=$1',[userid],(err,res)=>{
				if(err) throw err;
				add(0-parseInt(res.rows[0].deposit),parseInt(res.rows[0].balance),userid);
			});
			con.query("update main set deposittime=$1 where userid=$2",[msg.date.toString(),userid],(err,res)=> {if(err) throw err;});
			con.query("update main set state='0' where userid=$1",[userid],(err,res)=> {if(err) throw err;});
		}
		else if(msg.chat.type=='private') {
			bot.sendMessage(chatId,'send "Yes, sure." exactly without the quotes, or do /cancel to cancel');
		}
		else if(cmds.includes(text.toUpperCase())||text.toUpperCase().startsWith('/START')||text.toUpperCase().startsWith('/BET')||text.toUpperCase().startsWith('/SETBETDEF')||text.toUpperCase().startsWith('/SBET')||text.toUpperCase().startsWith('/MINIGAME')||text.toUpperCase().startsWith('/SETMINIDEF')||text.toUpperCase().startsWith('/GIVE')||text.toUpperCase().startsWith('/BROADCAST')||text.toUpperCase().startsWith('/REWARD')||text.toUpperCase().startsWith('/SETBAL')||text.toUpperCase().startsWith('/SETWRI')||text.toUpperCase().startsWith('/STATS')||text.toUpperCase().startsWith('/DELUSER')) {
			bot.sendMessage(chatId,'Please continue the ongoing bank deposit process first :)\ndo /cancel to cancel');			
		}
	}
    function bet(bal, numm, x) {
        con.query('select * from main where userid=$1', [userid], function (err, result, fields) {
            if (err) throw err;
            if (result.rows[0] == undefined) {
                bot.sendMessage(chatId, 'You can\'t use more win rate increasers than you have!!!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
                return;
            }
            else if ((result.rows[0].wri == null || x > parseInt(result.rows[0].wri)) && x != 0) {
                bot.sendMessage(chatId, 'You can\'t use more win rate increasers than you have!!!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
                return;
            }
            else if (bal < numm) {
                bot.sendMessage(chatId, msg.from.first_name + ', you can not bet more coins than you have📛📛!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
                return;
            }
            else {
                if (result.rows[0].wri == null || result.rows[0].wri == 'NaN') {
                    wris = '0';
                }
                else {
                    wris = result.rows[0].wri;
                }
                var rand = Math.random();
                if (rand <= 0.5 + (x / 100)) {
                    var bal2 = bal + numm;

                    con.query('UPDATE main SET balance=$1 WHERE userid=$2', [bal2.toString(), userid], function (err, result2) {
                        if (err) throw err;
                        con.query('update main set wri=$1 where userid=$2', [(parseInt(wris) - x).toString(), userid], function (err, result, fields) {
                            if (err) throw err;
                            bot.sendMessage(chatId, msg.from.first_name + ', you won the bet by your luck😁😁!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
                        });
                    });
                }
                else {
                    var bal2 = bal - numm;
                    con.query('UPDATE main SET balance=$1 WHERE userid=$2', [bal2.toString(), userid], function (err, result2) {
                        if (err) throw err;
                        con.query('update main set wri=$1 where userid=$2', [(parseInt(wris) - x).toString(), userid], function (err, result, fields) {
                            if (err) throw err;
                            bot.sendMessage(chatId, msg.from.first_name + ', you lost the bet😓😓!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
                        });
                    });
                }
            }
        });
    }
    function numFunc(text, cmd) {
        if (text.toUpperCase().startsWith(cmd.toUpperCase() + '@BETTINGGAMEROBOT')) {
            x = cmd.length + 17;
        }
        else {
            x = cmd.length;
        }
        var len = text.length - x;
        if (len == 0) {
            if (cmd == '/bet' || cmd == '/minigame') {
                bot.sendMessage(chatId, '⚠️⚠️This is an invalid amount⚠️⚠️. \n\nIt happened because of one of these reasons ⬇️⬇️.\n\n1️⃣  You don\'t have to put space between your number and ' + cmd + '.\n\nExample is given below\n\n' + cmd + '5 = ✅\n\n' + cmd + ' 5 = ❌\n\n2️⃣  You don\'t just have to write ' + cmd + ', you also have to write a number following ' + cmd + ' if you have not set the default number.\n\n3️⃣ You should not write \'@BettingGameRobot\' after ' + cmd + '<number>. You can write \'@BettingGameRobot\' between ' + cmd + ' and the number.\n\n4️⃣ You have to use whole numbers only, i.e. the number should not contain any letter, special character, decimal or \'e\'. And it should also not be negative.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
            }
            else {
                bot.sendMessage(chatId, '⚠️⚠️This is an invalid amount⚠️⚠️. \n\nIt happened because of one of these reasons ⬇️⬇️.\n\n1️⃣  You don\'t have to put space between your number and ' + cmd + '.\n\nExample is given below\n\n' + cmd + '5 = ✅\n\n' + cmd + ' 5 = ❌\n\n2️⃣  You don\'t just have to write ' + cmd + ' you also have to write a number following ' + cmd + '.\n\n3️⃣ You should not write \'@BettingGameRobot\' after ' + cmd + '<number>. You can write \'@BettingGameRobot\' between ' + cmd + ' and the number.\n\n4️⃣ You have to use whole numbers only, i.e. the number should not contain any letter, special character, decimal or \'e\'. And it should also not be negative.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
            }
            //bot.sendMessage(chatId, '⚠️⚠️This is an invalid amount⚠️⚠️. \n\nIt happened because of one of these reasons ⬇️⬇️.\n\n1️⃣  You don\'t have to put space between your number and ' + cmd + '.\n\nExample is given below\n\n' + cmd + '5 = ✅\n\n' + cmd + ' 5 = ❌\n\n2️⃣  You don\'t just have to write ' + cmd + ' you also have to write a number following ' + cmd + '.\n\n3️⃣ You should not write \'@BettingGameRobot\' after ' + cmd + '<number>. You can write \'@BettingGameRobot\' between ' + cmd + ' and the number.\n\n4️⃣ You have to use whole numbers only, i.e. the number should not contain any letter, special character, decimal or \'e\'. And it should also not be negative.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
            //isSyntaxWrong=true;
            return -1;
        }
        var num = new Array(len);
        for (var i = 0; i <= len - 1; i++) {
            var char = text[x + i];
            if (char != '1' && char != '2' && char != '3' && char != '4' && char != '5' && char != '6' && char != '7' && char != '8' && char != '9' && char != '0') {
                bot.sendMessage(chatId, '⚠️⚠️This is an invalid amount⚠️⚠️. \n\nIt happened because of one of these reasons.\n\n1️⃣  You don\'t have to put space between your number and ' + cmd + '.\n\nExample is given below\n\n' + cmd + '5 = ✅\n\n' + cmd + ' 5 = ❌\n\n2️⃣  You don\'t just have to write ' + cmd + ' you also have to write a number following ' + cmd + '.\n\n3️⃣  You should not write \'@BettingGameRobot\' after ' + cmd + '<number>. You can write \'@BettingGameRobot\' between ' + cmd + ' and the number.\n\n4️⃣  You have to use whole numbers only, i.e. the number should not contain any letter, special character, decimal or \'e\'. And it should also not be negative.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
                //isSyntaxWrong=true;
                return -1;
            }
            num[i] = text[x + i];
            if (i == len - 1) {
                var number = '';
                for (var j = 0; j <= len - 1; j++) {
                    number = number + num[j];
                }
                console.log(num);
                console.log(number);
                var numm = parseInt(number);
                if (numm >= 9999999999999999) {
                    bot.sendMessage(chatId, 'You can\'t use such a big number🚫🚫!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
                    return -1;
                }
                console.log(numm);
            }
        }
        return numm;
    }
    function transfer(bal, bal2, numm) {
        var balNew = bal - numm;
        if (balNew < 0) {
            bot.sendMessage(chatId, 'You can\'t donate more coins than you have🚫🚫!', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
            return;
        }
        var bal2New = bal2 + numm;
        console.log('balnew' + balNew + '\nbal' + bal + '\nbal2new' + bal2New + '\nbal2' + bal2);
        con.query('UPDATE main SET balance=$1 WHERE userid=$2', [balNew.toString(), userid], function (err, result) {
            if (err) throw err;
        });
        con.query('UPDATE main SET balance=$1 WHERE userid=$2', [bal2New.toString(), msg.reply_to_message.from.id.toString()], function (err, result) {
            if (err) throw err;
        });
        bot.sendMessage(chatId, 'Donation successful✅👍🏻.', { reply_to_message_id: msg.message_id, allow_sending_without_reply: true });
    }
    function add(amt, bal, userid1) {
        bal = bal + amt;
        con.query('update main set balance =$1 where userid=$2', [bal.toString(), userid1], function (err, result) {
            if (err) throw err;
        });
    }
    function ref(numR, refid) {
        con.query('update main set numReferrals =$1 where userid=$2', [numR.toString(), refid], function (err, result) {
            if (err) throw err;
            console.log(result);
            if (msg.from.username == null || msg.from.username == undefined) {
                bot.sendMessage(refid, 'You got a new referral !\nThis person used your link:-\n\nName: ' + msg.from.first_name + '\nUserID: [' + userid + '](tg://user?id=' + userid + ')\nUsername: No username\n\n+10000💰\n+1 win rate increaser\nNumber of referrals you have earned: ' + numR, { parse_mode: 'Markdown' });
            }
            else {
                bot.sendMessage(refid, 'You got a new referral !\nThis person used your link:-\n\nName: ' + msg.from.first_name + '\nUserID: [' + userid + '](tg://user?id=' + userid + ')\nUsername: @' + msg.from.username + '\n\n+10000💰\n+1 win rate increaser\nNumber of referrals you have earned: ' + numR, { parse_mode: 'Markdown' });
            }
            con.query('select * from main where userid=$1', [refid], function (err, result, fields) {
                if (err) throw err;
                add(10000, parseInt(result.rows[0].balance), refid);
                if (result.rows[0].wri == null || result.rows[0].wri == 'NaN') {
                    addwri(1, 0, refid);
                }
                else {
                    addwri(1, parseInt(result.rows[0].wri), refid);
                }
            });
        });
    }
    function addwri(amt, bal, userid) {
        con.query('update main set wri=$1 where userid=$2', [(amt + bal).toString(), userid], function (err, result, fields) {
            if (err) throw err;
        });
    }
    function dailyReward(date, day) {
        if (day != 0) {
            return { coins: (day) * 1000, wri: 0 };
        }
        else {
            var r = parseInt(date / 7) + 1;
            if (date % 7 == 0) {
                r--;
            }
            switch (r) {
                case 1: return { coins: 0, wri: 1 };
                case 2: return { coins: 0, wri: 2 };
                case 3: return { coins: 0, wri: 5 };
                case 4: return { coins: 0, wri: 8 };
                case 5: return { coins: 0, wri: 10 };
                default: return { coins: 0, wri: 0 };
            }
        }
    }
    function defbet(cb) {
        var y = 1;
        if (text == '/bet' || text == '/bet@bettinggamerobot') {
            con.query('select defbet from main where userid=$1', [userid], function (err, result) {
                if (err) throw err;
                console.log(result);
                if (result.rows[0].defbet == null) {
                    y = numFunc(text, '/bet');
                    console.log('one' + y);
                    cb(y);
                }
                else {
                    y = parseInt(result.rows[0].defbet);
                    console.log('two' + y);
                    cb(y);
                }
            });
        }
        else {
            y = numFunc(text, '/bet');
            console.log('three' + y);
            cb(y);
        }
        //_callback();
        //return setTimeout(function(){console.log('sdfgfdsdcvbgfdcv');return y;},400);

    }
    function defmini(cb) {
        var y = 1;
        if (text == '/minigame' || text == '/mingame@bettinggamerobot') {
            con.query('select defmini from main where userid=$1', [userid], function (err, result) {
                if (err) throw err;
                console.log(result);
                if (result.rows[0].defmini == null) {
                    y = numFunc(text, '/minigame');
                    console.log('one' + y);
                    cb(y);
                }
                else {
                    y = parseInt(result.rows[0].defmini);
                    console.log('two' + y);
                    cb(y);
                }
            });
        }
        else {
            y = numFunc(text, '/minigame');
            console.log('three' + y);
            cb(y);
        }
        //_callback();
        //return setTimeout(function(){console.log('sdfgfdsdcvbgfdcv');return y;},400);

    }

});
bot.on('callback_query', async function (cbq) {
    console.log(cbq);
    if (cbq.data == '1' || cbq.data == '2' || cbq.data == '3' || cbq.data == '4' || cbq.data == '5') {
		console.log('hey');
		var date= new Date().getTime();
        var res = await con.query('select lastcommanded from main where userid=$1', [cbq.from.id.toString()]).catch((err) => { console.log(err); });
		console.log(date/1000);
        if ((date/1000) - parseFloat(res.rows[0].lastcommanded) <= 0.5) {
            bot.answerCallbackQuery(cbq.id, { text: 'Pressing buttons/commanding too fast.', show_alert: true });
            return;
        }
        else {
            con.query('update main set lastcommanded=$1 where userid=$2', [(date/1000).toString(), cbq.from.id.toString()], function (err, res) {
                if (err) throw err;
            });
        }
        if (cbq.message.reply_to_message != undefined && cbq.from.id == cbq.message.reply_to_message.from.id) {
            var opts = {
                chat_id: cbq.message.chat.id,
                message_id: cbq.message.message_id
            }
            var numm = parseInt(cbq.data);
            var temp = Math.random();
            var rand = Math.floor(temp * 5) + 1;
            if (rand == numm) {
                con.query('SELECT * FROM main WHERE userid = $1', [cbq.from.id.toString()], function (err, result, fields) {
                    if (err) throw err;
                    //var count = result[0].var;
                    if (result.rows[0] === 0) {
                        bal = 3000;
                        con.query('INSERT INTO main (userid,balance,wri,state,deposit) VALUES ($1,$2,$3,$4,$5)', [cbq.from.id.toString(), '3000', '0','0','0'], function (err, result) {
                            if (err) throw err;
                            console.log('inserted');
                            bal = bal + 1000;
                            con.query('update main set balance =$1 where userid=$2', [bal.toString(), cbq.from.id.toString()], function (err, result) {
                                if (err) throw err;
                            });
                            bot.editMessageText(cbq.from.first_name + ', you chose ' + numm + ' and won the game!🥳🥳\n💰💰1000 coins added to your balance.', opts);
                        });
                    }
                    else {
                        con.query('SELECT balance AS bal FROM main WHERE userid=$1', [cbq.from.id.toString()], function (err, result2, fields) {
                            if (err) throw err;
                            bal = parseInt(result2.rows[0].bal);
                            if (bal >= 10000) {
                                bot.editMessageText(cbq.from.first_name + ', you can not play minigame because your balance is 10000 or more🚫🚫! Better bet some coins and lose then come😜', opts);
                            }
                            else {
                                bal = bal + 1000;
                                con.query('update main set balance =$1 where userid=$2', [bal.toString(), cbq.from.id.toString()], function (err, result) {
                                    if (err) throw err;
                                });
                                bot.editMessageText(cbq.from.first_name + ', you chose ' + numm + ' and won the game!🥳🥳\n💰💰1000 coins added to your balance', opts);
                            }
                        });
                    }
                });
            }
            else {
                con.query('SELECT balance AS bal FROM main WHERE userid=$1', [cbq.from.id.toString()], function (err, result2, fields) {
                    if (err) throw err;
                    console.log(result2.rows[0]);
                    if (result2.rows[0] == undefined) {
                        bot.editMessageText(cbq.from.first_name + ', you chose ' + numm + ' and lost the game☹️☹️! Better luck next time😊👍🏻😊👍🏻!', opts);
                    }
                    else {
                        bal = parseInt(result2.rows[0].bal);
                        if (bal >= 10000) {
                            bot.editMessageText(cbq.from.first_name + ', you can not play minigame because your balance is 10000 or more🚫🚫! Better bet some coins and lose then come😜', opts);
                        }
                        else {
                            bot.editMessageText(cbq.from.first_name + ', you chose ' + numm + ' and lost the game☹️☹️! Better luck next time😊👍🏻😊👍🏻!', opts);
                        }
                    }
                });
            }
        }
        else {
            bot.answerCallbackQuery(cbq.id, { text: 'This minigame can not be played by you because either this is not meant for you, or the sender deleted the command message. ', show_alert: true });
        }
    }
});
bot.on('polling_error', (err) => {
    console.log(err);
   // bot.sendMessage(-446887802, err);
});