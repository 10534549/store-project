<template>
    <div class="authority">
        <div v-if="showPage" class="login-section">
            <div class="row">
                <div class="col-md-12">
                    <div class="mb-5">
                        <div
                            class="title-login text-black text-uppercase font-80 montserrat-bold"
                        >
                            Smart Offer Deal
                        </div>
                        <div class="subtitle-login font-40">
                            Smart People's Choice
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="">
                        <div
                            class="subtitle-login mb-5 font-24 text-center montserrat-bold"
                        >
                            <div class="">
                                Your email or password are incorrect.
                            </div>
                            <div class="">
                                Or
                            </div>
                            <div class="">
                                You do not have permissions. Please check the
                                permissions before login again.
                            </div>
                        </div>
                        <div class="login-button text-center">
                            <b-button
                                variant="light"
                                size="md"
                                class="rounded-pill"
                                @click="login"
                                >Login</b-button
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import base64 from 'base-64'
import global from '@/service/global.js'
import service from '@/service/apiService.js'

export default {
    layout: 'login',
    data() {
        return {
            showPage: false,
            showError: '',
            showData: '',
        }
    },
    created() {
        this.accessTokenInLocalStorage()
    },
    methods: {
        accessTokenInLocalStorage() {
            if (this.$route.query.store && this.$route.query.store !== '') {
                this.showPage = false
                const tokenString = base64.decode(this.$route.query.token)
                global.setUser(tokenString)
                global.setStore(this.$route.query.store)
                this.$router.push('/profile')
            } else {
                this.showPage = true
            }
        },
        login() {
            service.login(global.userRedirectUrl, (err, data) => {
                this.showError = err
                this.showData = data
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.login-section {
    padding: 5.5rem 0;
    color: $black;
    .login-button {
        .btn {
            font-size: $font-30;
            font-family: $montserrat-semi-bold;
            padding: 0.4rem 5rem;
        }
    }
}
</style>
