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
        "home": "./page/README.md",
        "home-en": "./page/README.en.md",
        "handbook": "./page/HANDBOOK/index.md",
        "handbook-en": "./page/HANDBOOK/index.en.md",
        "handbook-ch01": "./page/HANDBOOK/ch01-intro.md",
        "handbook-ch01-en": "./page/HANDBOOK/ch01-intro.en.md",
        "handbook-ch02": "./page/HANDBOOK/ch02-ai-team.md",
        "handbook-ch02-en": "./page/HANDBOOK/ch02-ai-team.en.md",
        "handbook-ch03": "./page/HANDBOOK/ch03-performance.md",
        "handbook-ch03-en": "./page/HANDBOOK/ch03-performance.en.md",
        "handbook-ch04": "./page/HANDBOOK/ch04-installation.md",
        "handbook-ch04-en": "./page/HANDBOOK/ch04-installation.en.md",
        "handbook-ch05": "./page/HANDBOOK/ch05-folder-structure.md",
        "handbook-ch05-en": "./page/HANDBOOK/ch05-folder-structure.en.md",
        "handbook-ch06": "./page/HANDBOOK/ch06-commands.md",
        "handbook-ch06-en": "./page/HANDBOOK/ch06-commands.en.md",
        "handbook-ch07": "./page/HANDBOOK/ch07-workflow.md",
        "handbook-ch07-en": "./page/HANDBOOK/ch07-workflow.en.md",
        "handbook-ch08": "./page/HANDBOOK/ch08-documents.md",
        "handbook-ch08-en": "./page/HANDBOOK/ch08-documents.en.md",
        "handbook-ch09": "./page/HANDBOOK/ch09-identifiers.md",
        "handbook-ch09-en": "./page/HANDBOOK/ch09-identifiers.en.md",
        "handbook-ch10": "./page/HANDBOOK/ch10-memory.md",
        "handbook-ch10-en": "./page/HANDBOOK/ch10-memory.en.md",
        "handbook-ch11": "./page/HANDBOOK/ch11-file-conversion.md",
        "handbook-ch11-en": "./page/HANDBOOK/ch11-file-conversion.en.md",
        "handbook-ch12": "./page/HANDBOOK/ch12-audio-transcription.md",
        "handbook-ch12-en": "./page/HANDBOOK/ch12-audio-transcription.en.md",
        "handbook-ch13": "./page/HANDBOOK/ch13-special-cases.md",
        "handbook-ch13-en": "./page/HANDBOOK/ch13-special-cases.en.md",
        "handbook-ch14": "./page/HANDBOOK/ch14-diagrams.md",
        "handbook-ch14-en": "./page/HANDBOOK/ch14-diagrams.en.md",
        "handbook-ch15": "./page/HANDBOOK/ch15-notifications.md",
        "handbook-ch15-en": "./page/HANDBOOK/ch15-notifications.en.md",
        "handbook-ch16": "./page/HANDBOOK/ch16-agents.md",
        "handbook-ch16-en": "./page/HANDBOOK/ch16-agents.en.md",
        "handbook-ch17": "./page/HANDBOOK/ch17-compliance.md",
        "handbook-ch17-en": "./page/HANDBOOK/ch17-compliance.en.md",
        "handbook-ch18": "./page/HANDBOOK/ch18-faq.md",
        "handbook-ch18-en": "./page/HANDBOOK/ch18-faq.en.md",
        "handbook-ch19": "./page/HANDBOOK/ch19-troubleshooting.md",
        "handbook-ch19-en": "./page/HANDBOOK/ch19-troubleshooting.en.md",
        "handbook-ch20": "./page/HANDBOOK/ch20-permissions.md",
        "handbook-ch20-en": "./page/HANDBOOK/ch20-permissions.en.md",
        "skill-ba": "./page/skills/ba.md",
        "skill-ba-en": "./page/skills/ba.en.md",
        "skill-business-analyst": "./page/skills/business-analyst.md",
        "skill-business-analyst-en": "./page/skills/business-analyst.en.md",
        "skill-check-state": "./page/skills/check-state.md",
        "skill-check-state-en": "./page/skills/check-state.en.md",
        "skill-convert": "./page/skills/convert.md",
        "skill-convert-en": "./page/skills/convert.en.md",
        "skill-discovery": "./page/skills/discovery.md",
        "skill-discovery-en": "./page/skills/discovery.en.md",
        "skill-extractor": "./page/skills/extractor.md",
        "skill-extractor-en": "./page/skills/extractor.en.md",
        "skill-help": "./page/skills/help.md",
        "skill-help-en": "./page/skills/help.en.md",
        "skill-memory-handler": "./page/skills/memory-handler.md",
        "skill-memory-handler-en": "./page/skills/memory-handler.en.md",
        "skill-mermaid-diagrams": "./page/skills/mermaid-diagrams.md",
        "skill-mermaid-diagrams-en": "./page/skills/mermaid-diagrams.en.md",
        "skill-rca": "./page/skills/rca.md",
        "skill-rca-en": "./page/skills/rca.en.md",
        "skill-self-dev": "./page/skills/self-dev.md",
        "skill-self-dev-en": "./page/skills/self-dev.en.md",
        "skill-self-improve": "./page/skills/self-improve.md",
        "skill-self-improve-en": "./page/skills/self-improve.en.md",
        "skill-session-loader": "./page/skills/session-loader.md",
        "skill-session-loader-en": "./page/skills/session-loader.en.md",
        "skill-validate": "./page/skills/validate.md",
        "skill-validate-en": "./page/skills/validate.en.md",
        "agents": "./page/agents/README.md",
        "agents-en": "./page/agents/README.en.md",
        "agent-ba-document-agent": "./page/agents/ba-document-agent.md",
        "agent-ba-document-agent-en": "./page/agents/ba-document-agent.en.md",
        "agent-ba-orchestrator": "./page/agents/ba-orchestrator.md",
        "agent-ba-orchestrator-en": "./page/agents/ba-orchestrator.en.md",
        "agent-discovery-agent": "./page/agents/discovery-agent.md",
        "agent-discovery-agent-en": "./page/agents/discovery-agent.en.md",
        "agent-extraction-agent": "./page/agents/extraction-agent.md",
        "agent-extraction-agent-en": "./page/agents/extraction-agent.en.md",
        "agent-memory-agent": "./page/agents/memory-agent.md",
        "agent-memory-agent-en": "./page/agents/memory-agent.en.md",
        "agent-rca-agent": "./page/agents/rca-agent.md",
        "agent-rca-agent-en": "./page/agents/rca-agent.en.md",
        "agent-self-care-agent": "./page/agents/self-care-agent.md",
        "agent-self-care-agent-en": "./page/agents/self-care-agent.en.md",
        "agent-validation-agent": "./page/agents/validation-agent.md",
        "agent-validation-agent-en": "./page/agents/validation-agent.en.md",
        "release-v1-2-0": "./page/release-notes/v1-2-0.md",
        "release-v1-1-0": "./page/release-notes/v1-1-0.md",
        "release-v1-0-1": "./page/release-notes/v1-0-1.md",
        "release-v1-0-0": "./page/release-notes/v1-0-0.md",
        "improvements": "./page/improvements.md"
};

    // Generic submenu toggle — works for any .has-submenu regardless of count or ID
    document.querySelectorAll('.has-submenu > a').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const menu = toggle.closest('.has-submenu');
            const submenu = menu.querySelector('.submenu');
            if (submenu) {
                submenu.classList.toggle('open');
                menu.classList.toggle('open');
            }
        });
    });

    async function loadPage(hash) {
        const page = hash.replace('#', '') || 'home';

        // Open the parent submenu for the current page
        const activeLink = document.querySelector(`.nav-links a[href="#${page}"]`);
        if (activeLink) {
            const submenu = activeLink.closest('.submenu');
            if (submenu) {
                submenu.classList.add('open');
                const menu = submenu.closest('.has-submenu');
                if (menu) menu.classList.add('open');
            }
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

    var githubModal = document.getElementById('github-modal');
    var githubBtn = document.getElementById('githubBtn');
    var githubClose = document.getElementById('github-modal-close');
    var githubBackdrop = document.getElementById('github-modal-backdrop');
    var githubForm = document.getElementById('github-modal-form');

    function openGithubModal() {
        githubForm.reset();
        var fsSuccess = githubModal.querySelector('[data-fs-success]');
        if (fsSuccess) fsSuccess.style.display = 'none';
        var fsError = githubModal.querySelector('[data-fs-error]');
        if (fsError) fsError.style.display = 'none';
        githubModal.classList.remove('modal-hidden');
    }

    function closeGithubModal() {
        githubModal.classList.add('modal-hidden');
    }

    githubBtn.addEventListener('click', openGithubModal);
    githubClose.addEventListener('click', closeGithubModal);
    githubBackdrop.addEventListener('click', closeGithubModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeGithubModal();
    });

    githubForm.addEventListener('submit', function() {
        closeGithubModal();
    });

    if (window.formspree) {
        formspree('initForm', { formElement: '#github-modal-form', formId: 'xjgzokva' });
    } else {
        window.formspree = window.formspree || function() { (formspree.q = formspree.q || []).push(arguments); };
        formspree('initForm', { formElement: '#github-modal-form', formId: 'xjgzokva' });
    }
});
