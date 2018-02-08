var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var number_of_pages=1;
var titles =[];
   const url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';//first page research off all starred french restaurants

    request(url, function(error, response, html){//gets the first page titles plus the number of pages
        if(!error){
            var $ = cheerio.load(html);

            $('.poi_card-display-title').filter(function(){
                var data = $(this);
                var title = data.text();
				titles.push(title.trim());
            });
			$('.mr-pager-item').filter(function(){
                var data = $(this);
                number_of_pages = data.children().first().text();
			
            });

          
        }
		else
			console.log(error);
		
console.log("numb of pages "+number_of_pages);
    });

function Scrape()//gets all the remaining pages' title
{
	
	for(var i=2;i<= number_of_pages;i++)
	{
			var url2= url+"/page-"+i;
			request(url2, function(error, response, html){
			if(!error){
				var $ = cheerio.load(html);

				$('.poi_card-display-title').filter(function(){
					var data = $(this);
					var title = data.text();
					titles.push(title.trim());
				});


			}
			else
				console.log(error);

		});

	}

			

}
function Display()
{
	console.log(titles);
	var json = JSON.stringify(titles);
	fs.writeFile('michelin.json', json, 'utf8', (err) => {
	  if (err) throw err;

	});
}
setTimeout(Scrape, 5000);//time out because Node JS is asynchronous and we have to get the number of pages
setTimeout(Display,30000);//we have to scrape all of the restaurant titles