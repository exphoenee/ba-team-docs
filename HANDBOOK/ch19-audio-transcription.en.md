# 19. Audio Transcription (Meeting Recordings and Videos)

> Automatic text transcription using faster-whisper — integrated into the BA workflow.

---

## What Is This?

The BA Tool can automatically create text Markdown transcripts from audio and video files. Simply copy meeting recordings (`.mp3`, `.m4a`, `.wav` etc.) or videos (`.mp4`, `.mkv` etc.) into the project input folder and run `/convert` — the transcript is produced automatically.

---

## How to Use It

1. Copy the audio or video file to `workflow/01_project_info/`
2. Type in the Claude panel: `/convert`
3. The transcript is created automatically: `{filename}_{model}_converted.md`
4. Run `/ba` — the AI processes the transcript along with other materials

**Configuring the model (optional):** in `app/config.json`:
```json
{
  "transcriber_options": {
    "model": "light",
    "mode": "auto"
  }
}
```

| Key | Values | Default |
|---|---|---|
| `model` | `"tiny"`, `"base"`, `"small"`, `"medium"`, `"large-v3"`, `"light"` (= small) | `"light"` |
| `mode` | `"auto"`, `"cpu"`, `"cuda"` | `"auto"` |

---

## Video Support

For video files, the system automatically extracts audio (using FFmpeg), then transcribes it. The video name and audio name match (e.g. `meeting.mp4` → `meeting.mp3`). After successful extraction, the video is deleted (default behavior in BA mode).

---

## Working in Parallel

Transcription runs in the background — the computer remains fully usable during conversion, and Claude stays accessible. Exception: `medium (CPU)` model has RTF > 1 and may place heavy load on the machine.

---

## Model Comparison

The table below is based on 3 Hungarian-language meeting recordings (~57 minutes total), measured on NVIDIA GeForce RTX 4050 Laptop GPU + Intel Core i7-13620H.

| Model | Avg. speed | RTF | TQS | Typical errors | Recommendation |
|---|---|---|---|---|---|
| tiny (CUDA) | ~15.7× | 0.06 | ~65/100 | ~50+ hallucinations, mixed language | Draft only |
| tiny (CPU) | ~5.6–9.5× | 0.06–0.18 | ~65/100 | ~50+ hallucinations | Draft only |
| **small (CUDA)** | **~6.6×** | **0.15** | **96/100** | **3 nonsense words** | **✔ Recommended** |
| small (CPU) | ~1.9–2.2× | 0.44–0.54 | ~96/100 | 3 nonsense words | Best CPU choice |
| medium (CUDA) | ~4.4× | 0.23 | ~88/100 | ~35–40 distortions, no loop | Acceptable |
| medium (CPU) | ~0.82× | 1.22 | ~80/100 | 1 critical 28× loop + ~30 errors | ❌ Avoid |

**RTF** (Real-Time Factor): RTF < 1 means faster than real-time (e.g. RTF 0.15 → 6.6× speed). RTF > 1 means slower than real-time.
**TQS** (Transcription Quality Score): quality score out of 100, based on actual file analysis.

---

## Detailed Performance Tables

### Per-file measurements — Machine 1 (RTX 4050 + i7-13620H)

**Kritikus_logikai_rések_a_Claude-alapú_BA-rendszerben.m4a (21 MB, 11:00)**

| Model | Device | Processing time | RTF | Speed |
|---|---|---|---|---|
| tiny | CPU | 126.7 s | 0.19 | ~5.2× |
| tiny | CUDA | 36.2 s | 0.05 | ~18.2× |
| small | CPU | 439.9 s | 0.67 | ~1.5× |
| small | CUDA | 93.7 s | 0.14 | ~7.0× |
| medium | CUDA | 128.5 s | 0.19 | ~5.1× |
| medium | CPU | 814.9 s | 1.23 | ~0.81× |

**Káoszból_profi_specifikáció_hét_AI_ügynökkel.m4a (54 MB, 27:55)**

| Model | Device | Processing time | RTF | Speed |
|---|---|---|---|---|
| tiny | CPU | 274.2 s | 0.16 | ~6.1× |
| tiny | CUDA | 107.4 s | 0.06 | ~15.6× |
| small | CPU | 857.2 s | 0.51 | ~2.0× |
| small | CUDA | 320.7 s | 0.19 | ~5.2× |
| medium | CUDA | 379.2 s | 0.23 | ~4.4× |
| medium | CPU | 2033.8 s | 1.21 | ~0.83× |

