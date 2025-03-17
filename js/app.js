// Theme toggle functionality
const themeToggle = document.getElementById('checkbox');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

themeToggle.addEventListener('change', switchTheme);

// Section toggles
document.getElementById('include-projects').addEventListener('change', function() {
    document.getElementById('projects-section').style.display = this.checked ? 'block' : 'none';
});

// Add project button
document.getElementById('add-project').addEventListener('click', function() {
    const projectsContainer = document.getElementById('projects-container');
    const projectEntry = document.createElement('div');
    projectEntry.className = 'project-entry';
    projectEntry.innerHTML = `
        <div class="form-group">
            <label>Project Name</label>
            <input type="text" class="project-name" placeholder="Project Name">
        </div>
        <div class="form-group">
            <label>Description</label>
            <input type="text" class="project-description" placeholder="Short description">
        </div>
        <div class="form-group">
            <label>URL</label>
            <input type="url" class="project-url" placeholder="https://github.com/yourusername/repo">
        </div>
        <button type="button" class="remove-project btn-secondary">Remove</button>
    `;
    projectsContainer.appendChild(projectEntry);

    // Add event listener to remove button
    projectEntry.querySelector('.remove-project').addEventListener('click', function() {
        projectsContainer.removeChild(projectEntry);
    });
});

// Generate README button
document.getElementById('generate').addEventListener('click', generateMarkdown);

// Copy Markdown button
document.getElementById('copy-markdown').addEventListener('click', function() {
    const markdownContent = document.getElementById('preview-content').textContent;
    navigator.clipboard.writeText(markdownContent).then(function() {
        alert('Markdown copied to clipboard!');
    });
});

// Download README.md button
document.getElementById('download-markdown').addEventListener('click', function() {
    const markdownContent = document.getElementById('preview-content').textContent;
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Reset form button
document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('profile-form').reset();
    document.getElementById('preview-content').innerHTML = '';
    document.getElementById('projects-section').style.display = 'none';
});

