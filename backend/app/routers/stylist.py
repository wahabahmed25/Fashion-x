from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services import gpt_service

router = APIRouter()

class StylistRequest(BaseModel):
    inputValue: dict
    weatherInfo: dict

@router.post("/stylist")
async def handle_stylist(request: StylistRequest):
    try:
        gpt_response = gpt_service.get_styling_recommendation(
            input_value=request.inputValue,
            weather_info=request.weatherInfo
        )
        return {
            "message": "Stylist recommendation generated",
            "gptResponse": gpt_response
        }
    except Exception as e:
        print("Error calling GPT service:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
