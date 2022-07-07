
class Github {
  constructor() {
    this.url = `https://api.github.com/users/`;
  }
  async getUserInfoFromGithub(username) {
    const responseUser = await fetch(this.url + username)
    const userJson = await responseUser.json();
    if (userJson.message !== "Not Found") {
      const responseRepos = await fetch(this.url + username + "/repos")
      const reposJson = await responseRepos.json();
      return {
        user: userJson,
        repo: reposJson
      }
    }
    else {
      const ui2 = new UI();
      ui2.showAlert();
    }
  }
}