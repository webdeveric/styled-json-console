# `json-console`

Create a custom Node.js [`Console`](https://nodejs.org/api/console.html#new-consoleoptions) that automatically adds colors to [`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) strings.

## Install

```shell
pnpm add json-console
```

## Usage

```ts
import { createConsole } from 'json-console';

const myConsole = createConsole({
  // Options go here
});

myConsole.log(
  JSON.stringify({
    message: 'Hello, World!',
    now: Date.now(),
  }),
);
```

### [Example](./example/index.ts)

Checkout this repo then run this:

```sh
pnpm install
pnpm build
node ./example/index.ts
```
