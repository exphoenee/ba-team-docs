# 10. File Conversion (/convert)

## When Is It Needed?

| File type | Conversion needed? |
|---|---|
| `.docx` / `.doc` | Yes |
| `.xlsx` / `.xls` | Yes |
| `.msg` (Outlook) | Yes |
| `.eml` (email) | Yes |
| `.pdf` | Yes |
| `.pptx` / `.ppt` (PowerPoint) | Yes |
| `.png` / `.jpg` / `.jpeg` / `.bmp` / `.webp` (images) | Yes — AI-based processing |
| `.md` / `.txt` | No — already processable |

## How It Works

```
/convert
```

The system runs a **Python package** — not an AI agent — so it uses **zero LLM tokens**:

1. Quick check by size + modification date
2. SHA-256 fingerprint verification
3. **Only new or changed files** are converted
4. Creates `[filename]_converted.md`
5. Updates the conversion log

**Important:** Original files are never modified.

## Auto-Conversion

| Command | Which folders? |
|---|---|
| `/ba` | `01_project_info/` and `03_answers/` |
| `/extractor` | `01_project_info/` only |
| `/business-analyst` | `03_answers/` only |
| `/convert` | `01_project_info/` and `03_answers/` |
