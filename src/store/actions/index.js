import request from "../../util/request";
import {GET_LIST, SET_SERIEL} from "../constants";
import {Toast} from "antd-mobile";

/**
 * @Description: action
 * @author: forguo
 * @date: 2020/8/27
 */

export const dispatchGetList = () => {
    return async (dispatch) => {
        Toast.loading('加载中...', 0);
        try {
            let res = await request({
                url: '/api/haotian/productIntroduce/all',
                method: 'get'
            });
            let data = res.data || [];
            let list = data.map(item => {
                return {
                    detailPictureUrl: item.detailPictureUrl,
                    figure: item.figure,
                    firstLabel: item.firstLabel,
                    headPictureUrl: item.headPictureUrl,
                    id: item.id,
                    secondLabel: item.secondLabel,
                    seriel: item.seriel,
                };
            });
            dispatch({
                type: GET_LIST,
                data: list
            });
            Toast.hide();
        } catch (e) {
            console.log(e);
            dispatch({
                type: GET_LIST,
                data: []
            });
            Toast.hide();
        }
    };
};

export const dispatchSetSeriel = (seriel) => {
    return (dispatch) => {
        dispatch({
            type: SET_SERIEL,
            seriel
        });
    };
};
