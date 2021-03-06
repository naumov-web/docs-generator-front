import { TextField } from "@material-ui/core";
import moment from "moment";

const TemplateParameterDateDDMMYYYY = ({
  name,
  default_value,
  id,
  onChange
}) => {
  return (
    <TextField
      type="date"
      id={`parameter-${id}`}
      fullWidth={true}
      label={name}
      defaultValue={moment(default_value, "DD.MM.YYYY").format("YYYY-MM-DD")}
      required={true}
      onChange={event => {
        onChange(
          id,
          moment(event.target.value, "YYYY-MM-DD").format("DD.MM.YYYY")
        );
      }}
    />
  );
};

export default TemplateParameterDateDDMMYYYY;
