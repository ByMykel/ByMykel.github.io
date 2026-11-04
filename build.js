const fs = require('fs');

// Load project data
const data = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));

const pad = n => String(n).padStart(2, '0');

const arrow = `<svg class="arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9L9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`;

function layoutCards(projects) {
    const out = [];
    let run = [];
    const flush = () => {
        run.forEach((p, k) => {
            const alone = k === run.length - 1 && run.length % 2 === 1;
            out.push({ ...p, kind: alone ? 'wide' : 'half', left: !alone && k % 2 === 0 });
        });
        run = [];
    };
    projects.forEach(p => {
        if (p.image) { flush(); out.push({ ...p, kind: 'media' }); }
        else run.push(p);
    });
    flush();
    return out;
}

function generateCard(project, n) {
    const cls = ['card', `card-${project.kind}`, project.left ? 'card-left' : ''].filter(Boolean).join(' ');
    return `
                    <article class="${cls}">
                        <div class="card-text">
                            <div class="card-meta">
                                <span class="label">${pad(n)}</span>
                                ${project.wip ? '<span class="chip">In progress</span>' : ''}
                            </div>
                            <h3 class="card-name">${project.name}</h3>
                            <p class="card-desc">${project.description}</p>
                            <div class="card-links">
                                ${project.demo ? `<a href="${project.demo}" class="link" target="_blank" rel="noopener">Visit site ${arrow}</a>` : ''}
                                ${project.source ? `<a href="${project.source}" class="link" target="_blank" rel="noopener">Source ${arrow}</a>` : ''}
                            </div>
                        </div>
                        ${project.image ? `<figure class="card-image">
                            <img src="${project.image}" alt="${project.name} preview" loading="lazy">
                        </figure>` : ''}
                    </article>`;
}

function generateProjects(sections) {
    return sections.map((section, i) => {
        const count = section.projects.length;
        return `
            <section class="block${section.tone === 'dark' ? ' tone-dark' : ''}" id="${section.id}">
              <div class="frame">
                <div class="block-head">
                    <div class="block-meta">
                        <span class="label">${pad(i + 1)} — ${section.title}</span>
                        <span class="label">${count} project${count === 1 ? '' : 's'}</span>
                    </div>
                    <h2 class="block-title">${section.title}</h2>
                    ${section.description ? `<p class="block-desc">${section.description}</p>` : ''}
                </div>
                <div class="cards">${layoutCards(section.projects).map((p, j) => generateCard(p, j + 1)).join('')}
                </div>
              </div>
            </section>`;
    }).join('\n');
}

// HTML template
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="ByMykel - Open source developer building tools and APIs">
    <title>ByMykel</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="header">
        <div class="frame header-inner">
            <a href="/" class="logo">ByMykel</a>
            <nav class="nav">
                <a href="#featured" class="label nav-link">Projects</a>
                <a href="https://github.com/ByMykel" class="label nav-link" target="_blank" rel="noopener">GitHub</a>
                <a href="mailto:hi@bymykel.com" class="button">Contact</a>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero frame">
            <h1 class="hero-title">Building things for the web</h1>
            <p class="hero-bio">Web developer who loves building things that are fun and solve problems — especially for Counter-Strike&nbsp;2.</p>
            <div class="hero-actions">
                <a href="mailto:hi@bymykel.com" class="button">hi@bymykel.com</a>
                <a href="https://github.com/ByMykel" class="button button-ghost" target="_blank" rel="noopener">GitHub ${arrow}</a>
            </div>
        </section>
${generateProjects(data.sections)}
    </main>

    <script src="js/main.js"></script>
</body>
</html>`;

// Write output
fs.writeFileSync('index.html', html);
console.log('✓ Generated index.html');
