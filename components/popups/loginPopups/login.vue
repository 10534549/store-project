<template>
    <div>
        <v-form v-model="valid">
            <v-container rounded class="rounded-xl">
                <v-text-field
                    v-model="email"
                    outlined
                    :rules="emailRules"
                    label="Email"
                    :error-messages="
                        saveClicked ? (email ? '' : 'Email is required') : ''
                    "
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    label="Password"
                    outlined
                    hint="At least 8 characters"
                    :error-messages="
                        saveClicked
                            ? password
                                ? ''
                                : 'Password is required'
                            : ''
                    "
                    @click:append="show1 = !show1"
                ></v-text-field>
                <v-row>
                    <v-col cols="6">
                        <v-container @click="dialogClose">
                            <nuxt-link
                                class="orange--text dark"
                                to="forgot-password"
                            >
                                Forgot Password ?
                            </nuxt-link>
                        </v-container>
                    </v-col>
                    <v-col cols="6">
                        <v-card>
                            <v-btn
                                class="btn-padding"
                                block
                                color="#f17504"
                                elevation="2"
                                @click="saveFormData()"
                                >Log In</v-btn
                            >
                        </v-card>
                    </v-col>
                </v-row>
                <loader v-if="loading" />
            </v-container>
        </v-form>
    </div>
</template>

<script>
import base64 from 'base-64'
import apiService from '@/service/apiService'
import global from '@/service/global.js'
import loader from '~/components/loader.vue'

export default {
    components: {
        loader,
    },
    data: () => ({
        loading: false,
        saveClicked: false,
        valid: false,
        show1: false,
        email: '',
        emailRules: [
            (v) => !!v || 'E-mail is required',
            (v) =>
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ||
                'E-mail must be valid',
        ],
        password: '',
        rules: {
            required: (value) => !!value || 'Required.',
            min: (v) => v.length >= 8 || 'Min 8 characters',
        },
    }),
    watch: {
        email() {
            this.saveClicked = false
        },
        password() {
            this.saveClicked = false
        },
    },
    methods: {
        dialogClose() {
            this.$emit('closeDialog')
        },
        saveFormData() {
            this.saveClicked = true
            if (this.valid) {
                let signInFormData = {
                    email: this.email,
                    password: this.password,
                }
                this.loading = true
                apiService.loginWeb(signInFormData, (response) => {
                    if (response.error) {
                        this.$toaster.error(response.errorMessage)
                        this.loading = false
                    } else if (
                        response == 'Error: Request failed with status code 403'
                    ) {
                        this.$toaster.error(
                            'You dont have rights to login here!',
                        )
                        this.loading = false
                    } else if (
                        response &&
                        response.data == '' &&
                        (response.statusText == 'No Content' ||
                            response.statusText == '')
                    ) {
                        this.$toaster.error('Plese Enter Valid Details')
                        this.loading = false
                    } else if (
                        response &&
                        response.data &&
                        response.data.error
                    ) {
                        if (response.data.error.code == 'NotConfirmedEmail') {
                            this.$toaster.error(response.data.error.message)
                            this.loading = false
                            this.resendOtp()
                        } else if (
                            response.data.error.code ==
                            'UserNotConfirmedException'
                        ) {
                            this.$toaster.error('Please confirm OTP to signin')
                            this.loading = false
                            this.resendOtp()
                        } else if (
                            response.data.error.code == 'NotAuthorizedException'
                        ) {
                            this.loading = false
                            this.$toaster.error(response.data.error.message)
                        } else {
                            this.loading = false
                            this.$toaster.error('Sign in Unsuccessful.')
                        }
                        // console.log('error', response.data.error)
                    } else if (
                        response.data &&
                        response.data.store &&
                        response.data.token
                    ) {
                        this.loading = false
                        this.$toaster.success('Sign in Successful.')
                        global.setStore(response.data.store)
                        global.setUser(response.data.token)
                        let token = base64.encode(response.data.token)
                        let store = response.data.store
                        this.$router.push(
                            `/authority?store=${store}&token=${token}`,
                        )
                    } else {
                        this.loading = false
                        this.$toaster.error('Unable to login please retry')
                    }
                })
                // console.log('formData: ', signInFormData)
            } else {
                this.loading = false
            }
        },
        resendOtp() {
            apiService.resendOtpWeb({ email: this.email }, (response) => {
                this.loading = false
                console.log(' resend otp response', response)
                if (response && (response.data.error || response.data.code)) {
                    if (response.data.code == 'LimitExceededException') {
                        this.$toaster.error(response.data.message)
                    } else {
                        console.log('error', response.data.error)
                        this.$toaster.error('Otp send Unsuccessful.')
                    }
                } else {
                    this.$toaster.success('Otp sent Successfully.')
                    const oid = base64.encode(this.email)
                    const access = base64.encode(this.password)

                    this.$router.push(`/verify-otp?oid=${oid}&access=${access}`)
                }
            })
        },
    },
}
</script>
