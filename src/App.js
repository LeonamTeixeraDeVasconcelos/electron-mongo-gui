import React from "react";

import Sidebar from "./components/Sidebar";
import GlobalStyle from "./styles/global";
import { Container } from "./styles/components";

const App = () => (
  <Container>
    <Sidebar />

    <GlobalStyle />
  </Container>
);

export default App;
