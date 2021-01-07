import { useState } from "react";
import { Typography, FormControl, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

import TemplateParameter from "../../Components/TemplateParameter";

import apiConfig from "../../configs/api";

const useDocument = id =>
  useQuery("document", async () => {
    const { getDocument } = await request(
      apiConfig.endpoint,
      gql`
        query {
          getDocument(id:${id}) {
            name
          }
        }
      `
    );

    return getDocument;
  });

const useDocumentTemplateParameters = document_id =>
  useQuery("documentTemplateParameters", async () => {
    const {
      getDocumentTemplateParameters: { items }
    } = await request(
      apiConfig.endpoint,
      gql`
        query {
          getDocumentTemplateParameters(document_id:${document_id}) {
            items {
              id,
              name,
              type_id,
              type_name,
              default_value
              is_manual,
              values {
                id,
                name
              }
            }
          }
        }
      `
    );

    return items;
  });

const buildDocumentQuery = async (document_id, parameters) => {
  var parametersStr = "[";

  for (let i = 0, len = parameters.length; i < len; i++) {
    if (i > 0) {
      parametersStr += ",";
    }
    parametersStr +=
      "{parameter_id:" +
      parameters[i].parameter_id +
      ', value:"' +
      parameters[i].value +
      '"}';
  }

  parametersStr += "]";

  const {
    buildDocument: { url }
  } = await request(
    apiConfig.endpoint,
    gql`
        query {
          buildDocument(document_id:${document_id}, parameters: ${parametersStr}) {
            url
          }
        }
      `
  );

  return url;
};

const DocumentPage = () => {
  const [buildedUrl, setBuildedUrl] = useState(null);
  var parameterValues = [];
  const twoButtonParametersLimit = 3;
  const { id } = useParams();
  const { data: document, isFetching: isFetchingDocument } = useDocument(id);
  const {
    data: templateParameters,
    isFetching: isFetchingParameters
  } = useDocumentTemplateParameters(id);

  if (!isFetchingParameters) {
    parameterValues = templateParameters.map(parameter => ({
      parameter_id: parameter.id,
      value: parameter.default_value
    }));
  }

  const setParameterValue = (parameter_id, value) => {
    for (let i = 0, len = parameterValues.length; i < len; i++) {
      if (parameterValues[i].parameter_id === parameter_id) {
        parameterValues[i].value = value;
      }
    }
  };

  const useBuildDocument = () => {
    const promise = buildDocumentQuery(id, parameterValues);

    promise.then(data => {
      setBuildedUrl(data);
    });
  };

  return (
    <div>
      {!isFetchingDocument && (
        <Typography variant="h5">{document.name}</Typography>
      )}
      {!isFetchingParameters && (
        <div className="form">
          {templateParameters.length > twoButtonParametersLimit && (
            <>
              <div className="form-row">
                <FormControl>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={useBuildDocument}
                  >
                    Сформировать документ
                  </Button>
                </FormControl>
              </div>
              {buildedUrl && (
                <div className="builded-url-row">
                  Документ успешно создан. Ссылка для скачивания{" "}
                  <a href={buildedUrl}>{buildedUrl}</a>.
                </div>
              )}
            </>
          )}
          {templateParameters.map(parameter => (
            <div className="form-row" key={`parameter-${parameter.id}`}>
              <TemplateParameter
                parameter={parameter}
                onChange={setParameterValue}
              />
            </div>
          ))}
          <div className="form-row">
            <FormControl>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={useBuildDocument}
              >
                Сформировать документ
              </Button>
            </FormControl>
          </div>
          {buildedUrl && (
            <div className="builded-url-row">
              Документ успешно создан. Ссылка для скачивания{" "}
              <a href={buildedUrl}>{buildedUrl}</a>.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentPage;
