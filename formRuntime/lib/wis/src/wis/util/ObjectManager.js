if (!wis.util.ObjectManager) {
    wis.util.ObjectManager = {
		
		_objs: new wis.util.Hashtable(),

		get: function(oId) {
            var obj = wis.util.ObjectManager._objs.items(oId);
			return obj;
		},
		
		keys: function() {
            return wis.util.ObjectManager._objs.keys();
		},
		
		add: function(oId, obj) {
			return wis.util.ObjectManager._objs.add(oId, obj);
		},
		
		remove: function(oId) {
			return wis.util.ObjectManager._objs.remove(oId);
		},

        create: function(className, data){
            var obj = null;
            with(wis.widget){
                obj = eval('new '+className+'()');
                if(obj._init!=null&& !jQuery.isEmptyObject(data)){
                    obj._init(data);
                }
            }
            return obj;
        }
		
	};
}
