import { Typography } from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
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
    data: category,
    isFetching: isFetchingCategory
  } = useDocumentCategory(id);
  const { data: types, isFetching: isFetchingTypes } = useDocumentTypes(id);

  return (
    <div>
      {!isFetchingCategory && (
        <Typography variant="h5">{category.name}</Typography>
      )}
      {isFetchingTypes && (
        <Typography variant="h6" className="loading-text">
          Загрузка...
        </Typography>
      )}
      {!isFetchingTypes && (
        <List>
          {types.map(item => (
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
