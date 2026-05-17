# BA Team – Be the Boss of a 4-member AI Team!

[Magyar változat](README.md) | [Handbook](HANDBOOK.md) *(Hungarian)*

> **Don't just use AI – lead it!** 🚀
>
> With this workflow, you don't just get a simple chatbot, but a complete, specialized Business Analyst team with you as the lead. While you focus on strategic decisions and client relationships, your AI colleagues do the heavy lifting:
>
> 1. 📋 **Orchestrator**: Your project manager who keeps track of everything and knows where you are.
> 2. 🏗️ **Spec Builder**: Your precise analyst who carves a pinpoint specification out of raw notes.
> 3. ✍️ **BA Document Agent**: Your technical writer who produces BRDs, User Stories, and process flows.
> 4. 📂 **File Converter**: Your data specialist who converts any Office file into AI-ready format in seconds.
> 5. 🧠 **Memory Agent**: Your strategic advisor who never forgets a single decision or stakeholder detail.
>
> **Take your efficiency to the next level: delegate to the BA Team and focus on real value creation!**

---

This repository contains Claude AI skills and agents designed to **support Business Analyst colleagues** throughout the entire requirements engineering process of IT projects.

For the full usage guide, command reference, workflow explanation, and FAQ, see the **[Handbook](HANDBOOK.md)** *(available in Hungarian only)*.

---

## Installation Guide

> This guide does not require programming knowledge.

### A) Automatic Installation – One Command

The easiest method: run the installer script, which automatically installs and configures everything.

**Windows – PowerShell:**
```powershell
.\install.ps1
```

**Mac – Terminal:**
```bash
bash install.sh
```

**What the script installs:**

| Tool | Purpose |
|---|---|
| Git | Version control, downloading the project |
| Visual Studio Code | Text editor, Claude plugin |
| Python | Required for file conversions |
| markitdown[docx] | Word (.docx) → Markdown |
| openpyxl | Excel (.xlsx) → Markdown |
| extract-msg | Outlook (.msg) → Markdown |
| Claude Code (VS Code ext.) | The AI plugin |
| Markdown Preview Mermaid Support | For displaying process flows |
| Markdown All in One | For Markdown editing |

> The script is idempotent — it can be rerun and only installs what is missing.

---

### B) Manual Installation – Step by Step

If you prefer to perform the installation manually instead of using the script, follow these steps in order.

#### What You'll Need

| Tool | Purpose | Price |
|---|---|---|
| GitHub account | Project storage and download | Free |
| Visual Studio Code | Text editor with Claude integration | Free |
| Claude account | The AI engine that does the work | Free / Pro |

---

#### Step 1 – Create a GitHub Account

