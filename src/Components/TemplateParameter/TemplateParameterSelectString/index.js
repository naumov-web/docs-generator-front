import { Select, InputLabel, MenuItem } from "@material-ui/core";

const TemplateParameterSelectString = ({
  name,
  default_value,
  id,
  values,
  onChange
}) => {
  var defaultValue = null;

  if (typeof values[0]) {
    defaultValue = values[0].name;
    onChange(id, defaultValue);
  }

  return (
    <>
      <InputLabel id={`parameter-label-${id}`}>{name} *</InputLabel>
      <Select
        labelId={`parameter-label-${id}`}
        onChange={event => {
          onChange(id, event.target.value);
        }}
        defaultValue={defaultValue}
      >
        {values.map(value => (
          <MenuItem key={`menu-item-${value.id}`} value={value.name}>
            {value.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default TemplateParameterSelectString;
