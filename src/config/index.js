/* 
 *环境配置
 */
// const env = import.meta.env.MODE || 'prod';
const env = 'prod';
const EnvConfig = {
    dev: {
        baseApi: '/v1',
        mockApi: 'https://www.fastmock.site/mock/0f849fac2bea76617f56addc773b86e5/blog' 
    },
    test: {
        baseApi: '/',
        mockApi: 'https://www.fastmock.site/mock/0f849fac2bea76617f56addc773b86e5/blog'
    },
    prod: {
        baseApi: '/',
        mockApi: 'https://www.fastmock.site/mock/0f849fac2bea76617f56addc773b86e5/blog'
    }
}

export default {
    env,
    namespace: '_blog',
    mock: false,
    ...EnvConfig[env]
}