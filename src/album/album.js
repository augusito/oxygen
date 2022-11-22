const Artist = require("../artist/artist");

class Album {
  id;
  title;
  artist;

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      artist: {
        id: this.artist?.id,
        name: this.artist?.name,
      },
    };
  }

  fromJSON(data) {
    this.id = data.id;
    this.title = data.title;
    this.artist = data.artist;
  }
}

module.exports = Album;
