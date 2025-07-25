// MoodInput.tsx
import Dropdown from "../Dropdown-menus/Dropdown";

interface MoodInputProps {
  mood: string;
  onChange: (value: string) => void;
}

const MoodInput = ({ mood, onChange }: MoodInputProps) => {
  const moods = ["Happy", "Sad", "Excited", "Tired"];

  return (
    <div>
      <Dropdown
        label="Select your Mood"
        name="mood"
        value={mood}
        options={moods}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default MoodInput;
