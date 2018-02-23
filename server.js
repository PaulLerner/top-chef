var michelin = require("./michelin");
var lafourchette = require("./lafourchette");
var timeout = 5000;
michelin.NumberOfPages();
setTimeout(michelin.Scrape, timeout);//time out because Node JS is asynchronous and we have to get the number of pages
timeout+=30000;
setTimeout(michelin.Store,timeout);//we have to scrape all of the restaurant titles
setTimeout(lafourchette.GetMichelin,timeout);
timeout+=1000;
setTimeout(lafourchette.GetId, timeout);//scrape all the deals
timeout+=30000;
setTimeout(lafourchette.Store,timeout);
