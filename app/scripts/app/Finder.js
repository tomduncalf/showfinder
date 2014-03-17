"use strict";
define([
    'underscore', 'app/Models/Episode', 'app/Collections/Episodes'
], function(_, Episode, Episodes) {
    var Finder = function() {};

    Finder.prototype.setData = function(episodeData) {
        this.episodeData = episodeData;
    }

    Finder.prototype._findEpisodesWithCharacter = function(episodes, characterQuery) {
        return _.filter(episodes, function(episode) { 
            return _.find(episode.characters, function(character) {
                return character == characterQuery; 
            });
        });
    }

    Finder.prototype._findEpisodesWithCharacters = function(episodes, charactersQuery) {
        charactersQuery.forEach(function(characterQuery) {
            episodes = this._findEpisodesWithCharacter(episodes, characterQuery)
        }, this);
        return episodes;
    }

    Finder.prototype._getEpisodeCollection = function(episodes) {
        var episodeCollection = new Episodes;
        _.each(episodes, function(ep) {
            var episode = new Episode({
                title: ep.title,
                characters: ep.characters,
                href: ep.href
            });
            episodeCollection.add(episode);
        });
        return episodeCollection;
    }

    Finder.prototype.getEpisodesWithCharacters = function(characters, skipConversion) {
        var episodes = this._findEpisodesWithCharacters(this.episodeData, characters);
        if(skipConversion !== true) {
            episodes = this._getEpisodeCollection(episodes);
        }
        return episodes;
    }

    Finder.prototype.getAllCharacters = function() {
        var characters = _.map(this.episodeData, function(ep) {
            return ep.characters;
        });
        return _.uniq(_.flatten(characters)).sort();
    }

    return Finder;
});
