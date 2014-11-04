Ember.Handlebars.helper("toMinutes", function(value){
  return moment.duration(value, 'seconds').format('mm:ss', {trim:false});
});
Ember.Handlebars.helper("key_value", function(obj) {
    var buffer = "",
        key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            buffer += 'key: ' + key+ ', value: '+obj[key];
        }
    }

    return buffer;
});

titleize = function(str) {
    var out = str.replace(/^\s*/, "");  // strip leading spaces
    out = out.replace(/^[a-z]|[^\s][A-Z]/g, function(str, offset) {
        if (offset == 0) {
            return(str.toUpperCase());
        } else {
            return(str.substr(0,1) + " " + str.substr(1).toUpperCase());
        }
    });
    return(out);
}
