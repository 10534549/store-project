import nuxtStorage from 'nuxt-storage'
export default {
    setUser(data) {
        nuxtStorage.localStorage.setData('storeInfo', data, 1, 'd')
    },
    getUser() {
        return nuxtStorage.localStorage.getData('storeInfo')
    },
    setStore(data) {
        nuxtStorage.localStorage.setData('store', data, 1, 'd')
    },
    getStore() {
        return nuxtStorage.localStorage.getData('store')
    },
    setUserDetail(data) {
        nuxtStorage.localStorage.setData('userDetail', data, 1, 'd')
    },
    getUserDetail() {
        return nuxtStorage.localStorage.getData('userDetail')
    },
    removeUser() {
        nuxtStorage.localStorage.clear('storeInfo')
    },
    getToken() {
        return nuxtStorage.localStorage.getData('tokens')
    },
    
    adminUrl: 'http://localhost:3030/',
    adminUrl1: 'http://localhost:1330',
    cognitoUrl: 'http://localhost:3300/User/awsUrl',
    cognitoUrlCreateToken: 'http://localhost:3300/User/createToken',
    cognitoUrlLogOut: 'http://localhost:3300/User/logout',
    userRedirectUrl: 'http://localhost:3000/authority',
    freshChatUrl: 'https://wchat.in.freshchat.com',
    freshChatWidgetToken: 'a47bf50a-ca4d-4933-8c20-16bf044e66ca',
    webUrl: 'http://localhost:3300/User'
}
