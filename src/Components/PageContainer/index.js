import { Breadcrumbs } from "@material-ui/core";
import { Link } from "react-router-dom";

const PageContainer = ({ children }) => {
  return (
    <div className="page-container">
      <Breadcrumbs separator="/" className="breadcrumbs">
        <Link to="/">Главная страница</Link>
      </Breadcrumbs>
      {children}
    </div>
  );
};

export default PageContainer;
