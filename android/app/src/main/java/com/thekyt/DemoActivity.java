package com.thekyt;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.scanlibrary.ScanActivity;
import com.scanlibrary.ScanConstants;

public class DemoActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_demo);
    }

    public void take(View view) {
        Intent photoPickerIntent = new Intent(
                this, ScanActivity.class);
        photoPickerIntent.putExtra(ScanConstants.OPEN_INTENT_PREFERENCE, ScanConstants.OPEN_CAMERA);
        this.startActivityForResult(photoPickerIntent, 1111);

    }

    public void pick(View view) {
        Intent photoPickerIntent = new Intent(
                this, ScanActivity.class);
        photoPickerIntent.putExtra(ScanConstants.OPEN_INTENT_PREFERENCE, ScanConstants.OPEN_MEDIA);
        this.startActivityForResult(photoPickerIntent, 2211);

    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if(data!=null){
            if(data.getExtras()!=null){



                Toast.makeText(this, data.getExtras().get(ScanConstants.SCANNED_RESULT).toString(), Toast.LENGTH_SHORT).show();
            }
        }
    }
}
