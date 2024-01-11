document.getElementById('github-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchValue = document.getElementById('search').value;
    searchGitHubUsers(searchValue);
  });
  
  function searchGitHubUsers(username) {
    const userEndpoint = `https://api.github.com/search/users?q=${username}`;
    
    fetch(userEndpoint, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => {
      displayUserResults(data.items);
    })
    .catch(error => console.error('Error:', error));
  }
  
  function displayUserResults(users) {
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
    
    userList.innerHTML = '';
    reposList.innerHTML = '';
  
    users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" />
        <p>${user.login}</p>
        <a href="${user.html_url}" target="_blank">Profile</a>
      `;
      userItem.addEventListener('click', function () {
        getUserRepositories(user.login);
      });
      userList.appendChild(userItem);
    });
  }
  
  function getUserRepositories(username) {
    const reposEndpoint = `https://api.github.com/users/${username}/repos`;
    
    fetch(reposEndpoint, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => {
      displayUserRepositories(data);
    })
    .catch(error => console.error('Error:', error));
  }
  
  function displayUserRepositories(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = '';
  
    repos.forEach(repo => {
      const repoItem = document.createElement('li');
      repoItem.textContent = repo.name;
      reposList.appendChild(repoItem);
    });
}
