const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("../src/app");

let server, baseUrl;

before(async () => {
  server = createServer();
  await new Promise((r) => server.listen(0, r));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

test("GET / contains service name", async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.equal((await res.json()).service, "platform-demo");
});

test("GET /health is healthy", async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.deepEqual(await res.json(), { status: "ok" });
});

test("GET /version returns service and version", async () => {
  const res = await fetch(`${baseUrl}/version`);
  assert.deepEqual(await res.json(), { service: "platform-demo", version: "1.0.0" });
});

test("unknown route returns 404", async () => {
  const res = await fetch(`${baseUrl}/nope`);
  assert.equal(res.status, 404);
});