1. Open your browser and go to **[github.com](https://github.com)**
2. Click the **Sign up** button at the top right
3. Enter your email, choose a password and a username
4. Follow the email confirmation steps
5. Once done, you are logged in to GitHub

---

#### Step 2 – Create Your Own Project from the Template

This repository is a **template**, so you can create your own independent copy with a single click.

1. Go to the template repository page on GitHub *(your team lead will send the link)*
2. Click the green **Use this template** button *(top right corner)*
3. Select the **Create a new repository** option
4. Fill in the details:
   - **Repository name**: give your project a name, e.g., `project-insurance-system`
   - **Visibility**: select **Private** *(it stays private)*
5. Click the **Create repository** button
6. Your new, own repository page will open

> Every BA colleague creates their own copy for their project. No one modifies the original template.

---

#### Step 3 – Install Visual Studio Code

1. Open the **[code.visualstudio.com](https://code.visualstudio.com)** page
2. Click the large blue **Download** button
   - Windows: downloads `.exe` installer
   - Mac: downloads `.dmg` file
3. Open the downloaded file and follow the installation instructions
   - On Windows: leave "Add to PATH" and "Open with Code" options checked
4. Start VS Code — a welcome screen appears

---

#### Step 4 – Install Claude Code Extension

Claude Code is the extension that builds AI into VS Code.

1. In VS Code, click the square **Extensions** icon in the left sidebar (or press `Ctrl+Shift+X` / `Cmd+Shift+X` on Mac)
2. In the search box, type: `Claude Code`
3. Find the **Claude Code** extension *(publisher: Anthropic)*
4. Click the **Install** button
5. After installation, click the **Claude** icon that appears in the left sidebar
6. Click the **Sign in** button and log in with your Claude account *(if you don't have one, create it at **[claude.ai](https://claude.ai)**)*

---

#### Step 5 – Install Markdown Preview Extensions

BA documents are created in Markdown format and include Mermaid process flows. Two extensions are needed for a nice display.

**5a. Markdown Preview Mermaid Support** *(for displaying process flows)*

1. In the Extensions panel (`Ctrl+Shift+X`), find: `Markdown Preview Mermaid Support`
2. Publisher: **Matt Bierner**
3. Click the **Install** button

**5b. Markdown All in One** *(for comfortable Markdown editing)*

1. In the Extensions panel, find: `Markdown All in One`
2. Publisher: **Yu Zhang**
3. Click the **Install** button

> **How can you view the documents?** Open an `.md` file, then press `Ctrl+Shift+V` (Windows) / `Cmd+Shift+V` (Mac) — the nicely formatted preview with process flows will open.

---

#### Step 6 – Download the Project to VS Code

1. In VS Code, press `Ctrl+Shift+P` (Windows) / `Cmd+Shift+P` (Mac)
2. Type: `Git: Clone` and press Enter
3. Click the **Clone from GitHub** option
4. If it's your first time: VS Code will ask you to log in to GitHub — click **Allow** and follow the steps in the browser
5. In the search box, find your repository name *(the one you created in Step 2)*
6. Select it, then choose **where** to save it on your computer *(e.g., Documents folder)*
7. Click the **Open** button — the project opens in VS Code

---

#### Step 7 – Install Python and Conversion Libraries (Optional)

> This step is **not mandatory**. If you only use `.md`, `.txt`, or `.pdf` files, you can skip it.
> If you want to submit Word, Excel, or Outlook files to the system, this is required.

**Supported File Formats:**

| File Type | Required Tool |
|---|---|
| Word (.docx) | Python + markitdown[docx] |
| Excel (.xlsx) | Python + openpyxl |
| Outlook (.msg) | Python + extract-msg |
| Email (.eml) | Python stdlib (no extra package needed) |
| PDF (.pdf) | Python + markitdown[pdf] |
| PowerPoint (.pptx) | Python + markitdown + python-pptx |
| Images (.png, .jpg, .bmp, .webp) | AI-based – no Python library needed |

**7a. Install Python**

*Windows:*
1. Download from **[python.org/downloads](https://www.python.org/downloads/)**
2. **Important:** check the **"Add Python to PATH"** checkbox before installing

*Mac:*
```bash
brew install python
```

**7b. Install Python Libraries**

```
pip install "markitdown[docx,pdf]" openpyxl extract-msg python-pptx
```

**Verification:**
```
pip show markitdown openpyxl extract-msg
```

---

#### Step 8 – Verify First Run

1. In VS Code, open the Claude panel *(left sidebar, Claude icon)*
2. In the bottom input field, type: `/session-loader`
3. Press Enter
4. Claude shows the current state of the project:
   ```
   ============================================================
     BA WORKFLOW – SESSION LOADER
   ============================================================
     PROJECT
     Name:    –
     ...
     SUGGESTED NEXT STEP
     ⚠️  No input materials.
        → Copy files to workflow/01_project_info/ folder
   ============================================================
   ```
5. If you see this, the basic installation is successful.

> **Verifying Python:** If you installed Python (Step 7), type `/convert` in the Claude panel — if the system reports no files to convert, both Python and the libraries are working.
