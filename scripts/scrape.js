var request = require('request');
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.buffalobills.com/", function(err,res,body) {
        var $ = cheerio.load(body);
        var acticles = [];
        $("".search(function(i,element) {
            var head = $(this).children("").text().trim();
            var sum = $(this).children("//classinfohere").text().trim();

            if (head && sum) {
                var headNeat = head.replace // more here
                var sumNeat =

                var datatoAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                articles.push(dataToAdd);
            }
        }));
        cd(articles);
    });
};
module.exports = scrape;