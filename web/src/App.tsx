import React from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { SubdivisionDisplay } from "./components/subdivision-display/SubdivisionDisplay";
import { ApolloProvider } from "@apollo/client";
import client from "./components/apollo/Apollo";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <SubdivisionDisplay />
      </div>
    </ApolloProvider>
  );
}

export default App;
