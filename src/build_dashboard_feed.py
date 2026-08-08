import csv
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
JOBS_CSV = ROOT / "data" / "jobs.csv"
OUTPUT_FILE = ROOT / "dashboard-feed" / "jobs.json"

PUBLIC_FIELDS = [
    "job_id",
    "company",
    "title",
    "location",
    "description",
    "job_url",
    "source",
    "date_posted",
    "status",
]


def now_iso():
    return (
        datetime.now(timezone.utc)
        .replace(microsecond=0)
        .isoformat()
        .replace("+00:00", "Z")
    )


def load_jobs():
    if not JOBS_CSV.exists():
        print(f"::warning::{JOBS_CSV} does not exist. Creating an empty feed.")
        return []

    with JOBS_CSV.open(
        "r",
        encoding="utf-8-sig",
        newline=""
    ) as handle:
        return list(csv.DictReader(handle))


def sanitize_jobs(rows):
    jobs = []
    seen_urls = set()

    for row in rows:
        job_url = str(row.get("job_url") or "").strip()
        title = str(row.get("title") or "").strip()

        if not job_url or not title:
            continue

        if job_url in seen_urls:
            continue

        seen_urls.add(job_url)

        job = {
            field: str(row.get(field) or "").strip()
            for field in PUBLIC_FIELDS
        }

        jobs.append(job)

    jobs.sort(
        key=lambda item: (
            item.get("date_posted", ""),
            item.get("company", ""),
            item.get("title", ""),
        ),
        reverse=True,
    )

    return jobs


def main():
    rows = load_jobs()
    jobs = sanitize_jobs(rows)

    feed = {
        "generated_at": now_iso(),
        "count": len(jobs),
        "jobs": jobs,
    }

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    OUTPUT_FILE.write_text(
        json.dumps(feed, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    print(f"Dashboard feed created: {OUTPUT_FILE}")
    print(f"Jobs published to feed: {len(jobs)}")


if __name__ == "__main__":
    main()
