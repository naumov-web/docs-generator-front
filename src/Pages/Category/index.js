import { Typography } from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { request, gql } from "graphql-request";

import apiConfig from "../../configs/api";

const useDocumentCategory = id =>
  useQuery("documentCategory", async () => {
    const { getDocumentCategory } = await request(
      apiConfig.endpoint,
      gql`
        query {
          getDocumentCategory(id:${id}) {
            name
          }
        }
      `
    );

    return getDocumentCategory;
  });

const useDocumentTypes = id =>
  useQuery("documentTypes", async () => {
    const {
      getDocumentTypes: { items }
    } = await request(
      apiConfig.endpoint,
      gql`
        query {
          getDocumentTypes(document_category_id:${id}) {
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

const CategoryPage = () => {
  const { id } = useParams();
  const {
    data: dataCategory,
    isFetching: isFetchingCategory
  } = useDocumentCategory(id);
  const { data: dataTypes, isFetching: isFetchingTypes } = useDocumentTypes(id);

  return (
    <div>
      {!isFetchingCategory && (
        <Typography variant="h5">{dataCategory.name}</Typography>
      )}
      {isFetchingTypes && (
        <Typography variant="h6" className="loading-text">
          Загрузка...
        </Typography>
      )}
      {!isFetchingTypes && (
        <List>
          {dataTypes.map(item => (
            <ListItem>
              <Link to={`/types/${item.id}`}>{item.name}</Link>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default CategoryPage;
