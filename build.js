const fs = require('fs');

// Load project data
const data = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));

// Generate project HTML
function generateProjects(sections) {
    return sections.map(section => `
            <section class="projects">
                <h2 class="section-header">${section.title}</h2>
                ${section.description ? `<p class="section-desc">${section.description}</p>` : ''}
                <div class="projects-list">
                    ${section.projects.map(project => `
                    <article class="project">
                        <div class="project-header">
                            <div class="project-main">
                                <h3 class="project-name">${project.name}</h3>
                                <p class="project-desc">${project.description}</p>
                                <div class="project-tags">
                                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                            </div>
                            <div class="project-links">
                                ${project.demo ? `<a href="${project.demo}" class="project-link primary" target="_blank">site</a>` : ''}
                                <a href="${project.source}" class="project-link" target="_blank">src</a>
                            </div>
                        </div>
                        ${project.image ? `<div class="project-image">
                            <img src="${project.image}" alt="${project.name} preview">
                        </div>` : ''}
                    </article>`).join('\n')}
                </div>
            </section>`).join('\n');
}

// HTML template
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="ByMykel - Open source developer building tools and APIs">
    <title>ByMykel</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="header-inner">
                <a href="/" class="logo">bymykel</a>
                <nav class="nav">
                    <a href="https://github.com/ByMykel" target="_blank">github</a>
                    <button class="theme-toggle" aria-label="Toggle theme">
                        <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                        </svg>
                        <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    </button>
                </nav>
            </div>
        </header>

        <main>
            <section class="hero">
                <p class="hero-prompt">$ whoami</p>
                <h1 class="hero-title">Building things <span class="highlight">for the web</span></h1>
                <p class="hero-bio">Web developer who loves building things that are fun and solve problems — especially for <span>Counter-Strike 2</span><span class="cursor"></span></p>
            </section>

${generateProjects(data.sections)}
        </main>

        <footer class="footer">
            <p>$ echo "open source on <a href="https://github.com/ByMykel/ByMykel.github.io" target="_blank">github</a>"</p>
        </footer>
    </div>

    <script src="js/main.js"></script>
</body>
</html>`;

// Write output
fs.writeFileSync('index.html', html);
console.log('✓ Generated index.html');
