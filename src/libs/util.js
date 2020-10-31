/**
 * @Description: 常用工具的封装
 * @author: forguo
 * @date: 2020/8/27
 */

/**
 * 删除空的参数
 * @param params
 */
export const clearEmpty = (params) => {
    let data = {
        ...params
    };
    for (let key in data) {
        // eslint-disable-next-line no-eq-null
        if (!data[key] || data[key] == null) {
            delete data[key];
        }
    }
    return data;
};


// 添加title前缀
const hostname = window.location.hostname;
const testName = '/app-t/'; // 测试

let titleEnv = '';
if (hostname.indexOf(testName) !== -1) {
    titleEnv = '【测试】';
}
export const titlePrefix = process.env.NODE_ENV === 'development' ? '【开发】' : titleEnv;
