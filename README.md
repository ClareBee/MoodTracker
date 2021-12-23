
https://www.typescriptlang.org/tsconfig

## Adding Navigation

`yarn add @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/bottom-tabs`

### Android:
`react-native-screens` has extra step: `android/app/src/main/java/moodtracker/MainActivity.java`

MainActivity class:
```
import android.os.Bundle;
//
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(null);
}
```
### iOS:

`cd ios && pod install`


## Adding Storage
https://react-native-async-storage.github.io/async-storage/docs/api/
(can only store serializable things!)

`yarn add @react-native-async-storage/async-storage`

Requires: `cd ios && pod install && cd ..`

## Adding Images
 "display points" -> relative depending on screen size.
e.g. `width: (10 * pixel_density)px`
- best practice to include images at 3 sizes to support different screen resolutions 
- e.g. `/assets/myPic@2x.png`

By default, images are sized based on resolution of main image file. 
Custom: width, height and aspectRatio 
```
height: 100,
aspectRatio: 2,
```


Or fixed height & width with `resizeMode` prop e.g. `resizeMode="contain"` maintains aspect ratio of original.

### Image Background
https://reactnative.dev/docs/imagebackground

react-native-fast-image for images loaded via url - perf optimizations (cache, preload etc.)
https://github.com/DylanVann/react-native-fast-image

### SVG
https://github.com/react-native-svg/react-native-svg
```
yarn add react-native-svg
cd ios && pod install && cd ..
```

SVG conversion: https://react-svgr.com/playground/

## Fonts
https://fonts.google.com/

Fonts treated differently in iOS and Android.
- Android, fontFamily = name of file.
- iOS apps, fontFamily = PostScript name of font. To check PostScript name, double-click on .tff file on a Mac => Choose install font, click on i (information) icon 

**i.e. font files should be named after the PostScript name!**

`/assets/fonts`

`react-native.config.js`
```javascript
module.exports = {
  assets: ['./assets/fonts'],
};
```
`npx react-native link` (copies files over to /ios and /android)
Then rebuild app.

## Animation
### LayoutAnimation - 
From: https://reactnative.dev/docs/layoutanimation
> Automatically animates views to their new positions when the next layout happens.

> A common way to use this API is to call it before updating the state hook in functional components 
> Note that in order to get this to work on Android you need to set the following flags via UIManager:
```javascript
// App.tsx

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
``` 
- Still 'experimental' in Android, so double-check

### Reanimated 2
https://docs.swmansion.com/react-native-reanimated/docs/

> Reanimated is a React Native library that allows for creating smooth animations and interactions that runs on the UI thread.
> Reanimated aims to provide ways of offloading animation and event handling logic off of the JavaScript thread and onto the UI thread. This is achieved by defining Reanimated worklets – a tiny chunks of JavaScript code that can be moved to a separate JavaScript VM and executed synchronously on the UI thread. This makes it possible to respond to touch events immediately and update the UI within the same frame when the event happens without worrying about the load that is put on the main JavaScript thread.

`yarn add react-native-reanimated@next`

Add as the **last** plugin:
```javascript
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```
Hermes - RN's JS runtime