
# Steps How to Run this on Android Emulator
Must have all pre-requisites 

- Node.js (LTS) on macOS or Linux.
- Android Studio (Iguana or later).
- In the Android Studio SDK manager, select the dropdown for the Android SDK you are using (API version 31 or later),   and make sure an Android TV system image is selected for installation. (For Apple silicon, choose the ARM 64 image. Otherwise, choose the Intel x86_64 image).
- After installing the Android TV system image, create an Android TV emulator using that image (the process is the same as creating an Android phone emulator).

(Taken from https://docs.expo.dev/guides/building-for-tv/)

Must Run on emulator using Expo development build, the TV focus system will not work properly via Expo-go.
(https://docs.expo.dev/develop/development-builds/create-a-build/)

Libraries used
react-native-tvos -> default go to for react native apps on TV with great support
using expo "package" -> used because it is a great wrapper for react-native and greatly helps with builds and managing native modules, also it provides routing and other related libraries such as "expo-video"
react-native-reanimated -> a very good and performant animation lib for RN and it already was included in my expo config


To run tests: "yarn test" in root directory. (Or use any other script runner to run script "test")

TODOs:

-In general still needs to add state management, for example redux, that could also be used for 
requests and data management/transformation with RTK query,

# Catalog Improvements
- Currenlty the catalog is implemented using FlatList since that's the best match
        given the data that should be represented, hoever for future more complex list
        Nesting FlatLists inside a SectionList would be preferable to add ability to represent
        sorted data of multiple categories, for example video/movie genres
- Improved flatlist scroll animation for smoother scroll and to fully scroll the focused element into view
  
  # Style improvements
- styles can be greatly improved making them scaleable by using app specific units that are calculated from screen dimensions multiplied by desired unit amount, for example instead of "lineHeight: 30" it would be "lineHeight: 30 x scale"
- adding more style constants, such as margin/padding values that are commonly used to improve style consistency and avoid errors when writing styles
- adding theme support for light/dark themes
# Focus Improvements
- Currently the default focus system on Android TV is used, however UX can be greatly improved implementing dedicated tv focus view components (from react native tvos) to create deliberate user-friendly focus flows

EXPO README BELOW
####################################

![Android TV screen shot](https://github.com/douglowder/examples/assets/6577821/815c8e01-8275-4cc1-bd57-b9c8bce1fb02)

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

This project uses

- the [React Native TV fork](https://github.com/react-native-tvos/react-native-tvos), which supports both phone (Android and iOS) and TV (Android TV and Apple TV) targets
- the [React Native TV config plugin](https://github.com/react-native-tvos/config-tv/tree/main/packages/config-tv) to allow Expo prebuild to modify the project's native files for TV builds

## 🚀 How to use

- `cd` into the project

```sh
yarn
yarn prebuild # Executes Expo prebuild with TV modifications
yarn android # Build for Android TV
```

> **_NOTE:_**
> Setting the environment variable `EXPO_TV=1` enables the `@react-native-tvos/config-tv` plugin to modify the project for TV.
> This can also be done by setting the parameter `isTV` to true in the `app.json`.

## Development

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

This project includes a [demo](./components/EventHandlingDemo.tsx) showing how to use React Native TV APIs to highlight controls as the user navigates the screen with the remote control.

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)

## TV specific file extensions

This project includes an [example Metro configuration](./metro.config.js) that allows Metro to resolve application source files with TV-specific code, indicated by specific file extensions (`*.ios.tv.tsx`, `*.android.tv.tsx`, `*.tv.tsx`). The [ExternalLink](./components/ExternalLink.tsx) component makes use of this by having a [separate TV source file](./components/ExternalLink.tv.tsx) that avoids importing packages that don't exist on Apple TV.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/learn): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
