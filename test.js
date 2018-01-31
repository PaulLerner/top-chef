var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();    
url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';//first page research off all starred french restaurants
// /page-2
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

			
            var title;
			//, release, rating;
            //var json = { title : "", release : "", rating : ""};

            $('.poi_card-display-title').filter(function(){
                var data = $(this);
                title = data.text();
            })

          
        }
		else
			console.log(error);
		console.log(title);