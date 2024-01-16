document.addEventListener('DOMContentLoaded', function() {
  let form = document.getElementById('github-form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let search = document.getElementById('search').value;
    // Remove spaces in between when searching for two names
    let realName = search.split(' ').join('');

    fetch('https://api.github.com/users/' + realName)
      .then((response) => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        let repoLink = `<a target="_blank" href="https://github.com/${realName}"><img src="${data.avatar_url}" alt="User Avatar" placeholder="open my repos"></a>`;
        
        document.getElementById('response').innerHTML = repoLink;
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  });
});
