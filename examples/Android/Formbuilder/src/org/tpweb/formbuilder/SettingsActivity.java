package org.tpweb.formbuilder;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.KeyEvent;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.TextView.OnEditorActionListener;

public class SettingsActivity extends Activity {
	private SharedPreferences prefs;
	private SharedPreferences.Editor prefsEdit;
	private EditText server;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		setContentView(R.layout.settings);

		prefs = getSharedPreferences("chouchdbProject", Context.MODE_PRIVATE);
		prefsEdit = prefs.edit();
		
		
		server = (EditText) findViewById(R.id.txt_server);
		
		server.setText(prefs.getString("server", "192.168.21.127"));
		
		server.setOnEditorActionListener(new OnEditorActionListener() {
			@Override
			public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
				prefsEdit.putString("server", server.getText().toString());
				prefsEdit.commit();
				return false;
			}
		});
	}
}
