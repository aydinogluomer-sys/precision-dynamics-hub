"""
Seedance 2.0 — Mühendislik & Üretim sahnesi video üretimi
Kullanım: MUAPI_API_KEY=<key> python3 scripts/generate-engineering-video.py

Çıktı: dist/assets/engineering-scene.mp4 (or URL printed to stdout)
"""
import sys
import os

sys.path.insert(0, "/tmp/ref-seedance")

try:
    from seedance_api import SeedanceAPI
except ImportError:
    print("ERROR: Seedance not found. Run: pip install requests python-dotenv")
    print("       and clone https://github.com/Anil-matcha/Seedance-2.0-API.git to /tmp/ref-seedance")
    sys.exit(1)

PROMPT = """
Cinematic establishing shot inside a modern precision manufacturing facility at night.
Rows of illuminated CNC machines work autonomously under cold blue lighting.
Slow dolly forward through the factory floor. Steam and coolant mist catch the light.
Photorealistic, 4K, premium industrial. No people, no text.
""".strip()

def main():
    api_key = os.environ.get("MUAPI_API_KEY")
    if not api_key:
        print("ERROR: Set MUAPI_API_KEY environment variable.")
        print("       Get your key from the Seedance/MuseAPI dashboard.")
        sys.exit(1)

    api = SeedanceAPI(api_key=api_key)

    print("Submitting video generation request...")
    print(f"Prompt: {PROMPT[:80]}...")

    submission = api.text_to_video(
        prompt=PROMPT,
        aspect_ratio="16:9",
        duration=5,
        quality="high",
    )

    request_id = submission.get("request_id")
    print(f"Request ID: {request_id}")
    print("Waiting for completion (may take 2-5 minutes)...")

    result = api.wait_for_completion(request_id)
    video_url = result["outputs"][0]

    print(f"\n✅ Video generated: {video_url}")
    print("\nNext step — add to EngineeringSection.tsx:")
    print(f'  const SEEDANCE_VIDEO = "{video_url}";')

if __name__ == "__main__":
    main()
