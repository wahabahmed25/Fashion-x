import Dropdown from "../Dropdown-menus/Dropdown";
import { useState } from "react"
const MoodInput = () => {
    const [mood, setMood] = useState<string>('');

    const moods = ["Happy", "Sad", "Excited", "Tired"];


  return (
    <div>
        
        <Dropdown 
            label = "Select your Mood"
            name = "mood"
            value = {mood}
            options={moods}
            onChange={(e) => setMood(e.target.value)}
        />
      
    </div>
  )
}

export default MoodInput
