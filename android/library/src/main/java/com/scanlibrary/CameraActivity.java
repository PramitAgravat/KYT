package com.scanlibrary;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.annotation.Nullable;

import com.otaliastudios.cameraview.CameraListener;
import com.otaliastudios.cameraview.CameraView;
import com.otaliastudios.cameraview.FileCallback;
import com.otaliastudios.cameraview.PictureResult;

import java.io.File;

public class CameraActivity extends Activity {
    CameraView camera;

    @Override
    protected void onResume() {
        super.onResume();
        camera.open();
    }

    @Override
    protected void onPause() {
        super.onPause();
        camera.close();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        camera.destroy();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_camera);
        camera = (CameraView) findViewById(R.id.camera_view);
        //camera.setLifecycleOwner(this);
        camera.addCameraListener(new CameraListener() {
            @Override
            public void onPictureTaken(PictureResult result) {
                String tempFileUri = getIntent().getExtras().getString("path");

                //Log.e("URI",RealPathUtil.getRealPath(CameraActivity.this, tempFileUri));
                result.toFile(new File(tempFileUri), new FileCallback() {
                    @Override
                    public void onFileReady(@Nullable File file) {
                        Intent intent = new Intent();
                        intent.putExtra("data", file.getAbsolutePath());
                        setResult(RESULT_OK, intent);
                        finish();
                        // Toast.makeText(CameraActivity.this, file.getPath(), Toast.LENGTH_SHORT).show();
                    }
                });
            }

            // And much more
        });


        findViewById(R.id.capture).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                camera.takePicture();
            }
        });
    }
}
