package org.tpweb.formbuilder;

import java.util.ArrayList;
import java.util.HashMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.os.AsyncTask;
import android.os.Bundle;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ListView;

public class MainActivity extends Activity {
	private ListView list;
	private ListAdapter adapter;
	final String TAG = "Couchdb Project";
	private ArrayList<HashMap<String, Object>> contentList;
	private SharedPreferences prefs;
	public static String server = "192.168.21.139";
	public static String serverPort = "5984";
	private Activity activity;
	
	private CouchDB couchdb;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		list = (ListView) findViewById(R.id.listview);
		list.setEmptyView(findViewById(R.id.emptyView));
		contentList = new ArrayList<HashMap<String,Object>>();
		activity = this;

		prefs = getSharedPreferences("chouchdbeProject", Context.MODE_PRIVATE);
		server = prefs.getString("server", server);
		
		couchdb = new CouchDB("formbuilder", server, serverPort, "http");

		new LoadData().execute();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle item selection
		switch (item.getItemId()) {
		case R.id.action_settings: // menu show all songs.
			startActivity(new Intent(getApplicationContext(), SettingsActivity.class));
			return true;
		default:
			return super.onOptionsItemSelected(item);
		}
	}
	
    private class LoadData extends AsyncTask<Void, Void, Object> {
		@Override
		protected Object doInBackground(Void... arg0) {
			if(couchdb.createDatabase("formbuilder")) {
				return couchdb.getAllDocuments();
			}
			
			return null;
		}

		@Override
		protected void onPostExecute(Object result) {
			contentList.clear();
			if(result != null) {
				@SuppressWarnings("unchecked")
				HashMap<String, Object> r = (HashMap<String, Object>)result;
				if(r.containsKey("rows")) {
					try {
						JSONArray jsonResponse = new JSONArray(r.get("rows") + "");
						for(int i = 0; i < jsonResponse.length(); i++) {
							JSONObject json = new JSONObject(jsonResponse.get(i) + "");
							HashMap<String, Object> map = new HashMap<String, Object>();
							map.put("id", json.getString("id"));
							contentList.add(map);
						}
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}
			}
			adapter = new ListAdapter(activity, contentList, couchdb);
			list.setAdapter(adapter);
			list.setOnItemClickListener(new OnItemClickListener() {
				@Override
				public void onItemClick(AdapterView<?> parent, View view, int position, long _id) {
					String id = (String) contentList.get(position).get("id");
					Intent i = new Intent(getApplicationContext(), FormViewer2.class);
					i.putExtra("id", id);
					startActivity(i);
				}
			});
		}

		@Override
		protected void onPreExecute() {
		}

		@Override
		protected void onProgressUpdate(Void... values) {

		}

	}
}