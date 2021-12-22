
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