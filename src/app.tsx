// @refresh reload
import { PRPCProvider } from "@solid-mediakit/prpc/provider";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { QueryClient } from "@tanstack/solid-query";
import { Suspense } from "solid-js";
import "./app.css";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Create JD App</Title>
          <Suspense>
            <PRPCProvider queryClient={queryClient}>
              {props.children}
            </PRPCProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
