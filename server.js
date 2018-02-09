var michelin = require("./michelin");
michelin.NumberOfPages();
setTimeout(michelin.Scrape, 5000);//time out because Node JS is asynchronous and we have to get the number of pages
setTimeout(michelin.Store,30000);//we have to scrape all of the restaurant titles