package com.passcard;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;

public class MainActivity extends Activity {
    private WebView WebViewPassCard;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= 21) {
            WebViewPassCard.enableSlowWholeDocumentDraw();
        }
        setContentView(R.layout.mainland);
        WebViewPassCard = (WebView) findViewById(R.id.webview);
        WebViewPassCard.getSettings().setBuiltInZoomControls(true);
        WebViewPassCard.getSettings().setJavaScriptEnabled(true);
        WebViewPassCard.getSettings().setDomStorageEnabled(true);
        WebViewPassCard.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        WebViewPassCard.loadUrl("file:///android_asset/passwordcard.html");
    }
}
