// server.js

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import bodyParser from "body-parser";

// Apollo Server imports for Express integration
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "../graphql/schema.js";

import passport from "passport";
import configurePassport from "./config/passport.js";

import { router as routes } from "./routes/index.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Parse URL-encoded bodies and JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser and session middleware
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Mount REST routes from  routes index
app.use("/", routes);


// Setup ApolloServer and integrate with Express at /graphql
async function startServer() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start(); // top-level await is allowed in ES modules

  app.use(
    "/graphql",
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );
}
await startServer();


// 404 handler for unmatched routes (REST)
app.use((req, res) => {
  res.status(404);
  // res.render("404");
  res.status(404).json({ error: "Page not found" });
});


// Start the Express server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
