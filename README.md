### Chrome Extension for optimizing Google Meet creation


## Installing and Running

### Procedures:

1. Check if your [Node.js](https://nodejs.org/) version is >= **10.13**.
2. Clone this repository.
3. Run `npm install` to install the dependencies. If you get any authorization issues, try running `sudo npm install`
4. Run `npm start` or `sudo npm start`
5. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
6. Now you are all set to use the extension.

## Structure

All the extension's code is placed in the `src` folder.

## Features

This is a Chrome Extension to help you to ease the process of Google Meeting creation.
Following are the basic features targeted  around this chrome extension:

1. Allow users to create a new google meet meeting and and allow users to quickly share the link with others.
2. Optimize meeting creation by allowing users to create and share links via keyboard alone.
3. Allow users to choose which email to create a meeting with and cache the first selection for simultaneous meetings.

### Keyboard Shortcuts
1. `ALT+G` : Launch the Chrome Extension
2. `ALT+N` : Create a new meeting
3. `ALT+C` : Copy the meeting link onto Clipboard

**Combination of above keypress events** are able to allow users to create and share the meeting via keyboard alone.

This project is updated with:

- [React 16.13](https://reactjs.org)
- [Webpack 4](https://webpack.js.org/)
- [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app)
- [Prettier](https://prettier.io/)



Please open up an issue to nudge me to keep the npm packages up-to-date. FYI, it takes time to make different packages with different versions work together nicely.

## Optimization Specification

1. API_KEY and access codes to the google API are supposed to be hidden in a separate file and must not be shared. But for the sake of **convenience and testing** are shared with you.
2. This project can be easily enhanced by adding a feature to open the **newly created link in a new tab**.
3. New features like **adding the attendees and notifying them** can be very easily added as a feature because of the use of Google Calendar Api.
## Webpack auto-reload and HRM

To make your workflow much more efficient this boilerplate uses the [webpack server](https://webpack.github.io/docs/webpack-dev-server.html) to development (started with `npm start`) with auto reload feature that reloads the browser automatically every time that you save some file in your editor.

You can run the dev mode on other port if you want. Just specify the env var `port` like this:

```
$ PORT=6002 npm run start
```

## Content Scripts

Although this boilerplate uses the webpack dev server, it's also prepared to write all your bundles files on the disk at every code change, so you can point, on your extension manifest, to your bundles that you want to use as [content scripts](https://developer.chrome.com/extensions/content_scripts), but you need to exclude these entry points from hot reloading [(why?)](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/issues/4#issuecomment-261788690). To do so you need to expose which entry points are content scripts on the `webpack.config.js` using the `chromeExtensionBoilerplate -> notHotReload` config. Look the example below.

Let's say that you want use the `myContentScript` entry point as content script, so on your `webpack.config.js` you will configure the entry point and exclude it from hot reloading, like this:

```js
{
  …
  entry: {
    myContentScript: "./src/js/myContentScript.js"
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["myContentScript"]
  }
  …
}
```

and on your `src/manifest.json`:

```json
{
  "content_scripts": [
    {
      "matches": ["https://www.google.com/*"],
      "js": ["myContentScript.bundle.js"]
    }
  ]
}
```

## Intelligent Code Completion

Thanks to [@hudidit](https://github.com/lxieyang/chrome-extension-boilerplate-react/issues/4)'s kind suggestions, this boilerplate supports chrome-specific intelligent code completion using [@types/chrome](https://www.npmjs.com/package/@types/chrome). For example:

![intellisense](https://lxieyang.github.io/static/chrome-extension-boilerplate-dev-intellisense-ed9e7c485d3eaf66417e5da4748e2c97.png)

## Packing

After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

## Secrets

If you are developing an extension that talks with some API you probably are using different keys for testing and production. Is a good practice you not commit your secret keys and expose to anyone that have access to the repository.

To this task this boilerplate import the file `./secrets.<THE-NODE_ENV>.js` on your modules through the module named as `secrets`, so you can do things like this:

_./secrets.development.js_

```js
export default { key: '123' };
```

_./src/popup.js_

```js
import secrets from 'secrets';
ApiCall({ key: secrets.key });
```

:point_right: The files with name `secrets.*.js` already are ignored on the repository.

## Resources:

- [Webpack documentation](https://webpack.js.org/concepts/)
- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)

---

Michael Xieyang Liu | [Website](https://lxieyang.github.io)
