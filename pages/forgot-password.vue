<template>
    <section class="forgot-section main-forms">
        <div class="forgot-content forms-content">
            <b-container>
                <b-row class="justify-content-center">
                    <b-col lg="6" sm="12">
                        <b-card>
                            <div class="text-center mb-5">
                                <span class="forms-heading"
                                    >Forgot Password</span
                                >
                            </div>
                            <div
                                class="
                                    text-center
                                    font-weight-bold
                                    mb-3
                                    font-18
                                "
                            >
                                Please Enter your Registered Email Id. We will
                                send you an One Time Password (OTP) to the
                                Entered Email Id.
                            </div>
                            <b-form name="forgotDetail">
                                <div class="form-details">
                                    <div class="mobileno-field mb-3">
                                        <div class="d-flex">
                                            <!-- <vue-country-code
                                                :disabled-fetching-country="
                                                    true
                                                "
                                                :default-country="'in'"
                                                @onSelect="onSelect"
                                            ></vue-country-code> -->
                                            <div class="w-100">
                                                <b-form-input
                                                    v-model="forgotDetail.email"
                                                    type="email"
                                                    class="
                                                        input-box-bottom-border-radius
                                                        mobile-input
                                                    "
                                                    placeholder="Email Id*"
                                                    required
                                                ></b-form-input>
                                            </div>
                                        </div>
                                        <div
                                            v-if="
                                                !$v.forgotDetail.email
                                                    .required &&
                                                $v.forgotDetail.email.$error &&
                                                $v.forgotDetail.email.$touch
                                            "
                                            class="error-txt py-1"
                                        >
                                            Email Id is required
                                        </div>
                                        <div
                                            v-if="!$v.forgotDetail.email.email"
                                            class="error-txt py-1"
                                        >
                                            Email is not a properly formatted
                                            email address.
                                        </div>
                                    </div>
                                    <div
                                        class="justify-content-center mt-4 mb-5"
                                    >
                                        <nuxt-link to="reset-password">
                                            <button
                                                class="
                                                    bg-orange
                                                    text-white
                                                    submit-btn
                                                "
                                                @click="forgotPasswordWeb"
                                            >
                                                SUBMIT
                                            </button>
                                        </nuxt-link>
                                    </div>
                                </div>
                            </b-form>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </section>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import service from '@/service/apiService'
import base64 from 'base-64'
export default {
    layout: 'login-header',
    data() {
        return {
            forgotDetail: {
                email: '',
            },
        }
    },

    validations: {
        forgotDetail: {
            // phone: {
            //     required,
            //     minLength: minLength(10),
            //     isPhoneValid(password) {
            //         return /^[+]\d{1,2}\d{0,10}/.test(password)
            //     },
            // },
            email: {
                required,
                email,
            },
        },
    },
    methods: {
        onSelect(data) {
            // eslint-disable-next-line no-console
            // console.log('data', data)
            this.countryCodeNo = data.dialCode
        },
        forgotPasswordWeb(e) {
            e.preventDefault()
            service.forgotPasswordWeb(this.forgotDetail, (response) => {
                console.log(response)
                if (response && response.data && response.data.error) {
                    // console.log('error here', response.data.error)
                    if (
                        response &&
                        response.data &&
                        response.data.error == 'No User Found'
                    ) {
                        this.$toaster.error(response.data.error)
                    } else if (
                        response.data.error.code == 'LimitExceededException'
                    ) {
                        this.$toaster.error(response.data.error.message)
                    } else {
                        this.$toaster.error('OTP sent Unsuccessfully.')
                    }
                } else {
                    this.$toaster.success('OTP sent Successfully.')
                    let email = base64.encode(this.forgotDetail.email)
                    this.$router.push(`/reset-password?oid=${email}`)
                }
            })
        },
    },
}
</script>
