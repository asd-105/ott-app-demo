
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

# TODOs:

-In general still needs to add state management, for example redux, that could also be used for 
requests and data management/transformation with RTK query,

## Catalog Improvements
- Currenlty the catalog is implemented using FlatList since that's the best match
        given the data that should be represented, hoever for future more complex list
        Nesting FlatLists inside a SectionList would be preferable to add ability to represent
        sorted data of multiple categories, for example video/movie genres
- Improved flatlist scroll animation for smoother scroll and to fully scroll the focused element into view
  
  ## Style improvements
- styles can be greatly improved making them scaleable by using app specific units that are calculated from screen dimensions multiplied by desired unit amount, for example instead of "lineHeight: 30" it would be "lineHeight: 30 x scale"
- adding more style constants, such as margin/padding values that are commonly used to improve style consistency and avoid errors when writing styles
- adding theme support for light/dark themes
## Focus Improvements
- Currently the default focus system on Android TV is used, however UX can be greatly improved implementing dedicated tv focus view components (from react native tvos) to create deliberate user-friendly focus flows

## Video player improvements
- Either the current used library "expo-video" player can be improved with more config and custom controls or another video library could be used

## Performance Improvements
- Thanks to react 19 react compiler most of memoization and other unnecessary re-render prevention is done "automatically", however after doing most of above mentioned todos performance profiling should be performed to check for any extra re-renders, memory leaks, etc.
- Video player performance should be investigated to see if it properly can stream/show all supported formats with adequate performance

## Testing improvements
- Test scaffolding should be created to support mocking modules such as VideoPlayer and to run integration tests with expo library using expo-router
- Adding test store wrapper for rendering components in test emvironment given that the todo about state management is done

REGARDING EXPO README BELOW AND RUŅING THE PROJECT ON ANDROID TV EMULATOR

For fully working demo this should run off development build and the project should be prebuilt with the respective script.

If running on windows amd having issues with setting the "EXPO_TV 1" variable, the first part of scripts setting the variable can be omitted.

to run you can use

"npx expo run:android --device"
and then choose the tv emulator from device list


EXPO README BELOW
####################################

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

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)
