define([
    'jquery'
], function($) {
    var Scraper = function() {};

    Scraper.prototype.go = function() {
        return $.ajax({
            url: 'data/imdb/Peep Show.html',
            dataType: 'html'
        }).then(function(data) {
            return this._handleImdb(data)
        }.bind(this));
    }

    Scraper.prototype._handleImdb = function(data) {
        var episodes = [];
        var $dom = $($.parseHTML(data));
        var titles = $dom.find('h4');

        titles.each(function(index, el) {
            var $el = $(el);
            var $castTable = $el.nextAll('div.info-content').eq(0).find('table');
            var $cast = $castTable.find('td.char a');
            var link = 'http://www.imdb.com' + $el.find('a').eq(0).attr('href');

            var episode = { title: $el.text(), href: link, characters: [] };
            episodes.push(episode);

            $cast.each(function(index, el) {
                episode.characters.push(el.innerHTML);
            });
        });

        return episodes;
    } 

    return Scraper;
});