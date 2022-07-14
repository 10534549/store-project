<template>
    <div>
        <b-navbar toggleable="lg" type="dark" class="bg-light">
            <div class="smart-deal-offer-logo px-4">
                <b-navbar-brand href="/">
                    <img src="~/assets/img/static/logo.png" alt="" />
                </b-navbar-brand>
            </div>
            <b-navbar-nav class="ml-auto">
                <div class="header-buttons d-flex">
                    <div class="login-button" @click="dialog = true">
                        <loginPopup
                            :dialog.sync="dialog"
                            @closeDialog="closeDialog"
                        />
                    </div>
                    <!-- <div class="login-button">
                        <nuxt-link to="login">
                            <button
                                class="btn btn-sm rounded-pill bg-light-green text-white"
                            >
                                Login
                            </button>
                        </nuxt-link>
                    </div> -->
                </div>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
import loginPopup from '@/components/popups/loginPopups/login-popup.vue'
export default {
    components: {
        loginPopup,
    },
    data() {
        return {
            dialog: false,
        }
    },
    methods: {
        closeDialog() {
            this.dialog = false
        },
    },
}
</script>
<style lang="scss">
.smart-deal-offer-logo {
    width: 160px;
    img {
        width: 100%;
        height: 100%;
    }
}
.header-buttons {
    .btn {
        width: 80px;
        margin: 0px 5px;
        padding: 5px;
    }
}
</style>
