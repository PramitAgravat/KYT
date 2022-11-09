package com.thekyt.native_modules;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.webkit.MimeTypeMap;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.scanlibrary.RealPathUtil;
import com.scanlibrary.ScanActivity;
import com.scanlibrary.ScanConstants;


import java.io.File;
//
//import vi.pdfscanner.activity.BaseScannerActivity;
//import vi.pdfscanner.activity.CameraActivity;
//import vi.pdfscanner.activity.ScannerActivity;
//import vi.pdfscanner.activity.StartActivity;

public class ScannerModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    public final int REQUEST_CODE = 101;
    public final String SCANNED_RESULT = "scannedResult";
    private static final int SELECT_PHOTO = 0x201;
    String args = "";
    private Promise mResult;

    //constructor
    public ScannerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    //Mandatory function getName that specifies the module name
    @Override
    public String getName() {
        return "HKViewController";
    }

    @ReactMethod
    public void showScanner(int type, Promise promise) {
        mResult = promise;
        //this.args = arg;
        //int type=3;
        if (type == 3) {
            Intent photoPickerIntent = new Intent(
                    getCurrentActivity(), ScanActivity.class);
            photoPickerIntent.putExtra(ScanConstants.OPEN_INTENT_PREFERENCE, ScanConstants.OPEN_CAMERA);
            getCurrentActivity().startActivityForResult(photoPickerIntent, REQUEST_CODE);

        } else {
            Intent photoPickerIntent = new Intent(
                    getCurrentActivity(), ScanActivity.class);
            photoPickerIntent.putExtra(ScanConstants.OPEN_INTENT_PREFERENCE, ScanConstants.OPEN_MEDIA);
            getCurrentActivity().startActivityForResult(photoPickerIntent, REQUEST_CODE);
        }

       /* Intent intent =new Intent(getCurrentActivity(), ScanActivity.class);
        getCurrentActivity().startActivityForResult(intent,REQUEST_CODE);*/
        //  CameraActivity.startCamera(getCurrentActivity());
    }


//    @ReactMethod
//    public void scanFromGallery(String arg) {
//        this.args = arg;
//        Intent photoPickerIntent = new Intent(
//                getCurrentActivity(), ScanActivity.class);
//        photoPickerIntent.putExtra(ScanConstants.OPEN_INTENT_PREFERENCE, ScanConstants.OPEN_MEDIA);
//        getCurrentActivity().startActivityForResult(photoPickerIntent, REQUEST_CODE);
//    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
       /* if (requestCode == REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                if (null != data && null != data.getExtras()) {
                    try {
                        String filePath = data.getExtras().getString(SCANNED_RESULT);
                        // Create map for params
                        WritableMap payload = Arguments.createMap();
                        payload.putString("name", filePath);
                        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("ImageAvailable", payload);
                    } catch (Exception e) {
                    }
                }
            } else if (resultCode == Activity.RESULT_CANCELED) {
            }
        }*/


        if (requestCode == REQUEST_CODE && resultCode == Activity.RESULT_OK) {
            if (data.getExtras().containsKey(ScanConstants.SCANNED_RESULT)) {
                try {
//                    File original = new File(data.getStringExtra("data"));
//                    String extension = MimeTypeMap.getFileExtensionFromUrl(original.getAbsolutePath());
//                    WritableMap payload = Arguments.createMap();
//                    payload.putString("uri", data.getStringExtra("data"));
//                    payload.putString("name", original.getName());
//                    String type = "";
//                    if (extension != null) {
//                        type = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
//                    }
//                    payload.putString("type", type);

                    Uri uri = (Uri) data.getExtras().get(ScanConstants.SCANNED_RESULT);
                    String path = RealPathUtil.getRealPath(getCurrentActivity(), uri);
                    File original = new File(path);
                    String extension = MimeTypeMap.getFileExtensionFromUrl(original.getAbsolutePath());
                    WritableMap payload = Arguments.createMap();
                    payload.putString("uri", path);
                    payload.putString("name", original.getName());
                    payload.putString("args", args);
                    String type = "";
                    if (extension != null) {
                        type = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
                    }
                    payload.putString("type", type);
//                    getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                            .emit("ImageAvailable", payload);
                    mResult.resolve(payload);
                } catch (Exception e) {
                    mResult.reject(e);
                }
            }
        }
    }


    @Override
    public void onNewIntent(Intent intent) {

    }
}