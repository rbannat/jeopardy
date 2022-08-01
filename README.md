# Jeopardy for team meetings

A Jeopardy clone for team meetings built with Svelte and SvelteKit.

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Using a Google Spreadsheet to manage questions and answers content

1. [Create a Google Cloud Project](https://developers.google.com/workspace/guides/create-project)
2. [Enable Spreadsheet API](https://developers.google.com/workspace/guides/enable-apis)
3. [Create a service account and access credentials](https://developers.google.com/workspace/guides/create-credentials#service-account)
4. Copy [spreadsheet template](https://docs.google.com/spreadsheets/d/11pW5DrMpTZKJ5i2pA_bm6W85bvihNHPVO0BpuNyanoE/)
5. Share copied spreadsheet with created service account
6. Create `.env` file and add credentials

   ```sh
   mv .env.example .env
   ```
