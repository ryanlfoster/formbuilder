package org.tpweb.formbuilder;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class FormViewer extends Activity {
	private WebView webview;

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

		//couchdb = new CouchDB("formbuilder", MainActivity.server, MainActivity.serverPort, "http");
		
		if (getIntent() != null) { // send intent to show only favorite songs
			Bundle extras = getIntent().getExtras();
			String id = extras.getString("id");
			//webview.loadUrl("http://localhost:8080");
			String webpage = "<!doctype html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Tjebbe's FormBuilder</title>" +
							"<link rel=\"stylesheet\" href=\"https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css\">" +
							"<link rel=\"stylesheet\" href=\"https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css\">" + 
							"<script src=\"http://code.jquery.com/jquery-2.1.0.js\"></script>" + 
							"<script src=\"https://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js\"></script>" +
							"<script src=\"https://rawgit.com/TPWeb/formbuilder/master/libs/json2.js\"></script>" + 
							"<script src=\"https://rawgit.com/TPWeb/formbuilder/master/libs/couchdb.js\" type=\"text/javascript\"></script>" +
							"<script src=\"https://rawgit.com/TPWeb/formbuilder/master/libs/viewer2.min.js\"></script>" +
							"<script>$(function() { var loadForm = \"\"; loadForm = \"\"; $('.formuliermaker').FormViewer({atabaseData: {'database':'couchdb', 'dbname':'formbuilder', 'username':'', 'password':'', 'server':'http://" + MainActivity.server + ":5984'}, database: {'database':'couchdb', 'dbname':'formbuilder', 'username':'', 'password':'', 'server':'http://" + MainActivity.server + ":5984'}, formId:'" + id + "'}); " +
							"});</script>" +
							"<style>.formbuilder .row {border: 1px solid #DDD;}.colomn {border: 1px solid #EEE;min-height: 50px;}.active {border: 1px solid #000;}</style>" +
							"</head><body></body></html>";
			webview.loadData(webpage, "text/html", "UTF-8");
			//new LoadData().execute(id, webview);
		} else {
			Intent i = new Intent(getApplicationContext(), MainActivity.class);
			i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
			startActivity(i);
		}
	  }
}
