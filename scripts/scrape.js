var request = require('request');
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.nytimes.com", function(err,res,body) {
        // console.log(body,'\n\n\n\n\n');
        var $ = cheerio.load(body);
        var articles = [];
        $('.theme-summary').each((i, element) => {
        //     var articleData = {
        //         headline: $(element).find('a').attr('title'),
        //         url: `https://www.buffalobills.com${$(element).find('a').attr('href')}`,
        //         // summary: //parse summary 
        //     }
        //     articles.push(articleData)            
        // });

        // // $("".search(function(i,element) {
            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();

            if (head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};
module.exports = scrape;