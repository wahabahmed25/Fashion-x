import InputFieldOne from "../input fields/InputFieldOne";
import { useState, type ChangeEvent } from "react";
import MoodInput from "./MoodInput";
import GetCurrentWeather from "./GetCurrentWeather";
import GetLocation from "../GetLocation";
interface inputProp {
  preferences: string;
  occasion: string;
  mood: string;
}

const Stylist = () => {
  const [inputValue, setInputValue] = useState<inputProp>({
    preferences: "",
    occasion: "",
    mood: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
    console.log(inputValue);
  };

  // const handleSubmit = () => {
  //   console.log('submitted');
  // }
  return (
    <div>
      <InputFieldOne
        type="text"
        name="preferences"
        value={inputValue.preferences}
        label="Preferences"
        placeholder="What are your preferences?"
        onChange={handleChange}
      />
      <InputFieldOne
        type="text"
        name="occasion"
        value={inputValue.occasion}
        label="occasion"
        placeholder="What are your occasion?"
        onChange={handleChange}
      />
      <MoodInput
        mood={inputValue.mood}
        onChange={(value) =>
          setInputValue((prev) => ({ ...prev, mood: value }))
        }
      />

      <GetCurrentWeather location="New York"/>
      <GetLocation />
    </div>
  );
};

export default Stylist;
