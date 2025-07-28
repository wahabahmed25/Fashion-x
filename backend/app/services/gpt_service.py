import os
from openai import OpenAI

token = os.environ["GITHUB_TOKEN"]
endpoint = "https://models.github.ai/inference"
model_name = "openai/gpt-4o-mini"

client = OpenAI(
    base_url=endpoint,
    api_key=token,
)


def get_styling_recommendation(input_value: dict, weather_info: dict) -> str:
    prompt = f"""
    You are a helpful fashion stylist. When responding, do not write a paragraph.

    Use this structure:

    "Given that you're a {input_value.get("gender", "person")}, based on the {input_value.get("occasion", "general occasion")}, your preferences {input_value.get("preferences", "are not specified")}, and it being {weather_info.get("temperature", "unknown")}°F with {weather_info.get("condition", "unknown weather")} conditions..."

    Then suggest a full outfit broken down clearly like this:

    TOP:
    - ...

    BOTTOM:
    - ...

    SHOES:
    - ...

    ACCESSORIES:
    - ...

    OPTIONAL LAYERS:
    - ...

    Only recommend items based on the given context. Be brief but stylish and descriptive.
    """


    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a helpful fashion stylist."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        top_p=1.0,
        max_tokens=500,
        model=model_name
    )

    return response.choices[0].message.content
