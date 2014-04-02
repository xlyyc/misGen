if (!wof.util.ObjectManager) {
	wof.util.ObjectManager = {
		
		_objs: new wof.util.Hashtable(),

		get: function(oId) {
            var obj = wof.util.ObjectManager._objs.items(oId);
			return obj;
		},
		
		add: function(oId, obj) {
			return wof.util.ObjectManager._objs.add(oId, obj);
		},
		
		remove: function(oId) {
			return wof.util.ObjectManager._objs.remove(oId);
		},

        oIds: function(){
            return wof.util.ObjectManager._objs.keys();
        },

        create: function(className, data){
            var obj = null;
            with(wof.widget)
                with(wof.widget.spanner)
                    with(wof.bizWidget)
                        with(wof.bizWidget.spanner)
                            with(wof.functionWidget)
                                with(wof.functionWidget.spanner){
                                    obj = eval('new '+className+'()');
                                    if(obj._init!=null&& !jQuery.isEmptyObject(data)){
                                        obj._init(data);
                                    }
                                }
            return obj;
        }
		
	};
}
