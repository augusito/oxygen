class CreateUserDto {
  username;
  first_name;
  last_name;
  password;
  profile_image_url;
  email_address;
  phone_number;

  constructor({
    username,
    first_name,
    last_name,
    password,
    profile_image_url,
    phone_number,
  }) {
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.profile_image_url = profile_image_url;
    this.email_address = email_address;
    this.phone_number = phone_number;
  }
}

module.exports = CreateUserDto;
