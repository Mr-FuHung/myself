import $ajax from '@/utils/ajax'

export default {
    //获取文章列表
    getArticleList: data => $ajax({
        url: '/article/list.ajax',
        data
    }),
    //获取文章详情
    getArticleDetail: data => $ajax({
        method: 'post',
        url: '/article/detail.ajax',
        data
    }),
    //登录
    login: data => $ajax({
        method: 'post',
        url: '/users/login.ajax',
        data
    }),
    //登录
    commentSubmit: data => $ajax({
        method: 'post',
        url: '/comment/add.ajax',
        data
    }),
}