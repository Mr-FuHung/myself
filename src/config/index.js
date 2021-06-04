/* 
 *环境配置
 */
// const env = import.meta.env.MODE || 'prod';
const env = 'prod';
const EnvConfig = {
    dev: {
        baseApi: '/v1',
        // mockApi: 'https://www.fastmock.site/mock/b524a220e30379bd9409943f1df30493/dev',//my
        mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api' //teacher
    },
    test: {
        baseApi: '/',
        mockApi: 'https://www.fastmock.site/mock/b524a220e30379bd9409943f1df30493/dev'
    },
    prod: {
        baseApi: '/',
        mockApi: 'https://www.fastmock.site/mock/b524a220e30379bd9409943f1df30493/dev'
    }
}

export default {
    env,
    namespace: '_blog',
    mock: false,
    ...EnvConfig[env]
}