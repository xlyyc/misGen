// Copyright (c) 2009, Wisedu Inc. All rights reserved.
//
// Licensed under the BSD License
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://172.16.6.28:7090
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/*
 * Lovey
 * Copyright 2009 Wisedu Inc. All rights reserved.
 * @namespace W 
 * @name wisEduAdapterFactory.js
 * @version 1.0
 * Issued by Wisedu Ltd.
 *
 * User: yzhao (178518@gmail.com)
 * Date: 14-3-7 上午10:15
 * Version V1.0
 * History:
 */

/**
 * 工厂类实现适配器的初始化，屏蔽库和组件的差异
 * @type {{getInputAdapter: Function, getContainerAdapter: Function}}
 */
wisedu.adapterFactory = {
    getInputAdapter: function (options) {
        if (jQuery)
            return new wisedu.InputAdapter(options);
        else
            return null;
    },
    getCheckboxAdapter: function (options) {
        if (jQuery)
            return new wisedu.CheckboxAdapter(options);
        else
            return null;
    },
    getContainerAdapter: function (options) {
        if (jQuery)
            return new wisedu.ContainerAdapter(options);
        else
            return null;
    }
};