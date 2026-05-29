---
name: convert
description: >
  Converts all non-markdown files (.docx, .xlsx, .msg, .eml, .pdf, .pptx, .png, .jpg, .jpeg, .bmp, .webp)
  in workflow/01_project_info/ AND workflow/03_answers/ to markdown format.
  Office/PDF/email: deterministic Python (0 AI tokens).
  Images: Claude API if ANTHROPIC_API_KEY is set; otherwise Claude Code agent fallback (no API key needed).
  Use /convert before /ba if you have Office, Outlook, PDF, email, or image files in either input folder.
disable-model-invocation: true
argument-hint: "[all|inputs|answers]"
version: 3.1.0
author: Viktor Bozzay
---

# Convert – File Format Converter Entry Point

## Step 1 — Python pipeline (Office / PDF / email / images with API key)

```bash
python ${CLAUDE_SKILL_DIR}/../../scripts/run_convert.py --scope ${ARGUMENTS:-all}
```

Show the stdout output to the user.

## Step 2 — Agent fallback for images (no ANTHROPIC_API_KEY required)

```bash
python ${CLAUDE_SKILL_DIR}/scripts/find_pending_images.py
```

If the output is `[]`, this step is complete — nothing to do.

Otherwise, for each `item` in the JSON array:

**a)** Read the image using the Read tool → `item["path"]`

**b)** Generate a Markdown description in Hungarian. Use the section headings and
metadata label format defined in `.claude/skills/convert/references/image_output_template.md`.

**c)** Write the file at `item["output"]` following the template in
`.claude/skills/convert/references/image_output_template.md` — substitute the `{placeholders}`
with `item["sha256"]`, `item["filename"]`, `item["size"]`, `item["modified"]`,
and the generated content.

Reference loading policy:
- Load `.claude/skills/convert/references/image_output_template.md` only when Step 2 runs and pending images exist.

**d)** Update the conversion log via memory-agent:

```
MEMORY_UPSERT: target: CONVERSION_LOG file_path: {item["path"]} sha256: {item["sha256"]} output: {filename of item["output"]} date: {item["modified"]}
```

**e)** Report the result to the user in Hungarian (SUCCESS / FAIL + filename).

---

## When to use

| Format | Method |
|---|---|
| `.docx` / `.doc` | Python + markitdown[docx] |
| `.xlsx` / `.xls` | Python + openpyxl |
| `.msg` | Python + extract-msg |
| `.eml` | Python stdlib |
| `.pdf` | Python + markitdown[pdf] |
| `.pptx` / `.ppt` | Python + markitdown + python-pptx |
| `.png` / `.jpg` / `.jpeg` / `.webp` | Claude API (if ANTHROPIC_API_KEY set) or agent fallback |
| `.bmp` | Claude API + Pillow (if ANTHROPIC_API_KEY set) or agent fallback |
| `.md` / `.txt` | No conversion needed |

## Language Rule

Show the Python stdout output directly. If any non-image FAIL lines appear, append a Hungarian installation guide.
Step 2 results must be reported in Hungarian.

## Installation (if needed)

```
Python:          winget install python   (Windows)
                 brew install python     (Mac)

Python packages: pip install -r .claude/scripts/requirements.txt
```
