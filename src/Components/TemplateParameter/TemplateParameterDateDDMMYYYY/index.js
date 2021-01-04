import { TextField } from "@material-ui/core";
import moment from "moment";

const TemplateParameterDateDDMMYYYY = ({ name, default_value, id }) => {
  return (
    <TextField
      type="date"
      id={`parameter-${id}`}
      fullWidth={true}
      label={name}
      defaultValue={moment(default_value, "DD.MM.YYYY").format("YYYY-MM-DD")}
    />
  );
};

export default TemplateParameterDateDDMMYYYY;
