package org.tpweb.formbuilder;

import java.util.ArrayList;
import java.util.HashMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

public class ListAdapter  extends BaseAdapter {
	private Activity activity;
    private ArrayList<HashMap<String, Object>> data;
    private static LayoutInflater inflater=null;
    private CouchDB couchdb;
    
    public ListAdapter(Activity a, ArrayList<HashMap<String, Object>> d, CouchDB couchdb) {
        activity = a;
        data=d;
        inflater = (LayoutInflater)activity.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        this.couchdb = couchdb;
    }
	
	@Override
	public int getCount() {
		return data.size();
	}

	@Override
	public Object getItem(int position) {
		return position;
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		View vi=convertView;
        if(convertView==null) {
            vi = inflater.inflate(R.layout.row, null);
        }
        TextView _title = (TextView)vi.findViewById(R.id.title);
        HashMap<String, Object> content = data.get(position);
        new LoadData().execute(content.get("id"), _title);
		
        return vi;
	}
	
	private class LoadData extends AsyncTask<Object, Void, Object> {
		private TextView _title;

		@Override
		protected Object doInBackground(Object... arg) {
			this._title = (TextView) arg[1];
			return couchdb.getDocument(arg[0] + "");
		}

		@Override
		protected void onPostExecute(Object result) {
			if(result != null) {
				try {
					JSONObject json = (JSONObject)result;
					JSONArray names = json.names();
					_title.setText(json.getString("_id"));
					for(int i = 0; i < names.length(); i++) {
						Log.i("couchdb", names.get(i).toString());
					}
				} catch (JSONException e) {
					// TODO Auto-generated catch block
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