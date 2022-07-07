class Storage {
  static getUsersFromStorage() {
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
    }
    else {
      users = JSON.parse(localStorage.getItem("users"));
    }
    return users;
  }
  static addLastUserToStorage(username) {
    let users = this.getUsersFromStorage();
    if (users.indexOf(username) === -1) {
      users.unshift(username);
    }
    localStorage.setItem("users", JSON.stringify(users))
  }
  static deleteUserFromStorage(element) {
    let users = this.getUsersFromStorage()
    users.splice(users.indexOf(element.parentElement.textContent), 1);
    localStorage.setItem("users", JSON.stringify(users))
  }
  static clearAllUsersFromStorage(){
    let users = this.getUsersFromStorage();
    users =[];
    localStorage.setItem("users",JSON.stringify(users));
  }
}