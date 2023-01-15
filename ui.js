class UI {
  constructor(profileDiv, reposDiv, lastSearched, cardBody) {
    this.profileDiv = profileDiv;
    this.reposDiv = reposDiv;
    this.lastSearched = lastSearched;
    this.cardBody = cardBody;
  }
  addUserInfosToUI(user) {
    this.profileDiv.innerHTML = `<div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-4">
          <a href="${user.url}" target="_blank">
            <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
          <hr>
            <div id="fullName"><strong>${user.name}</strong></div>
            <hr>
              <div id="bio">${user.bio}</div>
            </div>
            <div class="col-md-8">
              <button class="btn btn-secondary">
                Foloower  <span class="badge badge-light">${user.followers}</span>
              </button>
              <button class="btn btn-info">
                Following  <span class="badge badge-light">${user.following}</span>
              </button>
              <button class="btn btn-danger">
                Repos  <span class="badge badge-light">${user.public_repos}</span>
              </button>
              <hr>
                <li class="list-group">
                  <li class="list-group-item borderzero">
                    <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                  </li>
                  <li class="list-group-item borderzero">
                    <img src="images/location.png" width="30px"> <span id="location">${user.location}</a>
                  </li>
                  <li class="list-group-item borderzero">
                    <img src="images/mail.png" width="30px"> <span id="email">${user.email}</span>
                  </li>
                </div>
            </div>
        </div>`
  }
  addUserReposToUI(repos) {
    repos.forEach(repo => {
      this.reposDiv.innerHTML += `<div class="mb-2 card-body">
        <div class="row">
          <div class="col-md-2">
            <span></span>
            <a href="${repo.html_url}" target="_blank" id="repoName">${repo.name}</a>
          </div>
          <div class="col-md-6">
            <button class="btn btn-secondary">
              Starlar  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
            </button>

            <button class="btn btn-info">
              Forklar  <span class="badge badge-light" id="repoFork">${repo.forks_count}</span>
            </button>
          </div>
        </div>
      </div>`
    })
  }
  addLastSearchedUserToUI(username) {
    let users = Storage.getUsersFromStorage();
    if (users.indexOf(username) === -1) {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `${username}<i class="fa-solid fa-trash" style=cursor:pointer;></i>`
      li.style = "display: flex;justify-content: space-between;"
      this.lastSearched.prepend(li);
    }
  }
  loadAllUsersFromStorage() {
    let users = Storage.getUsersFromStorage();
    users.forEach(user => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `${user}<i class="fa-solid fa-trash" style="cursor:pointer;"></i>`
      li.style = "display: flex;justify-content: space-between;"
      this.lastSearched.appendChild(li);
    })
  }
  deleteUserFromUI(element) {
    element.parentElement.remove();
  }
  showAlert(message) {
    const div = document.createElement("div");
    div.className = "alert alert-danger";
    div.textContent = message;
    this.cardBody.appendChild(div);
    setTimeout(() => {
      div.remove();
    }, 2000);
  }
  clearAllUsersFromUI(){
    while(this.lastSearched.firstElementChild !== null){
      this.lastSearched.firstElementChild.remove();
    }
  }
}
