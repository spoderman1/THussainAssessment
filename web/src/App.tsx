import React from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { SubdivisionDisplay } from "./components/subdivision-display/SubdivisionDisplay";
import { ApolloProvider } from "@apollo/client";
import client from "./components/apollo/Apollo";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <br />
          <SubdivisionDisplay />
        </div>
      </ApolloProvider>
    </NextUIProvider>
  );
}

export default App;
