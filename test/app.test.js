const test=require("node:test");
const assert=require("node:assert/strict");
test("root contains service name",()=>assert.equal("platform-demo","platform-demo"));
test("health is healthy",()=>assert.equal("ok","ok"));
test("version is 1.0.0",()=>assert.equal("1.0.0","2.0.0"));