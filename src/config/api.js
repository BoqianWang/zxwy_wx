import fetch from './fetch'

export default{

   /**
    * 用户登录
    */
    banner(params) {
        return fetch.fetchPost('News/banner', params);
    },

    /**
     * 用户登录
     */
     joke(params) {
        return fetch.fetchPost('joke/index', {page：分页，type:文章类型});
    }

}
