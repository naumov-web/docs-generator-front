import { TextField } from "@material-ui/core";

const TemplateParameterString = ({ name, default_value, id }) => {
  return (
    <TextField
      id={`parameter-${id}`}
      fullWidth={true}
      label={name}
      defaultValue={default_value}
    />
  );
};

export default TemplateParameterString;
