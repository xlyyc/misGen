/**
 * @bizWidgetClass FlowLayoutHelper class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:2-9
 */
wof.bizWidget.FlowLayoutHelper = function () {
    this._version = '1.0';

    var method = 'this._calcLayout(message);';
    this.setOnReceiveMessage([{id:'wof_object_resize',priority:99,method:method}]);
};
wof.bizWidget.FlowLayoutHelper.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {

        };
    },
    //----------必须实现----------
    setData: function (data) {

    },

    /**
     *
     * 计算布局
     * 从叶子节点开始上向计算
     * 直到根节点或者在分组为不随内容扩展的节点上停止
     */
    _calcLayout: function(message){
        var obj=wof.util.ObjectManager.get(message.sender.id);
        if(obj!=null){
            var rootNode = obj;
            var parentNode = obj.parentNode();
            if(parentNode!=null&&parentNode.getClassName()=="wof.bizWidget.FlowLayoutItem"){
                while((parentNode=parentNode.parentNode())!=null){
                    if(parentNode.getClassName()=='wof.bizWidget.FlowLayoutSection'){
                        var section = parentNode;
                        if(section.getIsAutoExt()==true){
                            var flowLayout = parentNode.getOriginNode();
                            rootNode = flowLayout;
                            if(flowLayout.getId()==this.getId()){
                                section.calcLayout();
                                flowLayout.calcLayout();
                            }
                        }else{
                            break;
                        }
                    }
                }
            }
            rootNode.render();
        }

    }



};