import nuxtStorage from 'nuxt-storage'

export default ({ app }) => {
    app.router.beforeEach((to, from, next) => {
        if (
            to.name !== 'login' &&
            !nuxtStorage.localStorage.getData('storeInfo') &&
            to.path !== '/' &&
            to.name === 'index'
        ) {
            next('/')
        } else if (
            nuxtStorage.localStorage.getData('storeInfo') &&
            (to.path === '/' || to.name === 'login')
        ) {
            next('/profile')
        } else {
            next()
        }
    })
}