// Generate markdown from form data
function generateMarkdown() {
    let markdown = '';
    const name = document.getElementById('name').value || 'Your Name';
    const title = document.getElementById('title').value || 'Developer';
    const about = document.getElementById('about').value || '';
    const location = document.getElementById('location').value || '';
    const website = document.getElementById('website').value || '';

    // Generate greeting section
    if (document.getElementById('include-greeting').checked) {
        markdown += `# Hi there 👋, I'm ${name}\n`;
        markdown += `### ${title}\n\n`;
    }

    // Generate visitor badge and other badges
    if (document.getElementById('include-visitors').checked) {
        markdown += `![Profile Views](https://komarev.com/ghpvc/?username=YOUR_GITHUB_USERNAME&color=blue)\n\n`;
    }

    // Generate About Me section
    if (document.getElementById('include-about').checked && about) {
        markdown += `## About Me\n${about}\n\n`;
        
        if (location) {
            markdown += `🌍 I'm based in ${location}\n\n`;
        }
        
        if (website) {
            markdown += `🖥️ See my portfolio at [${website}](${website})\n\n`;
        }
    }

    // Generate Social Links section
    const socialLinks = [];
    document.querySelectorAll('.social-checkbox:checked').forEach(checkbox => {
        const platform = checkbox.dataset.platform;
        const username = document.getElementById(platform).value;
        
        if (username) {
            let badgeUrl = '';
            let profileUrl = '';
            
            switch(platform) {
                case 'linkedin':
                    badgeUrl = `https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white`;
                    profileUrl = `https://linkedin.com/in/${username}`;
                    break;
                case 'twitter':
                    badgeUrl = `https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white`;
                    profileUrl = `https://twitter.com/${username}`;
                    break;
                case 'dev':
                    badgeUrl = `https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white`;
                    profileUrl = `https://dev.to/${username}`;
                    break;
                case 'medium':
                    badgeUrl = `https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white`;
                    profileUrl = `https://medium.com/@${username}`;
                    break;
                case 'stackoverflow':
                    badgeUrl = `https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white`;
                    profileUrl = `https://stackoverflow.com/users/${username}`;
                    break;
            }
            
            socialLinks.push(`[![${platform}](${badgeUrl})](${profileUrl})`);
        }
    });
    
    if (socialLinks.length > 0) {
        markdown += `## Connect With Me\n\n`;
        markdown += socialLinks.join(' ') + '\n\n';
    }

    // Generate Tech Stack section
    const techStack = [];
    document.querySelectorAll('.tech-options input:checked').forEach(checkbox => {
        const tech = checkbox.value;
        let badgeUrl = '';
        
        // Map tech values to badge URLs
        switch(tech) {
            // Languages
            case 'javascript':
                badgeUrl = `https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black`;
                break;
            case 'python':
                badgeUrl = `https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white`;
                break;
            case 'java':
                badgeUrl = `https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white`;
                break;
            case 'csharp':
                badgeUrl = `https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white`;
                break;
            case 'cpp':
                badgeUrl = `https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white`;
                break;
            case 'typescript':
                badgeUrl = `https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white`;
                break;
            case 'ruby':
                badgeUrl = `https://img.shields.io/badge/Ruby-CC342D?style=for-the-badge&logo=ruby&logoColor=white`;
                break;
            case 'php':
                badgeUrl = `https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white`;
                break;
            case 'swift':
                badgeUrl = `https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white`;
                break;
            case 'go':
                badgeUrl = `https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white`;
                break;
                
            // Frontend
            case 'react':
                badgeUrl = `https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB`;
                break;
            case 'vue':
                badgeUrl = `https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D`;
                break;
            case 'angular':
                badgeUrl = `https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white`;
                break;
            case 'html5':
                badgeUrl = `https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white`;
                break;
            case 'css3':
                badgeUrl = `https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white`;
                break;
            case 'sass':
                badgeUrl = `https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white`;
                break;
            case 'bootstrap':
                badgeUrl = `https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white`;
                break;
            case 'tailwind':
                badgeUrl = `https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white`;
                break;
                
            // Backend
            case 'nodejs':
                badgeUrl = `https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white`;
                break;
            case 'express':
                badgeUrl = `https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white`;
                break;
            case 'django':
                badgeUrl = `https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white`;
                break;
            case 'flask':
                badgeUrl = `https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white`;
                break;
            case 'spring':
                badgeUrl = `https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white`;
                break;
            case 'dotnet':
                badgeUrl = `https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=dot-net&logoColor=white`;
                break;
            case 'laravel':
                badgeUrl = `https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white`;
                break;
                
            // Database
            case 'mongodb':
                badgeUrl = `https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white`;
                break;
            case 'mysql':
                badgeUrl = `https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white`;
                break;
            case 'postgresql':
                badgeUrl = `https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white`;
                break;
            case 'sqlite':
                badgeUrl = `https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white`;
                break;
            case 'redis':
                badgeUrl = `https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white`;
                break;
            case 'firebase':
                badgeUrl = `https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black`;
                break;
                
            // Tools
            case 'git':
                badgeUrl = `https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white`;
                break;
            case 'github':
                badgeUrl = `https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white`;
                break;
            case 'docker':
                badgeUrl = `https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white`;
                break;
            case 'kubernetes':
                badgeUrl = `https://img.shields.io/badge/kubernetes-326ce5.svg?&style=for-the-badge&logo=kubernetes&logoColor=white`;
                break;
            case 'aws':
                badgeUrl = `https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white`;
                break;
            case 'azure':
                badgeUrl = `https://img.shields.io/badge/Azure_DevOps-0078D7?style=for-the-badge&logo=azure-devops&logoColor=white`;
                break;
            case 'gcp':
                badgeUrl = `https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white`;
                break;
            case 'heroku':
                badgeUrl = `https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white`;
                break;
            case 'netlify':
                badgeUrl = `https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white`;
                break;
            case 'vercel':
                badgeUrl = `https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white`;
                break;
        }
        
        if (badgeUrl) {
            techStack.push(`![${tech}](${badgeUrl})`);
        }
    });
    
    if (techStack.length > 0) {
        markdown += `## Tech Stack\n\n`;
        markdown += techStack.join(' ') + '\n\n';
    }

    // Generate GitHub Stats section
    if (document.getElementById('include-stats').checked) {
        markdown += `## GitHub Stats\n\n`;
        markdown += `![GitHub stats](https://github-readme-stats.vercel.app/api?username=YOUR_GITHUB_USERNAME&show_icons=true&theme=radical)\n\n`;
    }

    // Generate GitHub Streak section
    if (document.getElementById('include-streak').checked) {
        markdown += `## GitHub Streak\n\n`;
        markdown += `[![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=YOUR_GITHUB_USERNAME&theme=dark)](https://git.io/streak-stats)\n\n`;
    }

    // Generate Top Languages section
    if (document.getElementById('include-languages').checked) {
        markdown += `## Top Languages\n\n`;
        markdown += `![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR_GITHUB_USERNAME&layout=compact&theme=radical)\n\n`;
    }

    // Generate Recent Projects section
    if (document.getElementById('include-projects').checked) {
        markdown += `## Recent Projects\n\n`;
        
        document.querySelectorAll('.project-entry').forEach(entry => {
            const projectName = entry.querySelector('.project-name').value;
            const projectDesc = entry.querySelector('.project-description').value;
            const projectUrl = entry.querySelector('.project-url').value;
            
            if (projectName && projectUrl) {
                markdown += `### [${projectName}](${projectUrl})\n\n`;
                if (projectDesc) {
                    markdown += `${projectDesc}\n\n`;
                }
            }
        });
    }

    // Generate Support section
    if (document.getElementById('include-support').checked) {
        markdown += `## Support Me\n\n`;
        
        const buymeacoffee = document.getElementById('buymeacoffee').value;
        const patreon = document.getElementById('patreon').value;
        const customSupport = document.getElementById('custom-support').value;
        
        if (buymeacoffee) {
            markdown += `<a href="https://www.buymeacoffee.com/${buymeacoffee}"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="200" /></a>\n\n`;
        }
        
        if (patreon) {
            markdown += `<a href="https://www.patreon.com/${patreon}"><img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" width="200" /></a>\n\n`;
        }
        
        if (customSupport) {
            markdown += `${customSupport}\n\n`;
        }
    }

    // Add README footer
    markdown += `---\n\n`;
    markdown += `*Feel free to reach out and connect with me! 👋*\n`;

    // Update preview
    document.getElementById('preview-content').textContent = markdown;
}