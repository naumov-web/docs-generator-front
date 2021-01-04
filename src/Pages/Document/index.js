import { Typography, FormControl, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
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

const DocumentPage = () => {
  const { id } = useParams();
  const { data: document, isFetching: isFetchingDocument } = useDocument(id);
  const {
    data: templateParameters,
    isFetching: isFetchingParameters
  } = useDocumentTemplateParameters(id);

  return (
    <div>
      {!isFetchingDocument && (
        <Typography variant="h5">{document.name}</Typography>
      )}
      {!isFetchingParameters && (
        <form action="" method="post">
          {templateParameters.map(parameter => (
            <div className="form-row" key={`parameter-${parameter.id}`}>
              <TemplateParameter parameter={parameter} />
            </div>
          ))}
          <div className="form-row">
            <FormControl>
              <Button variant="contained" color="primary">
                Сформировать документ
              </Button>
            </FormControl>
          </div>
        </form>
      )}
    </div>
  );
};

export default DocumentPage;
