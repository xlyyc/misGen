if (!wis.util.Observer) {
    wis.util.Observer = {
			_messageTable : new wis.util.Hashtable(),

            _sorted: {},

			register : function(messageId, listener, priority) {
				if (!listener.receiveMessage){
                    console.log("receiveMessage method undefined");
                }
                if(priority==null){
                    priority=50; //优先级默认50
                }
				if (!wis.util.Observer._messageTable.contains(messageId)) {
					var listeners = [];
					listeners.push({listener: listener, priority: priority});
                    wis.util.Observer._messageTable.add(messageId, listeners);
				} else{
                    wis.util.Observer._messageTable.items(messageId).push({listener: listener, priority: priority});
                }
                wis.util.Observer._sorted[messageId]=false;
			},

			unregister : function(messageId, listener) {
				var listeners = wis.util.Observer._messageTable.items(messageId);
				if(listeners!=null){
                    for(var i = listeners.length - 1; i >= 0; i--) {
                        if(listeners[i].listener === listener) {
                            listeners.splice(i,1);
                            break;
                        }
                    }
				}
			},
			
			sendMessage : function(message) {
				if (message == null){
                    console.log("message object is null");
				}else{
					var listeners = wis.util.Observer._messageTable.items(message.id);
                    if(wis.util.Observer._sorted[message.id]==false){
                        listeners.sort(function(a, b) {
                            return b.priority - a.priority;
                        });
                        wis.util.Observer._sorted[message.id]=true;
                    }
					for(var i=0; listeners!=null&&i<listeners.length;i++){
                        var ret = listeners[i].listener.receiveMessage(message);
                        if(ret==false){
                            console.log('返回值为false 结束后续低优先级消息的执行');
                            break;
                        }
					}
				}
			}
		};
}