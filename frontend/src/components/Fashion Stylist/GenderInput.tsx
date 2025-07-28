import Dropdown from "../Dropdown-menus/Dropdown";
interface propType {
  gender: string;
  onChange: (value: string) => void;
}

const GenderInput = ({ gender, onChange }: propType) => {
  const genders = ["male", "female"];
  return (
    <div>
      <Dropdown
        label="What is Your Gender?"
        name="gender"
        value={gender}
        options={genders}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default GenderInput;
