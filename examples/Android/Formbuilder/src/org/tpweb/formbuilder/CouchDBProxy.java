package org.tpweb.formbuilder;

import java.io.IOException;
import java.util.Properties;
import java.util.Map.Entry;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.os.Handler;
import android.util.Log;

public class CouchDBProxy extends NanoHTTPD {
	private Handler handler;
	private Activity activity;
	private CouchDB couchdb;
    public CouchDBProxy(Handler h, Activity a, CouchDB couchdb) throws IOException {
	      super(8080, null);
	      handler = h;
	      activity = a;
	      this.couchdb = couchdb;
	    }
	 
	    @Override
	    public Response serve(String uri, String method, Properties header, Properties parms, Properties files) {
	    	if(method.equals("POST")) {
	    		Log.i("server", uri);
	    		Log.i("server", method);
	    		JSONObject json = new JSONObject();
	    		for (Entry<Object, Object> kv : parms.entrySet()) {
	    			try {
						json.put(kv.getKey().toString(), kv.getValue());
					} catch (JSONException e) {
						e.printStackTrace();
					}
	    		}
	    		couchdb.createDocument("formdata", json);
	    		activity.finish();
	    	}
	      
	      final StringBuilder buf = new StringBuilder();
	      for (Entry<Object, Object> kv : parms.entrySet())
	        buf.append(kv.getKey() + " : " + kv.getValue() + "\n");
	      handler.post(new Runnable() {
	        @Override
	        public void run() {
	        	Log.i("server", buf.toString());
	          //hello.setText(buf);
	        }
	      });
	      final String html = "<html><head><head><body><h1>Hello, World</h1></body></html>";
	      return new NanoHTTPD.Response(HTTP_OK, MIME_HTML, html);
	    }
	  }