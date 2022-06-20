document.addEventListener('DOMContentLoaded', () => {

    const submitForm = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const repoList = document.getElementById('repos-list');

    
    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('search').value;

        if (searchInput){

            fetch (`https://api.github.com/search/users?q=${searchInput}`, {
                method: 'GET',
                headers: {Accept: 'application/vnd.github.v3+json'}
            })
            .then ((r) => r.json())
            .then ((userData) => {
                
                for (const matches in userData.items){
                    
                    const userLi = document.createElement('li');
                    const userLoginElement = document.createElement('h1');
                    userLoginElement.innerText = userData.items[matches].login;
                    const userAvatarElement = document.createElement('img');
                    userAvatarElement.src = userData.items[matches].avatar_url;
                    const userLinkElement = document.createElement('a');
                    userLinkElement.href = userData.items[matches].html_url;
                    userLinkElement.innerText = `Visit ${userLoginElement.innerText}'s profile`;
                    const line = document.createElement('hr');
                    const lineBreak = document.createElement('br');
                    const repoURL = userData.items[matches].repos_url;
                    console.log(repoURL);
                    userLi.append(userLoginElement, userAvatarElement, lineBreak, userLinkElement, line);

                    const repoButton = document.createElement('button');
                    repoButton.name = 'button';
                    repoButton.type = 'button';
                    repoButton.innerText = `Load ${userLoginElement.innerText}'s Repos`;
                    userLi.append(repoButton);
                    userList.appendChild(userLi);
                    repoButton.addEventListener('click', () =>{
                        fetch(repoURL)
                        .then ((r) => r.json())
                        .then ((repoData) => {
                            for (const key in repoData){
                                
                                const li = document.createElement('li');
                                const repoName = document.createElement('h4');
                                repoName.innerText = repoData[key].name;
                                const description = document.createElement('p');
                                description.innerText = repoData[key].description;
                                const linkURL = document.createElement('a');
                                linkURL.href = repoData[key].html_url;
                                linkURL.innerText = `View on Github`;

                                li.append(repoName, description, linkURL);
                                repoList.appendChild(li);


                            }
                        })
                        .catch((error) =>{
                            alert(error.message);
                        })


                    })
                }
            })
            .catch((error)=> {
                alert(error.message);
            })
        }
        else{
            alert('Search field is blank');
        }
    })
})
