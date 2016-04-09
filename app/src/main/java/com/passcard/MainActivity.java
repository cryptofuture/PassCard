package com.passcard;

import android.annotation.SuppressLint;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {
    private WebView WebViewPassCard;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebViewPassCard.setWebContentsDebuggingEnabled(true);
        }
        /* Can broke build with current SDK used
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            WebViewPassCard.enableSlowWholeDocumentDraw();
        }
        */
        setContentView(R.layout.mainland);
        WebViewPassCard = (WebView) findViewById(R.id.webview);
        WebViewPassCard.loadUrl("file:///android_asset/passwordcard.html");
        WebViewPassCard.getSettings().setDomStorageEnabled(true);
        WebViewPassCard.getSettings().setBuiltInZoomControls(true);
        WebViewPassCard.getSettings().setJavaScriptEnabled(true);
        WebViewPassCard.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
    }
}
