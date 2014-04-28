var wis$_aop = (function(){
    function aopChildren(objName){
        var obj = eval(objName);
        for(var o in obj){
            if(typeof(obj[o])=='function'){
                if(obj[o]['getClassName']==null){
                    obj[o].prototype._version = null;
                    obj[o].prototype.getVersion = function(){
                        return this._version || '1.0';
                    };
                    obj[o].prototype._position = null;
                    obj[o].prototype.getPosition = function() {
                        return this._position || 'absolute';
                    };
                    obj[o].prototype.setPosition = function(position) {
                        this._position = position;
                    };
                    obj[o].prototype._zIndex = null;
                    obj[o].prototype.getZIndex = function() {
                        return this._zIndex || 'auto';
                    };
                    obj[o].prototype.setZIndex = function(zIndex) {
                        this._zIndex = zIndex;
                    };
					obj[o].prototype._libName = null;
                    obj[o].prototype.getLibName = function() {
                        return this._libName || '';
                    };
                    obj[o].prototype.setLibName = function(libName) {
                        this._libName = libName;
                    };
                    obj[o].prototype._cid = null;
                    obj[o].prototype.getCid = function() {
                        return this._cid || this.getId();
                    };
                    obj[o].prototype.setCid = function(cid) {
                        this._cid = cid;
                    };
                    obj[o].prototype._themes = null;
                    obj[o].prototype.getThemes = function() {
                        return this._themes || '';
                    };
                    obj[o].prototype.setThemes = function(themes) {
                        this._themes = themes;
                    };
                    obj[o].prototype._className = objName+"."+o;
                    obj[o].prototype.getClassName = function(){
                        return this._className;
                    };
                    obj[o].prototype._id = null;
                    obj[o].prototype.getId = function(){
                        return (this._id==null)?(this._id=wis.util.Tool.uuid()):this._id;
                    };
                    obj[o].prototype._domInstance = null;
                    obj[o].prototype.getDomInstance = function(){
                        if(this._domInstance==null){
                            var cls = wis.util.Tool.replaceAll(this.getClassName(),'[.]','_');
                            this._domInstance=jQuery('<div oid="'+this.getId()+'"class="'+cls+'" classname="'+this.getClassName()+'">');
                        }
                        return this._domInstance;
                    };
                    obj[o].prototype._hiden = null;
                    obj[o].prototype.getHiden = function(){
                        return this._hiden || false;
                    };
                    obj[o].prototype.setHiden = function(hiden){
                        if(hiden==true){
                            this.getDomInstance().hide();
                        }else{
                            this.getDomInstance().show();
                        }
                        this._hiden = hiden;
                    };
                    obj[o].prototype.clone = function(){
                        var obj=eval('wis$.create("'+this.getClassName()+'")');
                        obj.setData(this.getData());
                        return obj;
                    };
                    obj[o].prototype.appendTo = function(container){
                        jQuery(container).append(this.getDomInstance());
                        wis.util.ObjectManager.add(this.getId(), this);
                    };
                    obj[o].prototype.remove = function(flag){
                        if(this.beforeRemove!=null){
                            this.beforeRemove();
                        }
                        wis.util.ObjectManager.remove(this.getId());
                        if(flag==true){
                            this.getDomInstance().remove();
                        }else{
                            this.getDomInstance().detach();
                        }
                        if(this.afterRemove!=null){
                            this.afterRemove();
                        }
                    };
                    obj[o].prototype.toJSON = function(){
                        return JSON.stringify(this.getData());
                    };
                    obj[o].prototype.toHTML = function(){
                        return this.getDomInstance().html();
                    };
                    obj[o].prototype._height = null;
                    if(obj[o].prototype.getHeight==null){
                        obj[o].prototype.getHeight = function(){
                            return this._height;
                        };
                    }
                    if(obj[o].prototype.setHeight==null){
                        obj[o].prototype.setHeight = function(height){
                            this._height = height;
                        };
                    }
                    obj[o].prototype._width = null;
                    if(obj[o].prototype.getWidth==null){
                        obj[o].prototype.getWidth = function(){
                            return this._width;
                        };
                    }
                    if(obj[o].prototype.setWidth==null){
                        obj[o].prototype.setWidth = function(width){
                            this._width = width;
                        };
                    }
                    obj[o].prototype._left = null;
                    if(obj[o].prototype.getLeft==null){
                        obj[o].prototype.getLeft = function(){
                            return this._left;
                        };
                    }
                    if(obj[o].prototype.setLeft==null){
                        obj[o].prototype.setLeft = function(left){
                            this._left = left;
                        };
                    }
                    obj[o].prototype._top = null;
                    if(obj[o].prototype.getTop==null){
                        obj[o].prototype.getTop = function(){
                            return this._top;
                        };
                    }
                    if(obj[o].prototype.setTop==null){
                        obj[o].prototype.setTop = function(top){
                            this._top = top;
                        };
                    }
                    obj[o].prototype._scale = null;
                    obj[o].prototype.getScale = function(){
                        return this._scale || 1;
                    };
                    obj[o].prototype.setScale = function(scale){
                        this._scale = scale;
                    };
                    if(obj[o].prototype.getData!=null){
                        obj[o].prototype._getData = obj[o].prototype.getData;
                        obj[o].prototype.getData = function(){
                            var data=this._getData();
                            data.id=this.getId();
                            data.className=this.getClassName();
                            data.hiden=this.getHiden();
                            data.position = this.getPosition();
                            data.zIndex = this.getZIndex();
                            data.scale = this.getScale();
                            data.themes = this.getThemes();
							data.libName = this.getLibName();
                            data.cid = this.getCid();
                            if(this.getWidth()!=null){
                                data.width=this.getWidth();
                            }
                            if(this.getHeight()!=null){
                                data.height=this.getHeight();
                            }
                            if(this.getTop()!=null){
                                data.top=this.getTop();
                            }
                            if(this.getLeft()!=null){
                                data.left=this.getLeft();
                            }
                            return data;
                        };
                    }
                    if(obj[o].prototype.setData!=null){
                        obj[o].prototype._setData = obj[o].prototype.setData;
                        obj[o].prototype.setData = function(data){
                            if(data.width!=null){
                                this.setWidth(data.width);
                            }
                            if(data.height!=null){
                                this.setHeight(data.height);
                            }
                            if(data.top!=null){
                                this.setTop(data.top);
                            }
                            if(data.left!=null){
                                this.setLeft(data.left);
                            }
                            this.setHiden(data.hiden);
                            this.setPosition(data.position);
                            this.setZIndex(data.zIndex);
                            this.setScale(data.scale);
                            this.setThemes(data.themes);
							this.setLibName(data.libName);
                            this.setCid(data.cid);
                            this._setData(data);
                        };
                    }
                    obj[o].prototype._initRenderFlag = false;
                    if(obj[o].prototype.render!=null){
                        obj[o].prototype._render = obj[o].prototype.render;
                        obj[o].prototype.render = function(){
                            if(this._initRenderFlag == false){
                                this._initRenderFlag = true;
                                this._initRender();
                            }
                            if(this._beforeRender!=null){
                                this._beforeRender();
                            }
                            if(this._left!=null){
                                this.getDomInstance().css('left', (this._left*this.getScale())+'px');
                            }
                            if(this._top!=null){
                                this.getDomInstance().css('top', (this._top*this.getScale())+'px');
                            }
                            if(this._width!=null){
                                this.getDomInstance().css('width', (this._width*this.getScale())+'px');
                            }
                            if(this._height!=null){
                                this.getDomInstance().css('height', (this._height*this.getScale())+'px');
                            }
                            this.getDomInstance().css('position', this.getPosition());
                            this.getDomInstance().css('zIndex', this.getZIndex());
                            this._render();
                            if(this._afterRender!=null){
                                this._afterRender();
                            }
                        };
                    }
                }
            }else if(typeof(obj[o])=='object'){
                aopChildren(objName+"."+o);
            }
        }
    }
    return aopChildren;
})();
wis$_aop('wis.kernel');
wis$_aop('wis.widget');
var wis$ = {};
wis$.find = wis.util.Selector.find;
wis$.create = wis.util.ObjectManager.create;
