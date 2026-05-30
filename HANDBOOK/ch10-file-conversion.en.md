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
| `.mp3` / `.m4a` / `.wav` / `.ogg` / `.flac` / `.aac` / `.wma` / `.opus` (audio) | Yes — faster-whisper transcription |
| `.mp4` / `.mkv` / `.mov` / `.webm` / `.avi` (video) | Yes — ffmpeg audio extraction + transcription |
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

## Audio Files and Videos

The BA Tool can automatically transcribe meeting recordings (`.mp3`, `.m4a`, `.wav` etc.) and videos (`.mp4`, `.mkv` etc.) when `/convert` is run:

1. **Audio files** are transcribed directly using faster-whisper
2. **Video files** have their audio extracted first (ffmpeg), then transcribed — the video is deleted after successful extraction
3. Output filename: `{filename}_{model}_converted.md` (e.g. `meeting_small_converted.md`)

For detailed model comparison, performance data, and installation guide: [Chapter 19 – Audio Transcription](ch19-audio-transcription.en.md)

---

## Auto-Conversion

| Command | Which folders? |
|---|---|
| `/ba` | `01_project_info/` and `03_answers/` |
| `/extractor` | `01_project_info/` only |
| `/business-analyst` | `03_answers/` only |
| `/convert` | `01_project_info/` and `03_answers/` |
