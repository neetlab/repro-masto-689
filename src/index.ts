import assert from "node:assert";

import { login } from "masto";

assert(typeof process.env.MASTODON_TOKEN === "string");

const masto = await login({
  url: "https://mastodon.social",
  accessToken: process.env.MASTODON_TOKEN,
});

const me = await masto.accounts.verifyCredentials();

for await (const statuses of masto.accounts.getStatusesIterable(me.id, {
  exclude_replies: true,
} as any)) {
  console.log(statuses.map((status) => status.content));
  break;
}
