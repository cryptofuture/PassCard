package com.passcard;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebView;

public class MainActivity extends Activity {
    private WebView WebViewPassCard;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
        setContentView(R.layout.mainland);
        WebViewPassCard = (WebView) findViewById(R.id.webview);
        WebViewPassCard.getSettings().setDomStorageEnabled(true);
        WebViewPassCard.getSettings().setBuiltInZoomControls(true);
        WebViewPassCard.getSettings().setJavaScriptEnabled(true);
        WebViewPassCard.loadUrl("file:///android_asset/passwordcard.html");
    }
}
