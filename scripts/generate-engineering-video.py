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
Cinematic 4K slow-motion industrial shot inside a precision CNC machining facility.
Cold blue-white overhead lighting illuminates a 5-axis CNC milling machine carving
a aerospace-grade aluminum part. Metal chips fly in slow motion catching the light.
The camera slowly dollies forward toward the spinning tool. Deep focus, anamorphic
lens flare on the spindle. Hyper-realistic, photographic. Premium industrial aesthetic.
Dark background, dramatic shadows. No text, no watermarks.
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
