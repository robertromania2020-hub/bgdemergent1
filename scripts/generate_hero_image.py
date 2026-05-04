"""One-time generator for BGD-Trans hero image using Gemini Nano Banana."""
import asyncio
import base64
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Load env from backend
load_dotenv(Path(__file__).resolve().parents[1] / "backend" / ".env")

from emergentintegrations.llm.chat import LlmChat, UserMessage  # noqa: E402

OUTPUT_PATH = Path(__file__).resolve().parents[1] / "frontend" / "public" / "hero-van.jpg"

PROMPT = (
    "Ultra photorealistic cinematic photograph of a brand-new luxury white Renault Master "
    "minibus (passenger van, 8+1 seats variant) parked on a sunlit modern European highway "
    "rest area at golden hour. The van is shown from a slight 3/4 front angle. "
    "Clearly painted on the side body of the van in bold premium navy-blue and orange typography: "
    "'BGD-Trans' as the main brand name with a phone icon and the phone number "
    "'+40 769 129 126' just below it. The text must be perfectly legible, sharp, "
    "well-kerned, professional commercial van decal style. The van is spotlessly clean, "
    "freshly washed, with chrome details, modern LED headlights, and 18-inch alloy wheels. "
    "Background: an autobahn vanishing into rolling green European countryside, distant alps "
    "softly out of focus, dramatic warm sunlight, lens flare, shallow depth of field, "
    "professional automotive advertising photography, shot on Hasselblad H6D, 35mm lens, "
    "f/4, vibrant yet natural colors, high dynamic range, 8K resolution. "
    "Aspect ratio 16:9 widescreen."
)


async def main():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        print("EMERGENT_LLM_KEY not set", file=sys.stderr)
        sys.exit(1)

    chat = LlmChat(
        api_key=api_key,
        session_id="bgd-trans-hero-gen-1",
        system_message="You generate premium photorealistic commercial vehicle photography.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
        modalities=["image", "text"]
    )

    msg = UserMessage(text=PROMPT)
    text, images = await chat.send_message_multimodal_response(msg)
    print(f"Text response: {(text or '')[:120]}...")
    if not images:
        print("No images generated", file=sys.stderr)
        sys.exit(2)

    img = images[0]
    print(f"Image mime: {img['mime_type']} (data len chars: {len(img['data'])})")
    image_bytes = base64.b64decode(img["data"])
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_bytes(image_bytes)
    print(f"Saved hero image -> {OUTPUT_PATH} ({OUTPUT_PATH.stat().st_size} bytes)")


if __name__ == "__main__":
    asyncio.run(main())
