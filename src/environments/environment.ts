// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'localhost:3000',
  facebook: {
    appId: '568277443517279',
    xfbml: true,
    version: 'v2.11',
    graphUrl: 'https://graph.facebook.com/v2.8/',
  },
};
