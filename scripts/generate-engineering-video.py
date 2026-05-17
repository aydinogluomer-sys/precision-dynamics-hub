"""
AtlasCloud — Seedance 2.0 Mühendislik & Üretim sahnesi video üretimi
Kullanım: ATLASCLOUD_API_KEY=<key> python3 scripts/generate-engineering-video.py

Çıktı: video URL'i stdout'a yazdırılır → EngineeringSection.tsx SEEDANCE_VIDEO sabitine ekle
"""
import sys
import os
import time
import requests

PROMPT = """
Cinematic establishing shot inside a modern precision manufacturing facility at night.
Rows of illuminated CNC machines work autonomously under cold blue lighting.
Slow dolly forward through the factory floor. Steam and coolant mist catch the light.
Photorealistic, 4K, premium industrial. No people, no text.
""".strip()

GENERATE_URL = "https://api.atlascloud.ai/api/v1/model/generateVideo"
POLL_URL_TEMPLATE = "https://api.atlascloud.ai/api/v1/model/prediction/{}"


def main():
    api_key = os.environ.get("ATLASCLOUD_API_KEY")
    if not api_key:
        print("ERROR: Set ATLASCLOUD_API_KEY environment variable.")
        print("       Get your key from the AtlasCloud dashboard.")
        sys.exit(1)

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }

    payload = {
        "model": "bytedance/seedance-2.0/text-to-video",
        "prompt": PROMPT,
        "duration": 5,
        "resolution": "720p",
        "ratio": "16:9",
        "generate_audio": False,
        "watermark": False,
        "return_last_frame": False,
    }

    print("Submitting video generation request...")
    print(f"Prompt: {PROMPT[:80]}...")

    resp = requests.post(GENERATE_URL, headers=headers, json=payload, timeout=30)
    resp.raise_for_status()
    prediction_id = resp.json()["data"]["id"]
    print(f"Prediction ID: {prediction_id}")
    print("Polling for completion (may take 2-5 minutes)...")

    poll_url = POLL_URL_TEMPLATE.format(prediction_id)
    poll_headers = {"Authorization": f"Bearer {api_key}"}

    while True:
        time.sleep(2)
        r = requests.get(poll_url, headers=poll_headers, timeout=30)
        r.raise_for_status()
        data = r.json()["data"]
        status = data["status"]

        if status in ("completed", "succeeded"):
            video_url = data["outputs"][0]
            print(f"\n✅ Video generated: {video_url}")
            print("\nNext step — add to EngineeringSection.tsx:")
            print(f'  const SEEDANCE_VIDEO = "{video_url}";')
            return

        if status == "failed":
            raise RuntimeError(data.get("error") or "Generation failed")

        print(f"  status: {status} — waiting...")


if __name__ == "__main__":
    main()
