import { StartClient, mount } from "@solidjs/start/client";

const app = document.querySelector("#app");
if (app == null) {
  throw new Error("#app element not found");
}
mount(() => <StartClient />, app);
