class UserEntity {
  id;
  username;
  first_name;
  last_name;
  password;
  profile_image_url;
  email_address;
  phone_number;

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      first_name: this.first_name,
      last_name: this.last_name,
      password: this.password,
      profile_image_url: this.profile_image_url,
      email_address: this.email_address,
      phone_number: this.phone_number,
    };
  }

  fromJSON({
    id,
    username,
    first_name,
    last_name,
    password,
    profile_image_url,
    phone_number,
  }) {
    this.id = id;
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.profile_image_url = profile_image_url;
    this.email_address = email_address;
    this.phone_number = phone_number;
  }
}

module.exports = UserEntity;
