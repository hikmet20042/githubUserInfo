const githubForm = document.getElementById("github-form");
const userInput = document.getElementById("githubname");
const profileDiv = document.getElementById("profile");
const reposDiv = document.getElementById("repos");
const lastSearched = document.getElementById("last-users");
const cardBody = document.querySelector(".card-body");
const clearUsers = document.getElementById("clear-last-users");
const github = new Github();
const ui = new UI(profileDiv, reposDiv, lastSearched, cardBody);
eventListener();
function eventListener() {
  githubForm.addEventListener("submit", addUserInfo);
  document.addEventListener("DOMContentLoaded", loadAllLastUsersFromStorage);
  lastSearched.addEventListener("click", removeUser);
  clearUsers.addEventListener("click",clearAllUsers)
}
function addUserInfo(e) {
  const username = userInput.value;
  github.getUserInfoFromGithub(username)
    .then(response => {
      ui.addUserInfosToUI(response.user);
      reposDiv.innerHTML = "";
      ui.addUserReposToUI(response.repo);
    })
    .catch(err => {
      ui.showAlert("Please enter valid username...");
      console.error(err);
    });
  ui.addLastSearchedUserToUI(username);
  Storage.addLastUserToStorage(username);
  clearInput();
  e.preventDefault();
}
function clearInput() {
  userInput.value = "";
}
function loadAllLastUsersFromStorage() {
  ui.loadAllUsersFromStorage();
}
function removeUser(e) {
  if (e.target.className === "fa-solid fa-trash") {
    ui.deleteUserFromUI(e.target);
    Storage.deleteUserFromStorage(e.target);
  }
}
function clearAllUsers(){
  if(confirm("Do you want to remove all searched users?")){
    ui.clearAllUsersFromUI();
    Storage.clearAllUsersFromStorage();
  }
}