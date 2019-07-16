var scrape = required("scripts\scrape.js");
var makeDate = required("scripts\dates.js");
var Headline = require("models\Headline");

module.exports = {
    fetch: function(cb) {
        scrape(function(data) {
        var articles = data;
        for (var i=0; i < articles.length; i++) {
            articles[i].date = makeDate();
            articles[i].saved = false;
        }
        Headline.collection.insertMany(articles, {ordered:false}, function(err, docs){
            cb(err,docs);
        });
    });
}, 
delete: function(query,cb) {
    Headline.remove(query.cb);
}
}