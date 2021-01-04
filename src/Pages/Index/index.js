import { Typography } from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

import apiConfig from "../../configs/api";

const useDocumentCategories = () =>
  useQuery("documentCategories", async () => {
    const {
      getDocumentCategories: { items }
    } = await request(
      apiConfig.endpoint,
      gql`
        query {
          getDocumentCategories {
            items {
              id
              name
            }
          }
        }
      `
    );

    return items;
  });

const IndexPage = () => {
  const { data: categories, isFetching } = useDocumentCategories();

  return (
    <div>
      <Typography variant="h5">Категории документов</Typography>
      {isFetching && (
        <Typography variant="h6" className="loading-text">
          Загрузка...
        </Typography>
      )}
      {!isFetching && (
        <List>
          {categories.map(item => (
            <ListItem>
              <Link to={`/categories/${item.id}`}>{item.name}</Link>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default IndexPage;
