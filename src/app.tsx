// @refresh reload
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { NavBar } from "./components/NavBar";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Tierlist</Title>
          <NavBar />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
