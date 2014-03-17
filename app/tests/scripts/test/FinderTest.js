"use strict";
define([
    'qunit', 'app/Finder'
], function(QUnit, Finder) {
    var finder, emptyFinder;

    var testEpisodes = [
        {
            title: "Episode 1",
            href: "href1",
            characters: [
                "Character 1",
                "Character 2"
            ]
        },
        {
            title: "Episode 2",
            href: "href2",
            characters: [
                "Character 2",
                "Character 3"
            ]
        },
        {
            title: "Episode 3",
            href: "href3",
            characters: [
                "Character 4",
                "Character 5"
            ]
        },
        {
            title: "Episode 4",
            href: "href3",
            characters: [
                "Character 7",
                "Character 6",
                "Character 5",
                "Character 4"
            ]
        },
    ];

    var _setup = function() {
        finder = new Finder();
        finder.setData(testEpisodes);

        emptyFinder = new Finder();
    }

    /**
     * Testing without converting to model until I find a way to compare equality of Backbone collections - 
     * currently, child ID doesn't match up as it increments for every generated model.
     */
    var run = function() {
        _setup();

        QUnit.test("Find no episodes with no data", function() {
            var actual = finder.getEpisodesWithCharacters(["Character 1"], true);
            var expected = [testEpisodes[0]];
            deepEqual(actual, expected, "Find episode by character");
        });

        QUnit.test("Find episode by character", function() {
            var actual = finder.getEpisodesWithCharacters(["Character 1"], true);
            var expected = [testEpisodes[0]];
            deepEqual(actual, expected, "Find episode by character");
        });

        QUnit.test("Find multiple episodes by single character", function() {
            var actual = finder.getEpisodesWithCharacters(["Character 2"], true);
            var expected = [testEpisodes[0], testEpisodes[1]];
            deepEqual(actual, expected, "Find multiple episodes by single character");
        });

        QUnit.test("Find episode by multiple characters", function() {
            var actual = finder.getEpisodesWithCharacters(["Character 1", "Character 2"], true);
            var expected = [testEpisodes[0]];
            deepEqual(actual, expected, "Find one episode by multiple characters");
        });

        QUnit.test("Find multiple episodes by multiple characters", function() {
            var actual = finder.getEpisodesWithCharacters(["Character 4", "Character 5"], true);
            var expected = [testEpisodes[2], testEpisodes[3]];
            deepEqual(actual, expected, "Find multiple episodes by multiple characters");
        });

        QUnit.test("Find no episodes by character", function() {
            var actual = emptyFinder.getEpisodesWithCharacters(["Character 0"], true);
            var expected = [];
            deepEqual(actual, expected, "Find no episodes by character");
        });

        QUnit.test("Get all characters", function() {
            var actual = finder.getAllCharacters();
            var expected = ["Character 1", "Character 2", "Character 3", "Character 4", "Character 5", "Character 6", "Character 7"];
            deepEqual(actual, expected, "Get all characters");
        });

        QUnit.test("Get all characters with no data", function() {
            var actual = emptyFinder.getAllCharacters();
            var expected = [];
            deepEqual(actual, expected, "Get all characters with no data");
        });
    }

    return { run: run };
});
