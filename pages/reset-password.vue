<template>
    <section class="reset-password-section main-forms">
        <div class="reset-password-content forms-content">
            <b-container>
                <b-row class="justify-content-center">
                    <b-col lg="6" sm="12">
                        <b-card>
                            <div class="text-center mb-5">
                                <span class="forms-heading"
                                    >Reset Password</span
                                >
                            </div>
                            <div
                                class="
                                    mb-3
                                    text-center
                                    font-weight-bold font-18
                                "
                            >
                                We have sent you One Time Verification CODE on
                                your Registered Email Id
                                <span class="italic">
                                        {{email[0]}}******{{emailSplit[0][emailSplit[0].length-1]}}@{{emailSplit[1][0]}}******.{{domain[domain.length-1]}}
                                </span>
                            </div>
                            <b-form name="resetPasswordDetails">
                                <div class="form-details">
                                    <div class="input-section text-center">
                                        <input
                                            v-model="resetPasswordDetails.otp"
                                            maxlength="6"
                                            class="login-user-input-email"
                                            required
                                            onkeyup="if(this.value.length == 6) this.blur()"
                                        />
                                        <div
                                            v-if="
                                                !$v.resetPasswordDetails.otp
                                                    .required &&
                                                    $v.resetPasswordDetails.otp
                                                        .$error &&
                                                    $v.resetPasswordDetails.otp
                                                        .$touch
                                            "
                                            class="error-text py-1"
                                        >
                                            OTP is required
                                        </div>
                                        <div
                                            v-if="
                                                !$v.resetPasswordDetails.otp
                                                    .minLength
                                            "
                                            class="error-text py-1"
                                        >
                                            OTP must have at least 6 letters.
                                        </div>
                                    </div>
                                    <div class="user-passwordField mb-3">
                                        <b-form-input
                                            id="user-password"
                                            v-model="
                                                resetPasswordDetails.newpassword
                                            "
                                            class="input-box-no-border-radius"
                                            type="password"
                                            placeholder="Password*"
                                            required
                                        ></b-form-input>
                                        <div
                                            v-if="!showPassword"
                                            class="iconSection"
                                        >
                                            <font-awesome-icon
                                                :icon="['far', 'eye']"
                                                class="font-14 mt-1 mr-1"
                                                @click="myPassword()"
                                            ></font-awesome-icon>
                                        </div>
                                        <div
                                            v-if="showPassword"
                                            class="iconSection"
                                        >
                                            <font-awesome-icon
                                                :icon="['far', 'eye-slash']"
                                                class="font-14 mt-1 mr-1"
                                                @click="myPassword()"
                                            ></font-awesome-icon>
                                        </div>
                                        <div
                                            v-if="
                                                !$v.resetPasswordDetails
                                                    .newpassword.required &&
                                                    $v.resetPasswordDetails
                                                        .newpassword.$error &&
                                                    $v.resetPasswordDetails
                                                        .newpassword.$touch
                                            "
                                            class="error-txt py-1"
                                        >
                                            Password is required
                                        </div>
                                        <div
                                            v-if="
                                                !$v.resetPasswordDetails
                                                    .newpassword.minLength
                                            "
                                            class="error-txt py-1"
                                        >
                                            Must have at least 8 characters.
                                        </div>
                                        <div
                                            v-if="
                                                !$v.resetPasswordDetails
                                                    .newpassword.goodPassword &&
                                                    resetPasswordDetails.newpassword
                                            "
                                            class="error-txt py-1"
                                        >
                                            Must contain a lower case letter, an
                                            upper case letter, a number and a
                                            special character.
                                        </div>
                                    </div>
                                    <div class="justify-content-center mt-4">
                                        <div class="text-center">
                                            <button
                                                class="
                                                    bg-orange
                                                    text-white
                                                    submit-btn
                                                "
                                                @click="
                                                    confirmForgotPasswordWeb
                                                "
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
            showPassword: '',
            resetPasswordDetails: {
                otp: '',
                newpassword: '',
            },
            emailSplit: '',
            domain:''
        }
    },

    validations: {
        resetPasswordDetails: {
            otp: {
                required,
                minLength: minLength(6),
            },
            newpassword: {
                required,
                minLength: minLength(8),
                goodPassword(newpassword) {
                    return (
                        newpassword.length >= 8 &&
                        /[a-z]/.test(newpassword) &&
                        /[A-Z]/.test(newpassword) &&
                        /[0-9]/.test(newpassword) &&
                        /\W/.test(newpassword) &&
                        !/\s/.test(newpassword)
                    )
                },
            },
        },
    },
    computed: {
        email() {
            return base64.decode(this.$route.query.oid)
        },
    },
    beforeMount() {
        this.emailSplit = this.email.split('@')
        this.domain = this.email.split('.')
    },
    methods: {
        myPassword() {
            const x = document.getElementById('user-password')
            if (x.type === 'password') {
                x.type = 'text'
                this.showPassword = true
            } else {
                x.type = 'password'
                this.showPassword = false
            }
        },
        confirmForgotPasswordWeb(e) {
            e.preventDefault()
            this.resetPasswordDetails.email = this.email
            this.resetPasswordDetails.password = this.resetPasswordDetails.newpassword
            service.confirmForgotPasswordWeb(
                this.resetPasswordDetails,
                (response) => {
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
                    } else {
                        this.login()
                    }
                },
            )
        },
        login() {
            console.log(this.resetPasswordDetails)
            service.loginWeb(this.resetPasswordDetails, (response) => {
                console.log('login response', response)
                if (
                    response &&
                    response.data == '' &&
                    response.statusText == 'No Content'
                ) {
                    this.$toaster.error('Plese Enter Valid Details')
                } else if (response && response.data && response.data.error) {
                    if (response.data.error.code == 'NotConfirmedEmail') {
                        this.$toaster.error(response.data.error.message)
                        this.resendOtp()
                    }else if (response.data.error.code == "NotAuthorizedException"){
                        this.$toaster.error(response.data.error.message)
                    } 
                    else if (
                        response.data.error.code == 'UserNotConfirmedException'
                    ) {
                        this.$toaster.error('Please confirm OTP to signin')
                        this.resendOtp()
                    } else {
                        this.$toaster.error('Sign in Unsuccessful.')
                    }
                    // console.log('error', response.data.error)
                } else if(response.data && response.data.store && response.data.token) {
                    global.setStore(response.data.store)
                    global.setUser(response.data.token)
                    let token = base64.encode(response.data.token)
                    let store = response.data.store
                    this.$router.push(
                        `/authority?store=${store}&token=${token}`,
                    )
                    this.$toaster.success('Sign in Successful.')
                } else {
                    this.$toaster.error('Sign in Unsuccessful.')
                }
            })
        },
        resendOtp() {
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

                        this.$router.push(
                            `/verify-otp?oid=${oid}&access=${access}`,
                        )
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
.user-passwordField {
    position: relative;
    .iconSection {
        cursor: pointer;
        font-size: 10px;
        position: absolute;
        right: 5px;
        top: 8px;
    }
}
</style>
