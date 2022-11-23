class ArtistEntity {
  id;
  name;
  albums;

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      albums: this.albums.map((album) => {
        return {
          id: album.id,
          title: album.title,
        };
      }),
    };
  }

  fromJSON(data) {
    this.id = data.id;
    this.name = data.name;
    this.albums = data.albums;
  }
}

module.exports = ArtistEntity;
