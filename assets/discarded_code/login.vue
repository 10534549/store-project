<template>
    <section class="signIn-section main-forms">
        <div class="signIn-content forms-content">
            <b-container>
                <b-row class="justify-content-center">
                    <b-col lg="6" md="6" sm="12">
                        <b-card>
                            <div class="text-center mb-5">
                                <span class="forms-heading">Sign In</span>
                            </div>
                            <b-form name="signinDetail">
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
                                                    v-model="signinDetail.email"
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
                                                !$v.signinDetail.email
                                                    .required &&
                                                    $v.signinDetail.email
                                                        .$error &&
                                                    $v.signinDetail.email.$touch
                                            "
                                            class="error-txt py-1"
                                        >
                                            Email Id is required
                                        </div>
                                        <div
                                            v-if="!$v.signinDetail.email.email"
                                            class="error-txt py-1"
                                        >
                                            Email is not a properly formatted
                                            email address.
                                        </div>
                                    </div>
                                    <div class="user-passwordField mb-3">
                                        <b-form-input
                                            id="user-password"
                                            v-model="signinDetail.password"
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
                                                !$v.signinDetail.password
                                                    .required &&
                                                    $v.signinDetail.password
                                                        .$error &&
                                                    $v.signinDetail.password
                                                        .$touch
                                            "
                                            class="error-txt py-1"
                                        >
                                            Password is required
                                        </div>
                                        <div
                                            v-if="
                                                !$v.signinDetail.password
                                                    .minLength
                                            "
                                            class="error-txt py-1"
                                        >
                                            Must have at least 8 characters.
                                        </div>
                                        <div
                                            v-if="
                                                !$v.signinDetail.password
                                                    .goodPassword &&
                                                    signinDetail.password
                                            "
                                            class="error-txt py-1"
                                        >
                                            Must contain a lower case letter, an
                                            upper case letter, a number and a
                                            special character.
                                        </div>
                                    </div>
                                    <div
                                        class="justify-content-center mt-4 mb-5"
                                    >
                                        <nuxt-link to="verify-otp">
                                            <button
                                                class="text-white submit-btn"
                                                @click="loginWeb"
                                            >
                                                CONTINUE
                                            </button>
                                        </nuxt-link>
                                    </div>
                                    <div
                                        class="
                                            text-center
                                            forgot-password
                                            italic
                                        "
                                    >
                                        <div class="mb-2">
                                            <a href="forgot-password">
                                                Forgot Password ?
                                            </a>
                                        </div>
                                        <div class="mb-2">
                                            Don't have an Account ?
                                            <span class="font-weight-bold"
                                                ><a href="sign-up">SIGN UP</a>
                                            </span>
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
// import { required, minLength } from 'vuelidate/lib/validators'
import { required, email, minLength } from 'vuelidate/lib/validators'
import base64 from 'base-64'
import service from '@/service/apiService'
import global from '@/service/global.js'
export default {
    layout: 'login-header',
    data() {
        return {
            showPassword: '',
            signinDetail: {
                email: '',
                password: '',
            },
        }
    },

    validations: {
        signinDetail: {
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(8),
                goodPassword(password) {
                    return (
                        password.length >= 8 &&
                        /[a-z]/.test(password) &&
                        /[A-Z]/.test(password) &&
                        /[0-9]/.test(password) &&
                        /\W/.test(password) &&
                        !/\s/.test(password)
                    )
                },
            },
        },
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
        onSelect(data) {
            // eslint-disable-next-line no-console
            // console.log('data', data)
            this.countryCodeNo = data.dialCode
        },
        loginWeb(e) {
            e.preventDefault()
            service.loginWeb(this.signinDetail, (response) => {
                console.log("login response",response)
                if(response.error){
                    this.$toaster.error(response.errorMessage)
                } else if(response == "Error: Request failed with status code 403"){
                    this.$toaster.error("You dont have rights to login here!")
                }
                else if (
                    response &&
                    response.data == '' &&
                    (response.statusText == 'No Content' || response.statusText == '')
                ) {
                    this.$toaster.error('Plese Enter Valid Details')
                } else if (response && response.data && response.data.error) {
                    if(response.data.error.code == "NotConfirmedEmail"){
                        this.$toaster.error(response.data.error.message)
                        this.resendOtp()
                    } else if (response.data.error.code == "UserNotConfirmedException"){
                        this.$toaster.error("Please confirm OTP to signin")
                        this.resendOtp()
                    }
                    else if (response.data.error.code == "NotAuthorizedException"){
                        this.$toaster.error(response.data.error.message)
                    }
                    else {
                        this.$toaster.error('Sign in Unsuccessful.')
                    }
                    // console.log('error', response.data.error)
                } else if(response.data && response.data.store && response.data.token){
                    this.$toaster.success('Sign in Successful.')
                    global.setStore(response.data.store)
                    global.setUser(response.data.token)
                    let token = base64.encode(response.data.token)
                    let store = response.data.store
                    this.$router.push(`/authority?store=${store}&token=${token}`)
                }
                else {
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
    },
}
</script>
<style lang="scss">
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
.italic {
    font-style: italic;
}
.forgot-password {
    a {
        color: black;
    }
}
.vue-country-select .dropdown {
    padding: 0px 10px;
    background: white;
}
</style>
