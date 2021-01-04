import { BrowserRouter, Switch, Route } from "react-router-dom";
import IndexPage from "../Pages/Index";
import CategoryPage from "../Pages/Category";
import TypePage from "../Pages/Type";
import DocumentPage from "../Pages/Document";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={IndexPage} />
      <Route path="/categories/:id" exact component={CategoryPage} />
      <Route path="/types/:id" exact component={TypePage} />
      <Route path="/documents/:id" exact component={DocumentPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
