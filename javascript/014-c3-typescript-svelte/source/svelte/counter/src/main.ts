// import "./app.css";
import App from "./App.svelte";

// const app = new App({
//   target: document.getElementById("app") || document.body,
// });

declare global {
  var Counter: unknown;
}

globalThis.Counter = () =>
  new App({
    target: document.getElementById("counter") || document.body,
  });

export default globalThis.Counter;
