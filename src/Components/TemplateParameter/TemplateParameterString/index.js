import { TextField } from "@material-ui/core";

const TemplateParameterString = ({ name, default_value, id, onChange }) => {
  return (
    <TextField
      id={`parameter-${id}`}
      fullWidth={true}
      label={name}
      defaultValue={default_value}
      required={true}
      onChange={event => {
        onChange(id, event.target.value);
      }}
    />
  );
};

export default TemplateParameterString;
