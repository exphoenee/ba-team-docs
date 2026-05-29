# 3. Installation Guide

> This guide requires no programming knowledge.

## 3.1 Automatic Installation

The easiest method: run the installer script that sets everything up automatically.

**Windows – PowerShell:**
```powershell
.\install.ps1
```

**Mac – Terminal:**
```bash
bash install.sh
```

The script is idempotent — can be re-run, only installs what's missing.

**What the script installs:**

| Tool | Purpose |
|---|---|
| Git | Version control, project download |
| Visual Studio Code | Text editor, Claude plugin |
| Python | File conversion support |
| markitdown[docx] | Word (.docx) → Markdown |
| openpyxl | Excel (.xlsx) → Markdown |
| extract-msg | Outlook (.msg) → Markdown |
| Claude Code (VS Code ext.) | The AI plugin |
| Markdown Preview Mermaid Support | Diagram rendering |
| Markdown All in One | Markdown editing |

---

## 3.2 Manual Installation Step by Step

### Required Tools

| Tool | Purpose | Price |
|---|---|---|
| GitHub account | Project storage and download | Free |
| Visual Studio Code | Text editor | Free |
| Claude account | AI engine | Free / Pro |

### 6 Steps to Set Up

1. **Create a GitHub account** at github.com
2. **Create your project from the template** — click "Use this template", enter a name, set to Private
3. **Install VS Code** from code.visualstudio.com
4. **Install Claude Code extension** — search in Extensions panel
5. **Install Markdown extensions** — Mermaid Support + Markdown All in One
6. **Clone the project** into VS Code using Git: Clone

---

## 3.3 Python and File Conversion Libraries (Optional)

**Supported file formats:**

| File type | Required tool |
|---|---|
| Word (.docx) | Python + markitdown[docx] |
| Excel (.xlsx) | Python + openpyxl |
| Outlook (.msg) | Python + extract-msg |
| Email (.eml) | Python stdlib |
| PDF (.pdf) | Python + markitdown[pdf] |
| PowerPoint (.pptx) | Python + markitdown + python-pptx |

```bash
pip install "markitdown[docx,pdf]" openpyxl extract-msg python-pptx
```

---

## 3.4 First Launch Verification

1. Open the Claude panel in VS Code (left sidebar, Claude icon)
2. Type: `/session-loader`
3. Press Enter

If installed correctly, you'll see the session loader status report.
