import { FormControl, FormHelperText } from "@material-ui/core";
import TemplateParameterString from "./TemplateParameterString";
import TemplateParameterDateDDMMYYYY from "./TemplateParameterDateDDMMYYYY";

const TemplateParameter = ({ parameter }) => {
  return (
    <FormControl fullWidth={true}>
      {parameter.type_name === "string" && (
        <TemplateParameterString {...parameter} />
      )}
      {parameter.type_name === "date_dd_mm_yyyy" && (
        <TemplateParameterDateDDMMYYYY {...parameter} />
      )}
      {!parameter.is_manual && (
        <FormHelperText>Значение заполняется автоматически</FormHelperText>
      )}
    </FormControl>
  );
};

export default TemplateParameter;
