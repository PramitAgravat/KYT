
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.thekyt.BuildConfig;
import com.thekyt.R;

// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/slider
import com.reactnativecommunity.slider.ReactSliderPackage;
// lottie-react-native
import com.airbnb.android.react.lottie.LottiePackage;
// react-native-android-open-settings
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
// react-native-app-tour
import ui.apptour.RNAppTourPackage;
// react-native-fast-image
import com.dylanvann.fastimage.FastImageViewPackage;
// react-native-firebase
import io.invertase.firebase.RNFirebasePackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-orientation
import com.github.yamill.orientation.OrientationPackage;
// react-native-pdf
import org.wonday.pdf.RCTPdfView;
// react-native-push-notification
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;
// react-native-youtube
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  public PackageList(ReactNativeHost reactNativeHost) {
    this.reactNativeHost = reactNativeHost;
  }

  public PackageList(Application application) {
    this.reactNativeHost = null;
    this.application = application;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new AsyncStoragePackage(),
      new ReactSliderPackage(),
      new LottiePackage(),
      new AndroidOpenSettingsPackage(),
      new RNAppTourPackage(),
      new FastImageViewPackage(),
      new RNFirebasePackage(),
      new RNGestureHandlerPackage(),
      new ImagePickerPackage(),
      new LinearGradientPackage(),
      new OrientationPackage(),
      new RCTPdfView(),
      new ReactNativePushNotificationPackage(),
      new ReanimatedPackage(),
      new RNSharePackage(),
      new SvgPackage(),
      new ReactVideoPackage(),
      new ReactNativeYouTube(),
      new RNFetchBlobPackage()
    ));
  }
}
