import {
    Application,
    Router,
    send,
  } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const port = 8000;
  

app.use(async (ctx: any) => {
  const filePath = ctx.request.url.pathname;
  console.log(filePath);
  await send(ctx, filePath, {
    root: `${Deno.cwd()}`,
  });
});

console.log(`Starting server on port ${port}...`);

app.listen({ port, secure:true, keyFile:"./cert/localhost-key.pem", certFile:"./cert/localhost.pem"});

//Deno.run({ cmd: ["explorer", `https://localhost:${port}/readme.html`] });