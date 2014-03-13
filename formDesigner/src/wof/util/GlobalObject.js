if (!wof.util.GlobalObject) {
    wof.util.GlobalObject = {

        _cache: new wof.util.Hashtable(),

        get: function(key) {
            var obj = wof.util.GlobalObject._cache.items(key);
            return obj;
        },

        add: function(key, value) {
            wof.util.GlobalObject._cache.remove(key);
            return wof.util.GlobalObject._cache.add(key, value);
        },

        remove: function(key) {
            return wof.util.GlobalObject._cache.remove(key);
        }

    };
}