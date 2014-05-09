package org.tpweb.formbuilder;

import java.io.IOException;

import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class FormViewer extends Activity {
	private WebView webview;
	private CouchDB couchdb;
	private CouchDBProxy proxy;
	private Handler handler = new Handler();

	@SuppressLint("SetJavaScriptEnabled")
	@TargetApi(Build.VERSION_CODES.HONEYCOMB)
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.formviewer);
		webview = (WebView) findViewById(R.id.webview);
		webview.setWebChromeClient(new WebChromeClient());
		webview.setWebViewClient(new WebViewClient());
		webview.clearCache(true);
		webview.clearHistory();
		webview.getSettings().setJavaScriptEnabled(true);
		webview.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

		
		
		couchdb = new CouchDB("formbuilder", MainActivity.server, MainActivity.serverPort, "http");
		

		if (getIntent() != null) { // send intent to show only favorite songs
			Bundle extras = getIntent().getExtras();
			String id = extras.getString("id");
			//webview.loadUrl("http://localhost:8080");
			new LoadData().execute(id, webview);
		} else {
			Intent i = new Intent(getApplicationContext(), MainActivity.class);
			i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
			startActivity(i);
		}
		
	    try {
	    	proxy = new CouchDBProxy(handler, this, couchdb);
		} catch (IOException e) {
			e.printStackTrace();
		}
	  }
	 
	  @Override
	  protected void onPause() {
	    super.onPause();
	    if (proxy != null)
	      proxy.stop();
	  }

	private class LoadData extends AsyncTask<Object, Void, Object> {
		private WebView webv;

		@Override
		protected Object doInBackground(Object... arg) {
			this.webv = (WebView) arg[1];
			return couchdb.getDocument(arg[0] + "");
		}

		@Override
		protected void onPostExecute(Object result) {
			if(result != null) {
				try {
					JSONObject json = (JSONObject)result;
					String html = json.getString("html");
					html = html.replace("index.php", "http://localhost:8080");
					webv.loadData(html, "text/html", "UTF-8");
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}

		@Override
		protected void onPreExecute() {
		}

		@Override
		protected void onProgressUpdate(Void... values) {

		}
	}
}
