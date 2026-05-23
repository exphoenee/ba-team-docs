(function() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    document.documentElement.classList.toggle('dark-mode', isDark);
})();

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.toggle('dark-mode', document.documentElement.classList.contains('dark-mode'));

    const content = document.getElementById('content');
    const breadcrumb = document.getElementById('breadcrumb');
    const themeToggle = document.getElementById('themeToggle');
    const sidebar = document.getElementById('sidebar');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const loader = document.getElementById('loader');
    const navLinks = document.querySelectorAll('.nav-links a');

    const renderer = new marked.Renderer();
    const originalCodeRenderer = renderer.code.bind(renderer);

    renderer.code = (token) => {
        const code = token.text;
        const lang = token.lang;

        if (lang === 'mermaid') {
            return `<div class="mermaid-container"><pre class="mermaid">${code}</pre></div>`;
        }
        if (lang && Prism.languages[lang]) {
            const highlighted = Prism.highlight(code, Prism.languages[lang], lang);
            return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`;
        }
        return `<pre><code>${code}</code></pre>`;
    };

    marked.setOptions({
        renderer: renderer,
        breaks: true,
        gfm: true
    });

    mermaid.initialize({
        startOnLoad: false,
        theme: document.body.classList.contains('dark-mode') ? 'dark' : 'default',
        securityLevel: 'loose',
        themeVariables: {
            fontSize: '18px',
            fontFamily: 'Inter'
        }
    });

    const routes = {
        'home': './README.md',
        'agents': './.claude/agents/README.md',
        'skill-ba': './.claude/skills/ba/README.md',
        'skill-ba-en': './.claude/skills/ba/README.en.md',
        'skill-business-analyst': './.claude/skills/business-analyst/README.md',
        'skill-business-analyst-en': './.claude/skills/business-analyst/README.en.md',
        'skill-convert': './.claude/skills/convert/README.md',
        'skill-convert-en': './.claude/skills/convert/README.en.md',
        'skill-memory-handler': './.claude/skills/memory-handler/README.md',
        'skill-memory-handler-en': './.claude/skills/memory-handler/README.en.md',
        'skill-mermaid-diagrams': './.claude/skills/mermaid-diagrams/README.md',
        'skill-mermaid-diagrams-en': './.claude/skills/mermaid-diagrams/README.en.md',
        'skill-session-loader': './.claude/skills/session-loader/README.md',
        'skill-session-loader-en': './.claude/skills/session-loader/README.en.md',
        'skill-spec-builder': './.claude/skills/spec-builder/README.md',
        'skill-spec-builder-en': './.claude/skills/spec-builder/README.en.md',
        'handbook': './HANDBOOK.md',
        'improvements': './devdocs/improvements.md',
        'troubleshooting': './devdocs/troubleshooting.md'
    };

    const skillsToggle = document.getElementById('skillsToggle');
    const skillsSubmenu = document.getElementById('skillsSubmenu');
    const hasSubmenu = document.querySelector('.has-submenu');

    skillsToggle.addEventListener('click', (e) => {
        e.preventDefault();
        skillsSubmenu.classList.toggle('open');
        hasSubmenu.classList.toggle('open');
    });

    async function loadPage(hash) {
        const page = hash.replace('#', '') || 'home';

        if (page.startsWith('skill-')) {
            skillsSubmenu.classList.add('open');
            hasSubmenu.classList.add('open');
        }

        const url = routes[page];

        if (!url) {
            content.innerHTML = '<h1>404</h1><p>Oldal nem található.</p>';
            return;
        }

        loader.classList.add('active');
        content.style.opacity = '0';

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to load');
            let markdown = await response.text();

            const html = marked.parse(markdown);
            content.innerHTML = html;
            breadcrumb.textContent = page.charAt(0).toUpperCase() + page.slice(1);

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${page}`) {
                    link.classList.add('active');
                }
            });

            setTimeout(async () => {
                if (window.mermaid) {
                    await mermaid.run({
                        querySelector: '.mermaid'
                    });
                }
            }, 100);

            Prism.highlightAllUnder(content);

        } catch (error) {
            let errorMsg = `Nem sikerült betölteni a dokumentációt: ${url}`;
            if (window.location.protocol === 'file:') {
                errorMsg += '<br><br><strong>Hiba:</strong> Helyi fájlrendszerről (file://) futtatod az oldalt. A böngészők biztonsági okokból letiltják a fájlok betöltését. <br>Kérlek használd a <code>python -m http.server</code> parancsot vagy publikáld GitHub-ra!';
            }
            content.innerHTML = `<h1>Hiba</h1><p>${errorMsg}</p>`;
            console.error(error);
        } finally {
            loader.classList.remove('active');
            content.style.opacity = '1';
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('open');
            }
        }
    }

    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.querySelector('i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    themeToggle.querySelector('span').textContent = isDark ? 'Sötét mód' : 'Világos mód';

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const nowDark = document.body.classList.contains('dark-mode');

        localStorage.setItem('theme', nowDark ? 'dark' : 'light');

        themeToggle.querySelector('i').className = nowDark ? 'fas fa-moon' : 'fas fa-sun';
        themeToggle.querySelector('span').textContent = nowDark ? 'Sötét mód' : 'Világos mód';

        mermaid.initialize({
            startOnLoad: false,
            theme: nowDark ? 'dark' : 'default',
            securityLevel: 'loose',
            suppressErrorHighlighting: true,
            themeVariables: {
                fontSize: '18px',
                fontFamily: 'Inter'
            }
        });
        loadPage(window.location.hash);
    });

    mobileMenu.addEventListener('click', () => sidebar.classList.add('open'));
    mobileClose.addEventListener('click', () => sidebar.classList.remove('open'));

    window.addEventListener('hashchange', () => loadPage(window.location.hash));

    const reverseRoutes = {};
    for (const [key, path] of Object.entries(routes)) {
        const normalized = path.replace(/^\.\//, '');
        reverseRoutes[normalized] = key;
    }

    function resolveInternalLink(href, currentPageUrl) {
        if (!href || href.startsWith('http') || href.startsWith('mailto')) return null;

        const [path, anchor] = href.split('#');

        if (!path || !path.endsWith('.md')) return null;

        const base = currentPageUrl.replace(/[^/]+$/, '');
        const resolved = new URL(path, 'http://x/' + base).pathname.replace(/^\//, '');
        const routeKey = reverseRoutes[resolved] || null;

        return routeKey ? { routeKey, anchor: anchor || null } : null;
    }

    content.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;
        const href = a.getAttribute('href');
        if (!href) return;

        const currentPage = window.location.hash.replace('#', '') || 'home';
        const currentUrl = routes[currentPage] ? routes[currentPage].replace(/^\.\//, '') : '';

        const match = resolveInternalLink(href, currentUrl);
        if (match) {
            e.preventDefault();
            window.location.hash = match.routeKey;
            if (match.anchor) {
                setTimeout(() => {
                    const el = document.getElementById(match.anchor);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        }
    });

    loadPage(window.location.hash);

    var currentAudio = null;

    function resetIcon(audio) {
        var btn = document.querySelector('.audio-button[data-audio="' + audio.id + '"]');
        if (btn) btn.querySelector('i').className = 'fas fa-play';
    }

    document.querySelectorAll('.audio-button').forEach(function(btn) {
        var audio = document.getElementById(btn.dataset.audio);
        var icon = btn.querySelector('i');

        btn.addEventListener('click', function() {
            if (currentAudio === audio && !audio.paused) {
                audio.pause();
                icon.className = 'fas fa-play';
                currentAudio = null;
                return;
            }

            if (currentAudio && currentAudio !== audio) {
                resetIcon(currentAudio);
                currentAudio.pause();
            }

            icon.className = 'fas fa-pause';
            currentAudio = audio;

            var p = audio.play();
            if (p) p.catch(function() { icon.className = 'fas fa-play'; currentAudio = null; });
        });

        audio.addEventListener('ended', function() {
            icon.className = 'fas fa-play';
            if (currentAudio === audio) currentAudio = null;
        });
    });
});
