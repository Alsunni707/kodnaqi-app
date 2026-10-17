package com.kodnaqi.diagnostics;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import androidx.core.content.FileProvider;
import com.getcapacitor.BridgeActivity;
import java.io.File;
import java.io.FileOutputStream;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView webView = getBridge().getWebView();
        webView.addJavascriptInterface(new WebAppInterface(), "AndroidBridge");
    }

    public class WebAppInterface {
        @JavascriptInterface
        public void savePDF(String base64Data, String fileName) {
            runOnUiThread(() -> {
                try {
                    String base64 = base64Data.substring(base64Data.indexOf(",") + 1);
                    byte[] decodedBytes = Base64.decode(base64, Base64.DEFAULT);
                    File file = new File(getCacheDir(), fileName);
                    try (FileOutputStream fos = new FileOutputStream(file)) {
                        fos.write(decodedBytes);
                    }
                    Uri uri = FileProvider.getUriForFile(MainActivity.this, getPackageName() + ".fileprovider", file);
                    Intent intent = new Intent(Intent.ACTION_VIEW);
                    intent.setDataAndType(uri, "application/pdf");
                    intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    startActivity(intent);
                } catch (Exception e) { e.printStackTrace(); }
            });
        }
        
        @JavascriptInterface
        public void closeReport() {
            runOnUiThread(() -> {
                // العودة للصفحة السابقة داخل التطبيق
                getBridge().getWebView().evaluateJavascript("window.history.back();", null);
            });
        }
    }

    @Override
    public void onBackPressed() {
        WebView webView = getBridge().getWebView();
        // نتحقق من الجافاسكريبت إذا كان هناك شيء يجب إغلاقه
        webView.evaluateJavascript("(function() { if (window.knHandleBack) { return window.knHandleBack(); } return 'NOT_HANDLED'; })()", value -> {
            if (value != null && value.contains("HANDLED")) {
                // الجافاسكريبت تعاملت مع الأمر (أغلقت التقرير)
            } else {
                // إذا لم يكن هناك شيء للإغلاق، أغلق التطبيق
                super.onBackPressed();
            }
        });
    }
}
