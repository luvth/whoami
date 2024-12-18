document.getElementById('revealLink').addEventListener('click', async function(e) {
    e.preventDefault();
    const content = document.querySelector('.content');
    
    content.classList.add('hidden');
    
    try {
        // Fetch GitHub user data
        const userResponse = await fetch('https://api.github.com/users/luvth');
        const userData = await userResponse.json();

        // Fetch repositories data
        const reposResponse = await fetch('https://api.github.com/users/luvth/repos');
        const reposData = await reposResponse.json();

        setTimeout(() => {
            content.innerHTML = `
                <div class="github-section">
                    <img src="${userData.avatar_url}" alt="GitHub Profile" class="profile-image">
                    <div class="github-info">
                        <h2>${userData.name || userData.login}</h2>
                        <p>${userData.bio || 'GitHub Developer'}</p>
                        <div class="github-stats">
                            <div class="stat">
                                <strong>Repos</strong>
                                <div>${reposData.length}</div>
                            </div>
                            <div class="stat">
                                <strong>Followers</strong>
                                <div>${userData.followers}</div>
                            </div>
                            <div class="stat">
                                <strong>Following</strong>
                                <div>${userData.following}</div>
                            </div>
                        </div>
                        <a href="https://github.com/luvth" class="github-link" target="_blank">View GitHub Profile</a>
                    </div>
                </div>
            `;
            
            content.classList.remove('hidden');
        }, 600);
    } catch (error) {
        setTimeout(() => {
            content.innerHTML = `
                <div class="error">
                    <p>Unable to fetch GitHub profile. Please try again later.</p>
                </div>
            `;
            content.classList.remove('hidden');
        }, 600);
        console.error('Error fetching GitHub data:', error);
    }
});