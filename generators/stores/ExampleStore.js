/*jslint browser: true, jquery: true */ 
/*global App: true, require: false, DS: false */
App = require("app");

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});

App.RawTransform = DS.Transform.extend({
	deserialize: function(serialized) {
		return serialized;
	},  
	serialize: function(deserialized) {
		return deserialized;
	}
});
