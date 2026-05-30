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

## 3.4 Audio Transcription Dependencies (Optional)

> Only needed if you want to include meeting recordings or videos in the system.

The BA Tool can automatically transcribe audio/video files (`.mp3`, `.m4a`, `.wav`, `.mp4`, `.mkv` etc.) when running `/convert`. Two tools are required:

### FFmpeg Installation (required for audio transcription)

**Windows (recommended):**
```powershell
winget install "FFmpeg (Essentials Build)"
```

*Or:* runs `whisr/whisr/setup.py` — automatically downloads FFmpeg to the project `bin/` folder.

**Mac:**
```bash
brew install ffmpeg
```

### faster-whisper (Python package)

```
pip install faster-whisper
```

### CUDA GPU Acceleration (optional — ~5–10× faster)

Full CUDA Toolkit installation is **not required**. Only these two pip packages are needed:

```
pip install nvidia-cublas-cu12 nvidia-cuda-nvrtc-cu12
```

> **Note:** The pip packages include the required DLLs. Works on Python 3.13 — PyTorch is not needed.

### Configuring the Model

On first run, the model is downloaded automatically (~244 MB for the `small` model). Configurable in `app/config.json`:

```json
{
  "transcriber_options": {
    "model": "light",
    "mode": "auto"
  }
}
```

`"light"` = `"small"` model (recommended default). For detailed model comparison, see: [Chapter 19](ch19-audio-transcription.en.md).

---

## 3.5 First Launch Verification

1. Open the Claude panel in VS Code (left sidebar, Claude icon)
2. Type: `/session-loader`
3. Press Enter

If installed correctly, you'll see the session loader status report.
