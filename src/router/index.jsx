/**
 * @Description: 路由配置
 * @author: forguo
 * @date: 2020/9/2
*/
import React from "react";
import { wxInit } from '../libs/wxsdk';
import { titlePrefix } from '../libs/util';

import Index from '../views/Index/Index.jsx';

class AppRouter extends React.Component {
    async componentWillMount() {
        try {
            await wxInit(window.shareData); // 微信分享
        } catch (e) {
            console.log(e);
        }
        console.log(`%c Environment %c ${titlePrefix || '【生产】'}`, 'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060', 'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e');
        let title = document.title;
        document.title = `${titlePrefix}${title}`;
    }

    render() {
        return (
            <React.Fragment>
                <Index />
            </React.Fragment>
        );
    }
}

export default AppRouter;
