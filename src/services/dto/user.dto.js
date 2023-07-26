export default class UsersDto {
  constructor(user) {
    this.name = user.first_name;
    this.lastName = user.last_name;
    this.age = user.age;
    this.email = user.email;
    this.fullName = this.name + " " + this.lastName;
  }
}
