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
                url: 'https://forguo.cn/star/getQsList',
                method: 'post'
            });
            let list = res.data || [];
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

export const dispatchSubmit = (data) => {
    return () => (
        request({
            url: 'https://forguo.cn/star/answer',
            method: 'post',
            data
        })
    )
};

export const dispatchSetSeriel = (seriel) => {
    return (dispatch) => {
        dispatch({
            type: SET_SERIEL,
            seriel
        });
    };
};
