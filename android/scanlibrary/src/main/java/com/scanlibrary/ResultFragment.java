package com.scanlibrary;

import android.app.Activity;
import android.app.Fragment;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;

import java.io.IOException;
/**
 * Created by jhansi on 29/03/15.
 */
public class ResultFragment extends Fragment {

    private View view;
    private ImageView scannedImageView;
    private Button doneButton;
    private Bitmap original;
    private Button originalButton;
    private Button MagicColorButton;
    private Button grayModeButton;
    private Button bwButton;
    private Bitmap transformed;

    public ResultFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.result_layout, null);
        init();
        return view;
    }

    private void init() {
        scannedImageView = (ImageView) view.findViewById(R.id.scannedImage);
        originalButton = (Button) view.findViewById(R.id.original);
        originalButton.setOnClickListener(new OriginalButtonClickListener());
        MagicColorButton = (Button) view.findViewById(R.id.magicColor);
        MagicColorButton.setOnClickListener(new MagicColorButtonClickListener());
        grayModeButton = (Button) view.findViewById(R.id.grayMode);
        grayModeButton.setOnClickListener(new GrayButtonClickListener());
        bwButton = (Button) view.findViewById(R.id.BWMode);
        bwButton.setOnClickListener(new BWButtonClickListener());
        Bitmap bitmap = getBitmap();
        setScannedImage(bitmap);
        doneButton = (Button) view.findViewById(R.id.doneButton);
        doneButton.setOnClickListener(new DoneButtonClickListener());
    }

    private Bitmap getBitmap() {
        Uri uri = getUri();
        try {
            original =  BitmapFactory.decodeFile(uri.getPath());
//            getActivity().getContentResolver().delete(uri, null, null);
            return original;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private Uri getUri() {
        Uri uri = getArguments().getParcelable(ScanConstants.SCANNED_RESULT);
        return uri;
    }

    public void setScannedImage(Bitmap scannedImage) {
        scannedImageView.setImageBitmap(scannedImage);
    }

    private class DoneButtonClickListener implements View.OnClickListener {
        @Override
        public void onClick(View v) {



            Intent data = new Intent();
            Bitmap bitmap = transformed;
            if (bitmap == null) {
                bitmap = original;
            }
            Uri uri = Utils.getUri(getActivity(), bitmap);
            Log.e("URI0",uri.toString());
            data.putExtra(ScanConstants.SCANNED_RESULT, uri);
            getActivity().setResult(Activity.RESULT_OK, data);
            original.recycle();
            System.gc();
            getActivity().finish();
        }
    }

    private class BWButtonClickListener implements View.OnClickListener {
        @Override
        public void onClick(View v) {
            transformed = ((ScanActivity) getActivity()).getBWBitmap(original);
            scannedImageView.setImageBitmap(transformed);
        }
    }

    private class MagicColorButtonClickListener implements View.OnClickListener {
        @Override
        public void onClick(View v) {
            transformed = ((ScanActivity) getActivity()).getMagicColorBitmap(original);
            scannedImageView.setImageBitmap(transformed);
        }
    }

    private class OriginalButtonClickListener implements View.OnClickListener {
        @Override
        public void onClick(View v) {
            transformed = original;
            scannedImageView.setImageBitmap(original);
        }
    }

    private class GrayButtonClickListener implements View.OnClickListener {
        @Override
        public void onClick(View v) {
            transformed = ((ScanActivity) getActivity()).getGrayBitmap(original);
            scannedImageView.setImageBitmap(transformed);
        }
    }

}