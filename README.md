
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

