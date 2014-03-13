if (!wis.util.GlobalObject) {
    wis.util.GlobalObject = {

        _cache: new wis.util.Hashtable(),

        get: function(key) {
            var obj = wis.util.GlobalObject._cache.items(key);
            return obj;
        },

        add: function(key, value) {
            wis.util.GlobalObject._cache.remove(key);
            return wis.util.GlobalObject._cache.add(key, value);
        },

        remove: function(key) {
            return wis.util.GlobalObject._cache.remove(key);
        }

    };
}