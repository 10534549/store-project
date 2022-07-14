<template>
    <div class="login-section">
        <div
            class="
                text-black text-uppercase
                font-80
                montserrat-bold
            "
        >
            Smart <br />
            Offer <br />
            Deal
        </div>
        <div class="font-40">Smart People's Choice</div>
        <div class="login-button mt-5 text-center">
            <v-row>
                <v-col cols="4" class="m-1">
                    <nuxt-link to="/sign-up">
                        <v-btn x-large rounded block>SIGN UP</v-btn>
                    </nuxt-link>
                </v-col>
                <v-col cols="4" class="m-1">
                    <div @click="dialog = true">
                        <loginPopup
                            :dialog.sync="dialog"
                            @closeDialog="closeDialog"
                        />
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import service from '@/service/apiService'
import global from '@/service/global'
import loginPopup from '@/components/popups/loginPopups/login-popup.vue'

export default {
    layout: 'login',
    components: {
        loginPopup,
    },
    data() {
        return {
            // showPage: false,
            dialog: false,
            showError: '',
            showData: '',
        }
    },
    methods: {
        closeDialog() {
            this.dialog = false
        },
        login() {
            service.login(global.userRedirectUrl, function(err, data) {
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
    padding: 4rem 0;
    color: $black;
    .login-button {
        .btn {
            font-size: 14px;
            font-family: 'Roboto';
            padding: 0.4rem 4rem;
        }
    }
}
</style>
