const Artist = require("../artist/artist");
const artist = new Artist();

class Album {
  id;
  title;
  artist;

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      artist: artist.toJSON(this.albums),
    };
  }

  fromJSON(data) {
    this.id = data.id;
    this.title = data.title;
    this.artist = data.artist && artist.fromJSON(data.artist);
  }
}

module.exports = Album;
