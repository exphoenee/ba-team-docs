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
        'home-en': './README.en.md',
        'agents': './.claude/agents/docs/README.md',
        'agents-en': './.claude/agents/docs/README.en.md',
        'agent-ba-orchestrator': './.claude/agents/docs/ba-orchestrator.md',
        'agent-ba-orchestrator-en': './.claude/agents/docs/ba-orchestrator.en.md',
        'agent-extraction-agent': './.claude/agents/docs/extraction-agent.md',
        'agent-extraction-agent-en': './.claude/agents/docs/extraction-agent.en.md',
        'agent-ba-document-agent': './.claude/agents/docs/ba-document-agent.md',
        'agent-ba-document-agent-en': './.claude/agents/docs/ba-document-agent.en.md',
        'agent-discovery-agent': './.claude/agents/docs/discovery-agent.md',
        'agent-discovery-agent-en': './.claude/agents/docs/discovery-agent.en.md',
        'agent-memory-agent': './.claude/agents/docs/memory-agent.md',
        'agent-memory-agent-en': './.claude/agents/docs/memory-agent.en.md',
        'agent-rca-agent': './.claude/agents/docs/rca-agent.md',
        'agent-rca-agent-en': './.claude/agents/docs/rca-agent.en.md',
        'agent-validation-agent': './.claude/agents/docs/validation-agent.md',
        'agent-validation-agent-en': './.claude/agents/docs/validation-agent.en.md',
        'agent-self-care-agent': './.claude/agents/docs/self-care-agent.md',
        'agent-self-care-agent-en': './.claude/agents/docs/self-care-agent.en.md',
        'skill-self-improve': './.claude/skills/self-improve/README.md',
        'skill-self-improve-en': './.claude/skills/self-improve/README.en.md',
        'skill-ba': './.claude/skills/ba/README.md',
        'skill-ba-en': './.claude/skills/ba/README.en.md',
        'skill-business-analyst': './.claude/skills/business-analyst/README.md',
        'skill-business-analyst-en': './.claude/skills/business-analyst/README.en.md',
        'skill-check-state': './.claude/skills/check-state/README.md',
        'skill-check-state-en': './.claude/skills/check-state/README.en.md',
        'skill-convert': './.claude/skills/convert/README.md',
        'skill-convert-en': './.claude/skills/convert/README.en.md',
        'skill-discovery': './.claude/skills/discovery/README.md',
        'skill-discovery-en': './.claude/skills/discovery/README.en.md',
        'skill-help': './.claude/skills/help/README.md',
        'skill-help-en': './.claude/skills/help/README.en.md',
        'skill-memory-handler': './.claude/skills/memory-handler/README.md',
        'skill-memory-handler-en': './.claude/skills/memory-handler/README.en.md',
        'skill-mermaid-diagrams': './.claude/skills/mermaid-diagrams/README.md',
        'skill-mermaid-diagrams-en': './.claude/skills/mermaid-diagrams/README.en.md',
        'skill-rca': './.claude/skills/rca/README.md',
        'skill-rca-en': './.claude/skills/rca/README.en.md',
        'skill-self-dev': './.claude/skills/self-dev/README.md',
        'skill-self-dev-en': './.claude/skills/self-dev/README.en.md',
        'skill-session-loader': './.claude/skills/session-loader/README.md',
        'skill-session-loader-en': './.claude/skills/session-loader/README.en.md',
        'skill-extractor': './.claude/skills/extractor/README.md',
        'skill-extractor-en': './.claude/skills/extractor/README.en.md',
        'skill-validate': './.claude/skills/validate/README.md',
        'skill-validate-en': './.claude/skills/validate/README.en.md',
        'handbook': './HANDBOOK/index.md',
        'handbook-en': './HANDBOOK/index.en.md',
        'handbook-ch01': './HANDBOOK/ch01-intro.md',
        'handbook-ch01-en': './HANDBOOK/ch01-intro.en.md',
        'handbook-ch02': './HANDBOOK/ch02-ai-team.md',
        'handbook-ch02-en': './HANDBOOK/ch02-ai-team.en.md',
        'handbook-ch03': './HANDBOOK/ch03-installation.md',
        'handbook-ch03-en': './HANDBOOK/ch03-installation.en.md',
        'handbook-ch04': './HANDBOOK/ch04-folder-structure.md',
        'handbook-ch04-en': './HANDBOOK/ch04-folder-structure.en.md',
        'handbook-ch05': './HANDBOOK/ch05-commands.md',
        'handbook-ch05-en': './HANDBOOK/ch05-commands.en.md',
        'handbook-ch06': './HANDBOOK/ch06-workflow.md',
        'handbook-ch06-en': './HANDBOOK/ch06-workflow.en.md',
        'handbook-ch07': './HANDBOOK/ch07-documents.md',
        'handbook-ch07-en': './HANDBOOK/ch07-documents.en.md',
        'handbook-ch08': './HANDBOOK/ch08-identifiers.md',
        'handbook-ch08-en': './HANDBOOK/ch08-identifiers.en.md',
        'handbook-ch09': './HANDBOOK/ch09-memory.md',
        'handbook-ch09-en': './HANDBOOK/ch09-memory.en.md',
        'handbook-ch10': './HANDBOOK/ch10-file-conversion.md',
        'handbook-ch10-en': './HANDBOOK/ch10-file-conversion.en.md',
        'handbook-ch11': './HANDBOOK/ch11-special-cases.md',
        'handbook-ch11-en': './HANDBOOK/ch11-special-cases.en.md',
        'handbook-ch12': './HANDBOOK/ch12-diagrams.md',
        'handbook-ch12-en': './HANDBOOK/ch12-diagrams.en.md',
        'handbook-ch13': './HANDBOOK/ch13-notifications.md',
        'handbook-ch13-en': './HANDBOOK/ch13-notifications.en.md',
        'handbook-ch14': './HANDBOOK/ch14-agents.md',
        'handbook-ch14-en': './HANDBOOK/ch14-agents.en.md',
        'handbook-ch15': './HANDBOOK/ch15-compliance.md',
        'handbook-ch15-en': './HANDBOOK/ch15-compliance.en.md',
        'handbook-ch16': './HANDBOOK/ch16-faq.md',
        'handbook-ch16-en': './HANDBOOK/ch16-faq.en.md',
        'handbook-ch17': './HANDBOOK/ch17-troubleshooting.md',
        'handbook-ch17-en': './HANDBOOK/ch17-troubleshooting.en.md',
        'handbook-ch18': './HANDBOOK/ch18-performance.md',
        'handbook-ch18-en': './HANDBOOK/ch18-performance.en.md',
        'handbook-ch19-audio': './HANDBOOK/ch19-audio-transcription.md',
        'handbook-ch19-audio-en': './HANDBOOK/ch19-audio-transcription.en.md',
        'release-v1-2-0': './devdocs/release-notes/v1-2-0.md',
        'release-v1-1-0': './devdocs/release-notes/v1-1-0.md',
        'release-v1-0-1': './devdocs/release-notes/v1-0-1.md',
        'release-v1-0-0': './devdocs/release-notes/v1-0-0.md',
        'improvements': './devdocs/improvements.md'
    };

    const agentsToggle = document.getElementById('agentsToggle');
    const agentsSubmenu = document.getElementById('agentsSubmenu');
    const agentsMenu = agentsToggle.closest('.has-submenu');

    agentsToggle.addEventListener('click', (e) => {
        e.preventDefault();
        agentsSubmenu.classList.toggle('open');
        agentsMenu.classList.toggle('open');
    });

    const skillsToggle = document.getElementById('skillsToggle');
    const skillsSubmenu = document.getElementById('skillsSubmenu');
    const skillsMenu = skillsToggle.closest('.has-submenu');

    skillsToggle.addEventListener('click', (e) => {
        e.preventDefault();
        skillsSubmenu.classList.toggle('open');
        skillsMenu.classList.toggle('open');
    });

    const handbookToggle = document.getElementById('handbookToggle');
    const handbookSubmenu = document.getElementById('handbookSubmenu');
    const handbookMenu = handbookToggle.closest('.has-submenu');

    handbookToggle.addEventListener('click', (e) => {
        e.preventDefault();
        handbookSubmenu.classList.toggle('open');
        handbookMenu.classList.toggle('open');
    });

    const releaseToggle = document.getElementById('releaseToggle');
    const releaseSubmenu = document.getElementById('releaseSubmenu');
    const releaseMenu = releaseToggle.closest('.has-submenu');

    releaseToggle.addEventListener('click', (e) => {
        e.preventDefault();
        releaseSubmenu.classList.toggle('open');
        releaseMenu.classList.toggle('open');
    });

    async function loadPage(hash) {
        const page = hash.replace('#', '') || 'home';

        if (page.startsWith('agent-') || page === 'agents' || page === 'agents-en') {
            agentsSubmenu.classList.add('open');
            agentsMenu.classList.add('open');
        }

        if (page.startsWith('skill-')) {
            skillsSubmenu.classList.add('open');
            skillsMenu.classList.add('open');
        }

        if (page.startsWith('handbook')) {
            handbookSubmenu.classList.add('open');
            handbookMenu.classList.add('open');
        }

        if (page.startsWith('release-')) {
            releaseSubmenu.classList.add('open');
            releaseMenu.classList.add('open');
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
