<template>
    <section class="verifyOtp-section main-forms">
        <div class="verifyOtp-content forms-content">
            <b-container>
                <b-row class="justify-content-center">
                    <b-col lg="6" sm="12">
                        <b-card>
                            <div class="text-center mb-5">
                                <span class="forms-heading">Verify OTP</span>
                            </div>

                            <b-form name="otpDetail">
                                <div class="form-details">
                                    <div
                                        class="
                                            mb-3
                                            text-center
                                            font-weight-bold font-18
                                        "
                                    >
                                        We have sent you One Time Verification
                                        CODE (OTP) on your Registered Email Id
                                        
                                        <span class="italic">
                                            {{email[0]}}******{{emailSplit[0][emailSplit[0].length-1]}}@{{emailSplit[1][0]}}******.{{domain[domain.length-1]}}
                                        </span>
                                    </div>
                                    <div class="input-section text-center">
                                        <input
                                            v-model="otpDetail.otp"
                                            maxlength="6"
                                            class="login-user-input-email"
                                            required
                                            onkeyup="if(this.value.length == 6) this.blur()"
                                        />
                                        <div
                                            v-if="
                                                !$v.otpDetail.otp.required &&
                                                    $v.otpDetail.otp.$error &&
                                                    $v.otpDetail.otp.$touch
                                            "
                                            class="error-text py-1"
                                        >
                                            OTP is required
                                        </div>
                                        <div
                                            v-if="!$v.otpDetail.otp.minLength"
                                            class="error-text py-1"
                                        >
                                            OTP must have at least 6 letters.
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        Didn't get the OTP ?
                                        <span @click="resendOtpWeb"
                                            ><a>Resend</a></span
                                        >
                                    </div>

                                    <div class="justify-content-center mt-4">
                                        <div class="text-center">
                                            <button
                                                class="
                                                    bg-orange
                                                    text-white
                                                    submit-btn
                                                "
                                                @click="verifyOtpWeb"
                                            >
                                                SUBMIT
                                            </button>
                                        </div>
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
import { required, minLength } from 'vuelidate/lib/validators'
import service from '@/service/apiService'
import base64 from 'base-64'
import global from '@/service/global.js'
export default {
    layout: 'login-header',
    data() {
        return {
            otpDetail: {
                otp: '',
            },
            emailSplit: '',
            domain:''
        }
    },
    computed: {
        email() {
            return base64.decode(this.$route.query.oid)
        },
        password() {
            return base64.decode(this.$route.query.access)
        },
    },

    validations: {
        otpDetail: {
            otp: {
                required,
                minLength: minLength(6),
            },
        },
    },
    beforeMount() {
        this.emailSplit = this.email.split('@')
        this.domain = this.email.split('.')
    },
    methods: {
        verifyOtpWeb(e) {
            e.preventDefault()
            this.otpDetail.email = this.email
            service.verifyOtpWeb(this.otpDetail, (response) => {
                console.log("verify otp response", response)
                if(response && response.data && response.data.error && response.data.error.code){
                        if(response.data.error.code == 'InvalidParameterException'){
                            this.$toaster.error('Please Enter Valid Details')
                        }else if(response.data.error.code == 'CodeMismatchException'){
                            this.$toaster.error(response.data.error.message)
                        } else if(response.data.error.code == "LimitExceededException") {
                            this.$toaster.error(response.data.error.message)
                        } else if(response.data.error.code == 'ExpiredCodeException'){
                            this.$toaster.error(response.data.error.message)
                        } else {
                            this.$toaster.error('Unable to reset password.')
                        }
                    } else if(response.data && response.data == "SUCCESS"){
                    // sing in here
                    this.$toaster.success('OTP Verified Successfully')
                    this.otpDetail.password = this.password
                    this.login()
                }else {
                    this.$toaster.error('Unable to verify, Please try again after sometime')
                }
            })
        },
        login(){
            service.loginWeb(this.otpDetail, (response) => {
                console.log("login response",response)
                if (
                    response &&
                    response.data == '' &&
                    response.statusText == 'No Content'
                ) {
                    this.$toaster.error('Plese Enter Valid Details')
                } else if (response && response.data && response.data.error) {
                    if (
                        response &&
                        response.data &&
                        response.data.error &&
                        response.data.error.code == 'InvalidParameterException'
                    ) {
                        this.$toaster.error('Please Enter Valid Details')
                    } else if (
                        response &&
                        response.data &&
                        response.data.error.code &&
                        response.data.error.code == 'CodeMismatchException'
                    ) {
                        this.$toaster.error(response.data.error.message)
                    } else if (
                        response &&
                        response.data &&
                        response.data.error
                    ) {
                        console.log('error', response.data.error)
                        this.$toaster.error('Unable to reset password.')
                    }else if (
                        response &&
                        response.data &&
                        response.data.error &&
                        response.data.error.code &&
                        response.data.error.code == 'ExpiredCodeException'
                    ) {
                        this.$toaster.error(response.data.error.message)
                    } 
                    else {
                        this.$toaster.error('Unable to verify OTP')
                    }
                    // console.log('error', response.data.error)
                } else if(response.data && response.data.store && response.data.token){
                    this.$toaster.success('Sign in Successful.')
                    global.setStore(response.data.store)
                    global.setUser(response.data.token)
                    let token = base64.encode(response.data.token)
                    let store = response.data.store
                    this.$router.push(`/authority?store=${store}&token=${token}`)
                } else {
                    this.$toaster.error('Unable to login please retry')
                }
            })
        },
        resendOtp(){
            service.resendOtpWeb(
                { email: this.signinDetail.email },
                (response) => {
                    console.log(' resend otp response', response)
                    if (
                        response &&
                        (response.data.error || response.data.code)
                    ) {
                        if (response.data.code == 'LimitExceededException') {
                            this.$toaster.error(response.data.message)
                        } else {
                            console.log('error', response.data.error)
                            this.$toaster.error('Otp send Unsuccessfully.')
                        }
                    } else {
                        this.$toaster.success('Otp send Successfully.')
                        const oid = base64.encode(this.signinDetail.email)
                        const access = base64.encode(this.signinDetail.password)

                        this.$router.push(`/verify-otp?oid=${oid}&access=${access}`)
                    }
                },
            )
        },
        resendOtpWeb(e) {
            e.preventDefault()
            this.otpDetail.email = this.email
            service.resendOtpWeb(
                { email: this.otpDetail.email },
                (response) => {
                    console.log('response', response)
                    if (
                        response &&
                        (response.data.error || response.data.code)
                    ) {
                        if (response.data.code == 'LimitExceededException') {
                            this.$toaster.error(response.data.message)
                        } else {
                            console.log('error', response.data.error)
                            this.$toaster.error('Otp send Unsuccessfully.')
                        }
                    } else {
                        this.$toaster.success('Otp send Successfully.')
                        const oid = base64.encode(this.email)

                        this.$router.push(`/verify-otp?oid=${oid}`)
                    }
                },
            )
        },
    },
}
</script>
<style lang="scss">
.italic {
    font-style: italic;
}
.input-section {
    min-height: 70px;
    overflow: hidden;
    .login-user-input-email {
        padding: 13px 0px 2px 15px;
        letter-spacing: 42px;
        border: 0;
        background-image: linear-gradient(
            to left,
            black 70%,
            rgba(255, 255, 255, 0) 0%
        );
        background-position: bottom;
        background-size: 50px 1px;
        background-repeat: repeat-x;
        background-position-x: 35px;
        min-width: 300px;
        background-color: #eee;
    }
}
// @media only screen and (min-width: 768px) {
//     .form-details {
//         padding: 0px 40px;
//     }
// }
</style>
