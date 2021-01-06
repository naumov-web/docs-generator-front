import { FormControl, FormHelperText } from "@material-ui/core";
import TemplateParameterString from "./TemplateParameterString";
import TemplateParameterDateDDMMYYYY from "./TemplateParameterDateDDMMYYYY";
import TemplateParameterSelectString from "./TemplateParameterSelectString";
import TemplateParameterInteger from "./TemplateParameterInteger";

const TemplateParameter = ({ parameter, onChange }) => {
  return (
    <FormControl fullWidth={true}>
      {parameter.type_name === "string" && (
        <TemplateParameterString {...parameter} onChange={onChange} />
      )}
      {parameter.type_name === "date_dd_mm_yyyy" && (
        <TemplateParameterDateDDMMYYYY {...parameter} onChange={onChange} />
      )}
      {parameter.type_name === "integer" && (
        <TemplateParameterInteger {...parameter} onChange={onChange} />
      )}
      {parameter.type_name === "select_string" && (
        <TemplateParameterSelectString {...parameter} onChange={onChange} />
      )}
      {!parameter.is_manual && (
        <FormHelperText>Значение заполняется автоматически</FormHelperText>
      )}
    </FormControl>
  );
};

export default TemplateParameter;
