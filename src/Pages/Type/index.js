import { Typography } from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { request, gql } from "graphql-request";

import apiConfig from "../../configs/api";

const useDocumentType = id =>
  useQuery("documentType", async () => {
    const { getDocumentType } = await request(
      apiConfig.endpoint,
      gql`
        query {
          getDocumentType(id:${id}) {
            name
          }
        }
      `
    );

    return getDocumentType;
  });

const useDocuments = id =>
  useQuery("documents", async () => {
    const {
      getDocuments: { items }
    } = await request(
      apiConfig.endpoint,
      gql`
        query {
          getDocuments(document_type_id:${id}) {
            items {
              id,
              name
            }
          }
        }
      `
    );

    return items;
  });

const TypePage = () => {
  const { id } = useParams();
  const { data: type, isFetching: isFetchingType } = useDocumentType(id);
  const { data: documents, isFetching: isFetchingDocuments } = useDocuments(id);

  return (
    <div>
      {!isFetchingType && <Typography variant="h5">{type.name}</Typography>}
      {isFetchingDocuments && (
        <Typography variant="h6" className="loading-text">
          Загрузка...
        </Typography>
      )}
      {!isFetchingDocuments && (
        <List>
          {documents.map(item => (
            <ListItem>
              <Link to={`/documents/${item.id}`}>{item.name}</Link>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default TypePage;