**Mérnöki_fegyelem_az_üzleti_elemzésben.m4a (34 MB, 17:42)**

| Model | Device | Processing time | RTF | Speed |
|---|---|---|---|---|
| tiny | CPU | 203.4 s | 0.19 | ~5.2× |
| tiny | CUDA | 73.4 s | 0.07 | ~14.5× |
| small | CPU | 539.6 s | 0.51 | ~2.0× |
| small | CUDA | 100.9 s | 0.09 | ~10.5× |
| medium | CUDA | 275.2 s | 0.26 | ~3.9× |
| medium | CPU | 1292.6 s | 1.22 | ~0.82× |

**Totals (3 files, ~57 minutes)**

| Model | Device | Total time | Avg. RTF | Avg. speed |
|---|---|---|---|---|
| tiny | CPU | 604.3 s | 0.18 | ~5.6× |
| tiny | CUDA | 217.0 s | 0.06 | ~15.7× |
| small | CPU | 1836.7 s | 0.54 | ~1.9× |
| small | CUDA | 515.3 s | 0.15 | ~6.6× |
| medium | CUDA | 782.9 s | 0.23 | ~4.4× |
| medium | CPU | 4141.3 s | 1.22 | ~0.82× |

### Machine 2 comparison (i7-6820HQ, CPU-only)

| Model | Total time | Avg. RTF | Avg. speed |
|---|---|---|---|
| tiny (CPU) | 358.0 s | 0.11 | ~9.5× |
| small (CPU) | 1520.5 s | 0.45 | ~2.2× |

---

## Error Analysis

### small (CUDA) — TQS: 96/100

| Word | Count | File |
|---|---|---|
| `qttxx` | 1× | Káoszból… |
| `shdxx` | 1× | Mérnöki… |
| `kryptogr` | 1× | Mérnöki… |

**Total: 3 nonsense words in ~57 minutes.**

### medium (CUDA) — TQS: ~88/100

Name errors: "Clodeir-ra" (→ Claude-ra), "CSEK 4" (→ Check 4), "BI Docks" (→ BA Docs)
Garbled phrases: "tudadazogatab.ms kifájlokat", "kivan tolt fe", "BAP-arancsot"
Lexical errors: ~10 additional word-level distortions across 3 files

**Total: ~35–40 distortions in ~57 minutes. No repetition loop.**

### medium (CPU) — TQS: ~80/100

**Critical:** 28× repetition loop in the Káoszból file [1313.6s → 1340.5s] — ~27 seconds of content lost.
Additional distortions: ~30 words, similar to medium CUDA but lower quality.

### tiny (CUDA/CPU) — TQS: ~65/100

~50+ hallucinated/distorted words. Mixed-language hallucinations, nonsense compounds, code-name errors. **Suitable for draft review only.**

---

## Short Segment Counts

| Model | Segments < 2s | Interpretation |
|---|---|---|
| tiny | 92 | Instability, noisy recognition |
| small | 3 | Stable, normal |
| medium (CPU) | ~62 | Partly caused by 28× loop |

---

## Hardware Recommendations

**With GPU (CUDA):**
- **small (CUDA)** — best speed/quality balance. TQS 96/100, ~6.6× real-time. ✔ Default recommendation.
- **medium (CUDA)** — for precision tasks. TQS ~88/100, ~4.4× real-time (~52% slower than small).

**CPU only (no GPU):**
- **small (CPU)** — when quality matters. TQS ~96/100, ~1.9–2.2× real-time (~30 min for 57 min of audio).
- **tiny (CPU)** — when speed matters. TQS ~65/100, ~5.6–9.5× real-time.
- **medium (CPU) — avoid.** RTF > 1 (slower than real-time), loop-hallucination risk, ~69 min for 57 min of audio.

---

## Model Download Sizes

On first use, the model is downloaded automatically (internet required). After that, works offline.

| Model | Download size |
|---|---|
| tiny | ~74 MB |
| base | ~141 MB |
| small | ~244 MB |
| medium | ~769 MB |
| large-v3 | ~3 GB |

---

## Installation Requirements

See: [3. Installation Guide → 3.4 Audio Transcription Dependencies](ch03-installation.en.md#34-audio-transcription-dependencies-optional)

---

*Data source: `whisr/whisr/performance.md` and `whisr/whisr/quality_report.md` — batch run on 3 Hungarian-language m4a files, 2026-05-30.*
