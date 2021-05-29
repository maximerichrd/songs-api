var firstSong = {
    name: "The dock of the bay",
    author: "Ottis Redding",
    duration: 3.30
};
var displaySongs = function (songs) {
    songs.forEach(function (_a, i) {
        var name = _a.name, author = _a.author, duration = _a.duration;
        return console.log("song #" + (i + 1) + ": \n " + name + " \n " + author + " \n " + duration);
    });
};
displaySongs([firstSong]);
