var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var ids =[];
var titles;
var restaurants =[];
const id_url = "https://m.lafourchette.com/fr_FR/search?date=2018-02-23&hour=20:00&pax=2&searchText=";
//const deal_url ="https://www.lafourchette.com/reservation/module/date-list/";

function GetMichelin(path)

{
	fs.readFile(path, 'utf8', function (err, data) {
	  if (err) throw err;
	  titles = JSON.parse(data);
		//console.log(titles)
	});
}
function GetId()
{
	for(var i =0; i < titles.length ; i++)
	{
        var options = {
          url: 'https://m.lafourchette.com/fr_FR/search?date=2018-02-23&hour=20:00&pax=2&searchText=',
          headers: {
"Cookie": "COOKIE_POLICY=true; optimizelyEndUserId=oeu1517386600336r0.5747707472616457; optimizelySegments=%7B%222094000590%22%3A%22none%22%2C%222105021233%22%3A%22referral%22%2C%222108891003%22%3A%22false%22%2C%222113951034%22%3A%22gc%22%2C%222445220188%22%3A%22true%22%2C%226139290832%22%3A%22true%22%7D; __55ft=github.com_referral_-; cto_lwid=d705afaa-e597-46f4-b4b9-5776233eb9bf; __qca=P0-787511414-1517386620517; ry_ry-l4f02rfr_realytics=eyJpZCI6InJ5Xzc0QjNEMDc2LUM0NzUtNEFBOS1BNkM0LTY1QjBFNkEyQzQzRiIsImNpZCI6bnVsbCwiZXhwIjoxNTQ4OTIyNjIwNjQ3fQ%3D%3D; optimizelyBuckets=%7B%228385409370%22%3A%228384861628%22%2C%228504435549%22%3A%228507067200%22%2C%229620901071%22%3A%229618100472%22%7D; __utmv=25724450.|3=VisitorFrequency=frequent=1^4=Engagement=regular=1^5=Membership=new-visitor=1; AMCVS_20E8776A524455540A490D44%40AdobeOrg=1; AMCV_20E8776A524455540A490D44%40AdobeOrg=-1248264605%7CMCIDTS%7C17585%7CMCMID%7C23085815759281369130668565148885305161%7CMCAAMLH-1519745565%7C6%7CMCAAMB-1519993018%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1519395418s%7CNONE%7CMCAID%7CNONE; s_cc=true; __utma=25724450.1170222908.1517386605.1519311013.1519388220.10; __utmc=25724450; __utmz=25724450.1519388220.10.3.utmcsr=k.datadome.co|utmccn=(referral)|utmcmd=referral|utmcct=/; datadome=AHrlqAAAAAMASp8YbQ87kgwALtotww==; mbox=PC#1517386600542-376970.26_15#1520600410|session#1519388216772-561323#1519392670|check#true#1519390870; s_ppvl=DESKTOP%253Enull%253Esearch-intermediate-results%253Efr_FR%2C23%2C14%2C1037%2C664%2C637%2C1366%2C768%2C1%2CP; s_ppv=DESKTOP%253Enull%253Esearch-intermediate-results%253Efr_FR%2C13%2C13%2C637%2C664%2C637%2C1366%2C768%2C1%2CP; _ga=GA1.3.1170222908.1517386605; _gid=GA1.3.276062679.1519393625; ry_ry-l4f02rfr_so_realytics=eyJpZCI6InJ5Xzc0QjNEMDc2LUM0NzUtNEFBOS1BNkM0LTY1QjBFNkEyQzQzRiIsImNpZCI6bnVsbCwib3JpZ2luIjp0cnVlLCJyZWYiOm51bGwsImNvbnQiOm51bGx9; s_visit=1; s_dl=1; c_m=undefinedTyped%2FBookmarkedTyped%2FBookmarkedundefined; st_chan=%5B%5B%27DA%27%2C%271518187056708%27%5D%2C%5B%27RVI%27%2C%271518595622739%27%5D%2C%5B%27DA%27%2C%271519242799480%27%5D%2C%5B%27RS%27%2C%271519388218185%27%5D%2C%5B%27DA%27%2C%271519393627576%27%5D%5D; st_chan2=%5B%5B%27RS%27%2C%271519388218186%27%5D%2C%5B%27DA%27%2C%271519393627582%27%5D%5D; st_chan7=%5B%5B%27DA%27%2C%271519242799482%27%5D%2C%5B%27RS%27%2C%271519388218187%27%5D%2C%5B%27DA%27%2C%271519393627586%27%5D%5D; s_ev80=%5B%5B%27Other%2520Natural%2520Referrers%253A%2520k.datadome.co%27%2C%271519388218188%27%5D%2C%5B%27DA%253Ahome%27%2C%271519393627588%27%5D%5D; s_ev81=%5B%5B%27DA%253Ahomepage-city%27%2C%271519140765471%27%5D%2C%5B%27DA%253Asearch-intermediate-results%27%2C%271519238942751%27%5D%2C%5B%27DA%253Asearch-no-result%27%2C%271519242799483%27%5D%2C%5B%27Other%2520Natural%2520Referrers%253A%2520k.datadome.co%27%2C%271519388218189%27%5D%2C%5B%27DA%253Ahome%27%2C%271519393627591%27%5D%5D; s_ev82=%5B%5B%27DA%253Ahomepage-city%27%2C%271519140765472%27%5D%2C%5B%27DA%253Asearch-intermediate-results%27%2C%271519238942752%27%5D%2C%5B%27DA%253Asearch-no-result%27%2C%271519242799484%27%5D%2C%5B%27Other%2520Natural%2520Referrers%253A%2520k.datadome.co%27%2C%271519388218191%27%5D%2C%5B%27DA%253Ahome%27%2C%271519393627594%27%5D%5D; s_fid=2A2CB49FD18202ED-383BFAB4965DABA9; prev_pn=MOBILE%3Enull%3Esearch-results%3Efr_FR; s_sq=%5B%5BB%5D%5D; _uetsid=_uet2742d591"


          }
        };
        options.url =id_url + encodeURIComponent(titles[i]);
		//var url2=id_url + encodeURIComponent(titles[i]);
     //   console.log(url2);
        var restaurant = {"id":"","name":titles[i],"deal":""};

        request(options, function(error, response, html){
            
			if(!error){
                
				var $ = cheerio.load(html);
                    console.log($.text());
				$('.restaurantResult-promotion ng-binding ng-scope restaurantResult-promotion--special').filter(function(){
					var data = $(this);
					restaurant.deal=data.text();
                    restaurants.push(restaurant);
                    console.log(data.text());
				});


			}
			else
				console.log(error);

		});
	}
}
function Store()
{
	console.log(restaurants);
	var json_resto = JSON.stringify(restaurants);
	fs.writeFile('restaurants.json', json_resto, 'utf8', (err) => {
	  if (err) throw err;

	});
}
GetMichelin('./michelin.json');
setTimeout(GetId, 1000);
//setTimeout(GetDeal,30000);
setTimeout(Store,30000);
