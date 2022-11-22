class Artist {
  id;
  name;
  albums;

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  fromJSON(data) {
    this.id = data.id;
    this.name = data.name;
  }
}

module.exports = Artist;
