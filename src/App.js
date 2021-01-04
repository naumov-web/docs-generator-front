import { Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";

import Router from "./Router";

import "./styles/main.sass";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Container maxWidth="lg">
          <Typography className="main-title" variant="h4">
            Генератор документов
          </Typography>
          <Router />
        </Container>
      </QueryClientProvider>
    </div>
  );
}

export default App;
