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
    A user submitted the following preferences and weather data.
    
    Preferences:
    {input_value}

    Weather:
    {weather_info}

    Based on this, give a personalized fashion styling recommendation.
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
