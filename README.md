
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
`npx react-native link` (copies files over to /ios and /android => run when the dependency contains native code)
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

Android:
1. `android/app/build.gradle`:
```javascript
project.ext.react = [
  enableHermes: true // <- here | clean and rebuild if changing
]
```
2. `MainApplication.java`
```java
import com.facebook.react.bridge.JSIModulePackage; // <- add
import com.swmansion.reanimated.ReanimatedJSIModulePackage; // <- add 
private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
...

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected JSIModulePackage getJSIModulePackage() {
      return new ReanimatedJSIModulePackage(); // <- add
    }
  };
...
```

iOS:
- install native dependencies: `cd ios && pod install && cd ..`

Restart & blitz cache: `yarn start --reset-cache`

Examples:
useAnimatedStyle: 
https://docs.swmansion.com/react-native-reanimated/docs/api/hooks/useAnimatedStyle/

withTiming:
https://docs.swmansion.com/react-native-reanimated/docs/api/animations/withTiming/

Only Reanimated components can use animated styles:
```javascript
import Reanimated from 'react-native-reanimated';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);
```

## Gestures
React Native Gesture Handler: https://docs.swmansion.com/react-native-gesture-handler/docs/
> The motivation for building this library was to address the performance limitations of React Native's Gesture Responder System and to provide more control over the built-in native components that can handle gestures. We recommend this talk by Krzysztof Magiera in which he explains issues with the responder system.

`yarn add react-native-gesture-handler`

`index.js` as **first line**:
```javascript
import 'react-native-gesture-handler';
```
Docs:
After installation, wrap entry point with <GestureHandlerRootView> or gestureHandlerRootHOC.

```javascript
export default function App() {
  return <GestureHandlerRootView>{/* content */}</GestureHandlerRootView>;
}
```

iOS:
`cd ios && pod install`

Android:
>Update your MainActivity.java file, so that it overrides the method responsible for creating ReactRootView instance and then use the root view wrapper provided by this library. Do not forget to import ReactActivityDelegate, ReactRootView, and RNGestureHandlerEnabledRootView:

```java
package com.swmansion.gesturehandler.react.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "MoodTracker";
  }
+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}
```