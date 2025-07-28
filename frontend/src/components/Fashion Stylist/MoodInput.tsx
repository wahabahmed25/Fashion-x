// MoodInput.tsx
import Dropdown from "../Dropdown-menus/Dropdown";

interface MoodInputProps {
  mood: string;
  onChange: (value: string) => void;
}

const MoodInput = ({ mood, onChange }: MoodInputProps) => {
  const moods = [
    "Casual",
    "Romantic",
    "Playful",
    "Chill",
    "Edgy",
    "Professional",
    "Elegant",
    "Bold",
    "Minimalist",
    "sporty",
    "comfy", 
  ];
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
