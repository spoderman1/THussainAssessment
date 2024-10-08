import express from "express";
import subdivisionRouter from "./routes/subdivision";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolver";

const app = express();
const apolloServer = new ApolloServer({ typeDefs, resolvers });
const port = 3000;
async function startApolloServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/sub/", subdivisionRouter);

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
}

startApolloServer();
