document.write(
    +'<script src="src/wof/customWindow/MetaTreeSelector.js"></script>'
        +'<script src="src/wof/customWindow/ComponentTreeSelector.js"></script>'
        +'<script src="src/wof/customWindow/ParamMapsWindow.js"></script>'
        +'<script src="src/wof/customWindow/PageParamWindow.js"></script>'
        +'<script src="src/wof/customWindow/PageFormSelector.js"></script>'

        +'<script src="src/wof/widget/Tab.js"></script>'
        +'<script src="src/wof/widget/TabItem.js"></script>'
        +'<script src="src/wof/widget/Toolbar.js"></script>'
        +'<script src="src/wof/widget/ToolbarItem.js"></script>'
        +'<script src="src/wof/widget/Grid.js"></script>'
        +'<script src="src/wof/widget/Button.js"></script>'
        +'<script src="src/wof/widget/DateEditor.js"></script>'
        +'<script src="src/wof/widget/Label.js"></script>'
        +'<script src="src/wof/widget/RadioGroupItem.js"></script>'
        +'<script src="src/wof/widget/RadioGroup.js"></script>'
        +'<script src="src/wof/widget/ComboBox.js"></script>'
        +'<script src="src/wof/widget/Tree.js"></script>'
        +'<script src="src/wof/widget/spanner/ButtonSpanner.js"></script>'
        +'<script src="src/wof/widget/spanner/TabSpanner.js"></script>'

        +'<script src="src/wof/bizWidget/FlowLayout.js"></script>'
        +'<script src="src/wof/bizWidget/FlowLayoutSection.js"></script>'
        +'<script src="src/wof/bizWidget/FlowLayoutItem.js"></script>'
        +'<script src="src/wof/bizWidget/FlowLayoutHelper.js"></script>'
        +'<script src="src/wof/bizWidget/GridLayout.js"></script>'
        +'<script src="src/wof/bizWidget/PageComponent.js"></script>'
        +'<script src="src/wof/bizWidget/PropertyBar.js"></script>'
        +'<script src="src/wof/bizWidget/ObjectBar.js"></script>'
        +'<script src="src/wof/bizWidget/OnSendMessageBar.js"></script>'
        +'<script src="src/wof/bizWidget/OnReceiveMessageBar.js"></script>'
        +'<script src="src/wof/bizWidget/VoucherComponent.js"></script>'
        +'<script src="src/wof/bizWidget/VoucherItemGroup.js"></script>'
        +'<script src="src/wof/bizWidget/VoucherItem.js"></script>'
        +'<script src="src/wof/bizWidget/VoucherGridComponent.js"></script>'
        +'<script src="src/wof/bizWidget/VoucherGridComponentColumn.js"></script>'
        +'<script src="src/wof/bizWidget/GridComponent.js"></script>'
        +'<script src="src/wof/bizWidget/GridComponentColumn.js"></script>'
        +'<script src="src/wof/bizWidget/VoucherGridComponent.js"></script>'
        +'<script src="src/wof/bizWidget/SearchComponent.js"></script>'
        +'<script src="src/wof/bizWidget/SearchItem.js"></script>'
        +'<script src="src/wof/bizWidget/BizEntityTree.js"></script>'
        +'<script src="src/wof/bizWidget/PageFormTree.js"></script>'
        +'<script src="src/wof/bizWidget/ComponentsTree.js"></script>'
        +'<script src="src/wof/bizWidget/ParamWindow.js"></script>'
        +'<script src="src/wof/bizWidget/PageParamWindow.js"></script>'

        +'<script src="src/wof/bizWidget/spanner/GridLayoutSpanner.js"></script>'
        +'<script src="src/wof/bizWidget/spanner/PageComponentSpanner.js"></script>'
        +'<script src="src/wof/bizWidget/spanner/FlowLayoutSpanner.js"></script>'
        +'<script src="src/wof/bizWidget/spanner/VoucherComponentSpanner.js"></script>'
        +'<script src="src/wof/bizWidget/spanner/SearchComponentSpanner.js"></script>'
        +'<script src="src/wof/bizWidget/spanner/VoucherGridComponentSpanner.js"></script>'
        +'<script src="src/wof/bizWidget/spanner/GridComponentSpanner.js"></script>'
        +'<script src="src/wof/bizWidget/ObjectInspector.js"></script>'

        +'<script src="src/wof/functionWidget/CommitComponent.js"></script>'
        +'<script src="src/wof/functionWidget/ViewRecordComponent.js"></script>'
        +'<script src="src/wof/functionWidget/UpdateRecordComponent.js"></script>'
        +'<script src="src/wof/functionWidget/DeleteRecordComponent.js"></script>'
        +'<script src="src/wof/functionWidget/AddRecordComponent.js"></script>'

        +'<script src="src/wof/functionWidget/spanner/CommitComponentSpanner.js"></script>'
        +'<script src="src/wof/functionWidget/spanner/ViewRecordComponentSpanner.js"></script>'
        +'<script src="src/wof/functionWidget/spanner/UpdateRecordComponentSpanner.js"></script>'
        +'<script src="src/wof/functionWidget/spanner/DeleteRecordComponentSpanner.js"></script>'
        +'<script src="src/wof/functionWidget/spanner/AddRecordComponentSpanner.js"></script>'
);

/**
 * 注册组件
 *
 */

var wof$_layoutComponents = [];    //布局组件
var wof$_bizWidgetComponents = [];  //页面组件
var wof$_widgetComponents = [];   //基础组件

//注册布局构件
wof$_layoutComponents.push('FlowLayoutSpanner');
wof$_layoutComponents.push('GridLayoutSpanner');

//注册页面构件
wof$_bizWidgetComponents.push('VoucherComponentSpanner');
wof$_bizWidgetComponents.push('SearchComponentSpanner');
wof$_bizWidgetComponents.push('GridComponentSpanner');
wof$_bizWidgetComponents.push('VoucherGridComponentSpanner');
wof$_bizWidgetComponents.push('PageComponentSpanner');

//注册基础构件
/*
 wof$_widgetComponents.push('ButtonSpanner');
 wof$_widgetComponents.push('TabSpanner');
 */
wof$_widgetComponents.push('CommitComponentSpanner');
wof$_widgetComponents.push('ViewRecordComponentSpanner');
wof$_widgetComponents.push('UpdateRecordComponentSpanner');
wof$_widgetComponents.push('AddRecordComponentSpanner');
wof$_widgetComponents.push('DeleteRecordComponentSpanner');