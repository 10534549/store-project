<template>
    <div class="main">
        <!-- hero section -->
        <div class="contain">
            <center>
                <img
                    class="banner2
             desktop"
                    alt="about_banner"
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1440&q=60"
                />
                <img
                    class="banner2 mobile"
                    alt="about_banner"
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1440&q=60"
                />
                <div class="centered">
                    <div class="design">
                        Business Registration
                        <p class="subtitle">Grow Your Business</p>
                    </div>
                </div>
            </center>
        </div>
        <!-- end -->
        <v-row>
            <!-- <v-col cols="8" sm="8" md="8" lg="8" xl="8"> -->
            <v-col class="m-1">
                <!-- Form -->
                <v-form ref="form" v-model="valid">
                    <v-card>
                        <v-container>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Selected Package
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="selectedPackage"
                                        hide-details="auto"
                                        readonly
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Price
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="price"
                                        hide-details="auto"
                                        readonly
                                        required
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Membership Limit
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="membershipLimit"
                                        hide-details="auto"
                                        readonly
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Usage
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="usage"
                                        hide-details="auto"
                                        readonly
                                        required
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Shop Name
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="shopName"
                                        :rules="shopRules"
                                        hide-details="auto"
                                        :error-messages="
                                            saveClicked
                                                ? shopName
                                                    ? ''
                                                    : 'Shop Name is required'
                                                : ''
                                        "
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <!-- <v-row>
                                <v-col cols="12" sm="6">
                                    <v-dialog
                                        ref="dialog1"
                                        v-model="modal1"
                                        :return-value.sync="time1"
                                        persistent
                                        width="290px"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                v-model="setTime1"
                                                label="Opening Time*"
                                                append-icon="mdi-clock-time-four-outline"
                                                readonly
                                                :error-messages="
                                                    saveClicked
                                                        ? time1
                                                            ? ''
                                                            : 'Opening Time is required'
                                                        : ''
                                                "
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-time-picker
                                            v-if="modal1"
                                            v-model="time1"
                                            ampm-in-title
                                            full-width
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                text
                                                color="primary"
                                                @click="modal1 = false"
                                            >
                                                Cancel
                                            </v-btn>
                                            <v-btn
                                                text
                                                color="primary"
                                                @click="
                                                    $refs.dialog1.save(time1)
                                                "
                                            >
                                                OK
                                            </v-btn>
                                        </v-time-picker>
                                    </v-dialog>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-dialog
                                        ref="dialog2"
                                        v-model="modal2"
                                        :return-value.sync="time2"
                                        persistent
                                        width="290px"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                v-model="setTime2"
                                                label="Closing Time*"
                                                append-icon="mdi-clock-time-four-outline"
                                                :error-messages="
                                                    saveClicked
                                                        ? time2
                                                            ? ''
                                                            : 'Closing Time is required'
                                                        : ''
                                                "
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-time-picker
                                            v-if="modal2"
                                            v-model="time2"
                                            ampm-in-title
                                            full-width
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                text
                                                color="primary"
                                                @click="modal2 = false"
                                            >
                                                Cancel
                                            </v-btn>
                                            <v-btn
                                                text
                                                color="primary"
                                                @click="
                                                    $refs.dialog2.save(time2)
                                                "
                                            >
                                                OK
                                            </v-btn>
                                        </v-time-picker>
                                    </v-dial89og>
                                </v-col>
                            </v-row> -->
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Contact Number
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="phoneNumber"
                                        :rules="phoneRules"
                                        :error-messages="
                                            saveClicked
                                                ? phoneNumber
                                                    ? ''
                                                    : 'Contact Number is required'
                                                : ''
                                        "
                                        hide-details="auto"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Email
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="email"
                                        :rules="emailRules"
                                        :error-messages="
                                            saveClicked
                                                ? email
                                                    ? ''
                                                    : 'Email is required'
                                                : ''
                                        "
                                        hide-details="auto"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Address
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="address"
                                        :rules="addressRules"
                                        :error-messages="
                                            saveClicked
                                                ? address
                                                    ? ''
                                                    : 'Address is required'
                                                : ''
                                        "
                                        hide-details="auto"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    City
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        dense
                                        outlined
                                        v-model="city"
                                        :items="cityList"
                                        :rules="[
                                            (v) => !!v || 'City is required',
                                        ]"
                                        :error-messages="
                                            saveClicked
                                                ? city
                                                    ? ''
                                                    : 'City is required'
                                                : ''
                                        "
                                        hide-details="auto"
                                        required
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Postal code
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        dense
                                        outlined
                                        v-model="postalCode"
                                        :rules="postalRules"
                                        :error-messages="
                                            saveClicked
                                                ? postalCode
                                                    ? ''
                                                    : 'Postal Code is required'
                                                : ''
                                        "
                                        hide-details="auto"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    State
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        dense
                                        outlined
                                        :rules="[
                                            (v) => !!v || 'State is required',
                                        ]"
                                        :error-messages="
                                            saveClicked
                                                ? state
                                                    ? ''
                                                    : 'State is required'
                                                : ''
                                        "
                                        hide-details="auto"
                                        required
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Country
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        dense
                                        outlined
                                        :rules="[
                                            (v) => !!v || 'Country is required',
                                        ]"
                                        :error-messages="
                                            saveClicked
                                                ? state
                                                    ? ''
                                                    : 'Country is required'
                                                : ''
                                        "
                                        hide-details="auto"
                                        required
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Destination
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        outlined
                                        dense
                                        :rules="[
                                            (v) =>
                                                !!v ||
                                                'Destination is required',
                                        ]"
                                        :error-messages="
                                            saveClicked
                                                ? state
                                                    ? ''
                                                    : 'Destination is required'
                                                : ''
                                        "
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-spacer></v-spacer>
                            <v-row class="d-flex">
                                <v-col cols="2"> </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <strong class="text-center"
                                        >Login Information</strong
                                    >
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Password
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="password"
                                        :append-icon="
                                            show1 ? 'mdi-eye' : 'mdi-eye-off'
                                        "
                                        :rules="[
                                            rules.required,
                                            rules.min,
                                            rules.validate,
                                        ]"
                                        :type="show1 ? 'text' : 'password'"
                                        hint="At least 8 characters"
                                        :error-messages="
                                            saveClicked
                                                ? password
                                                    ? ''
                                                    : 'Password is required'
                                                : ''
                                        "
                                        @click:append="show1 = !show1"
                                        hide-details="auto"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row class="d-flex">
                                <v-col cols="2">
                                    Re-enter password
                                </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="confirmPassword"
                                        :append-icon="
                                            show2 ? 'mdi-eye' : 'mdi-eye-off'
                                        "
                                        :rules="[rules.required, rules.min]"
                                        :type="show1 ? 'text' : 'password'"
                                        :error-messages="errMsg2"
                                        @click:append="show2 = !show2"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2"> </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-col cols="4" class="noCopy pl-5 mb-2">
                                        <div>
                                            {{ num1 }} {{ operator }}
                                            {{ num2 }} =
                                            <div class="txt-field">
                                                <v-text-field
                                                    class="txt-field"
                                                    v-model.number="
                                                        captchaEntered
                                                    "
                                                    hide-details="auto"
                                                ></v-text-field>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex">
                                <v-col cols="2"> </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-container class="px-0 py-0" fluid>
                                        <v-checkbox
                                            v-model="checkbox"
                                            :label="
                                                `I Agree To The Terms & Conditions`
                                            "
                                        ></v-checkbox>
                                    </v-container>
                                </v-col>
                            </v-row>
                            <v-row class="sam4 d-flex">
                                <v-col cols="2"> </v-col>
                                <v-col cols="12" sm="6" md="8">
                                    <v-row class="d-flex">
                                        <v-col cols="4">
                                            <v-card>
                                                <v-card>
                                                    <v-btn
                                                        class="mt-4 white--text"
                                                        block
                                                        color="#f17504"
                                                        elevation="2"
                                                        @click="saveFormData()"
                                                        >Submit</v-btn
                                                    >
                                                </v-card>
                                            </v-card>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-card>
                                                <v-card>
                                                    <v-btn
                                                        class="mt-4 white--text"
                                                        block
                                                        color="grey"
                                                        elevation="2"
                                                        @click="reset()"
                                                        >Clear</v-btn
                                                    >
                                                </v-card>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>

                            <loader v-if="loading" />
                        </v-container>
                        <div class="underline-1"></div>
                        <h2 class="text-center yellow--text text--darken-4">
                            Download App For Best Product And Services ! It's
                            Easy And Smart.
                        </h2>
                        <div>
                            <div class="container">
                                <center>
                                    <a
                                        href="https://play.google.com/store/apps"
                                        target="_blank"
                                        class="market-btn google-btn"
                                        role="button"
                                    >
                                        <span class="market-button-subtitle"
                                            >Download on the</span
                                        >
                                        <span class="market-button-title"
                                            >Google Play</span
                                        >
                                    </a>
                                </center>
                            </div>
                        </div>
                        <div class="underline-1"></div>
                        <div class="footer">
                            <v-row>
                                <v-col cols="12" sm="5" md="4">
                                    <!-- <v-btn text href="/services"> services </v-btn> -->

                                    About us <br />
                                    Business registration<br />
                                    Careers<br />
                                    Support<br />
                                    Sitemap<br />
                                    Contact us<br />
                                </v-col>
                                <v-col cols="12" sm="5" md="6">
                                    Login<br />
                                    Why SmartOfferdeal<br />
                                    Search Product<br />
                                    Download App<br />
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="5"
                                    md="2"
                                    class="smart-deal-offer-logo px-4"
                                >
                                    <img
                                        src="~/assets/img/static/logo.png"
                                        alt=""
                                    />
                                    <v-row no-gutters>
                                        <center>
                                            <v-btn
                                                class="sam3"
                                                dark
                                                fab
                                                bottom
                                                color="grey darken-8"
                                                x-small
                                                :href="
                                                    `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`
                                                "
                                                target="_blank"
                                            >
                                                <v-icon>mdi-facebook</v-icon>
                                            </v-btn>
                                            <v-btn
                                                class="sam3"
                                                dark
                                                fab
                                                bottom
                                                color="grey darken-8"
                                                x-small
                                                :href="
                                                    `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`
                                                "
                                                target="_blank"
                                            >
                                                <v-icon medium>
                                                    mdi-twitter
                                                </v-icon>
                                            </v-btn>
                                            <v-btn
                                                class="sam3"
                                                dark
                                                fab
                                                bottom
                                                color="grey darken-8"
                                                x-small
                                                :href="
                                                    `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`
                                                "
                                                target="_blank"
                                            >
                                                <v-icon medium>
                                                    mdi-instagram</v-icon
                                                >
                                            </v-btn>
                                        </center>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card>
                </v-form>
                <v-spacer />
                <!-- Form end -->
            </v-col>
            <!-- align-self="center" in v-col -->
            <!-- Plans Section to Uncomment -->
            <!-- <v-col align-self="center" cols="4" sm="4" md="4" lg="4" xl="4">
                <v-card
                    rounded
                    elevation="3"
                    justify="center"
                    class="m-2"
                    v-for="plan in packages"
                    :key="plan.id"
                    :color="packagesStatus[plan.id] ? '#f17504' : 'white'"
                    @click="planSelected(plan.id)"
                    :class="packagesStatus[plan.id] ? 'activebdr' : 'bdr'"
                >
                    <v-card-title
                        :class="packagesStatus[plan.id] ? 'activepkg' : 'pkg'"
                        class="pt-12"
                        >{{ plan.name }} </v-card-title
                    ><v-card-subtitle
                        :class="packagesStatus[plan.id] ? 'activepkg' : 'pkg'"
                        class="mt-2"
                        >Website,</v-card-subtitle
                    ><v-card-subtitle
                        :class="packagesStatus[plan.id] ? 'activepkg' : 'pkg'"
                        class=""
                        >Smartofferdeal Listing</v-card-subtitle
                    ><v-card-text
                        class="mt-6"
                        :class="packagesStatus[plan.id] ? 'activepkg' : 'pkg'"
                        >₹{{ plan.price }} /year</v-card-text
                    ></v-card
                >
            </v-col> -->

            <!-- Plans Section end -->
        </v-row>
        <!-- <v-data-table>
            <v-rows>
                <v-col v-for="user in registeredData">
                    {{ user.name }}
                </v-col>
            </v-rows>
        </v-data-table> -->
        <!-- ................discarded code below........................ -->
        <!-- <section class="signUp-section main-forms">
            <div class="signUp-content forms-content">
                <b-container>
                    <b-row class="justify-content-center">
                        <b-col lg="8" sm="12">
                            <b-card>
                                <div class="text-center mb-5">
                                    <span class="forms-heading">Sign Up</span>
                                </div>
                                <b-form name="signupDetail">
                                    <b-row>
                                        <b-col lg="6" sm="12" class="mb-3">
                                            <div class="name-field">
                                                <b-form-input
                                                    v-model="
                                                        signupDetail.firstname
                                                    "
                                                    class="
                                                    input-box-top-border-radius
                                                "
                                                    placeholder="First Name*"
                                                    required
                                                ></b-form-input>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail
                                                            .firstname
                                                            .required &&
                                                            $v.signupDetail
                                                                .firstname
                                                                .$error &&
                                                            $v.signupDetail
                                                                .firstname
                                                                .$touch
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    First Name is required
                                                </div>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail
                                                            .firstname
                                                            .isNameValid
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Must contain only alphabets
                                                    or space.
                                                </div>
                                            </div>
                                        </b-col>

                                        <b-col lg="6" sm="12" class="mb-3">
                                            <div class="name-field">
                                                <b-form-input
                                                    v-model="
                                                        signupDetail.lastname
                                                    "
                                                    class="
                                                    input-box-top-border-radius
                                                "
                                                    placeholder="Last Name*"
                                                    required
                                                ></b-form-input>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail
                                                            .lastname
                                                            .required &&
                                                            $v.signupDetail
                                                                .lastname
                                                                .$error &&
                                                            $v.signupDetail
                                                                .lastname.$touch
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Last Name is required
                                                </div>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail
                                                            .lastname
                                                            .isNameValid
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Must contain only alphabets
                                                    or space.
                                                </div>
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col lg="6" sm="12" class="mb-3">
                                            <div class="email-field">
                                                <b-form-input
                                                    v-model="signupDetail.email"
                                                    type="email"
                                                    class="
                                                    input-box-top-border-radius
                                                "
                                                    placeholder="Email Id*"
                                                    required
                                                ></b-form-input>

                                                <div
                                                    v-if="
                                                        !$v.signupDetail.email
                                                            .required &&
                                                            $v.signupDetail
                                                                .email.$error &&
                                                            $v.signupDetail
                                                                .email.$touch
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Email Id is required
                                                </div>

                                                <div
                                                    v-if="
                                                        !$v.signupDetail.email
                                                            .email
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Email is not a properly
                                                    formatted email address.
                                                </div>
                                            </div>
                                        </b-col>

                                        <b-col lg="6" sm="12" class="mb-3">
                                            <div class="mobileno-field">
                                                <div class="d-flex">
                                                    <div class="w-100">
                                                        <b-form-input
                                                            v-model="
                                                                signupDetail.phone
                                                            "
                                                            maxlength="13"
                                                            class="
                                                            input-box-bottom-border-radius
                                                            mobile-input
                                                        "
                                                            placeholder="Mobile Number*"
                                                            required
                                                        ></b-form-input>
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail.phone
                                                            .required &&
                                                            $v.signupDetail
                                                                .phone.$error &&
                                                            $v.signupDetail
                                                                .phone.$touch
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Mobile number is required
                                                </div>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail.phone
                                                            .minLength
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Must contain 10 digit
                                                    number.
                                                </div>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail.phone
                                                            .maxLength
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Not a valid phone number.
                                                </div>
                                            </div>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col lg="6" sm="12" class="mb-3">
                                            <div class="user-passwordField">
                                                <b-form-input
                                                    id="user-password"
                                                    v-model="
                                                        signupDetail.password
                                                    "
                                                    class="
                                                    input-box-no-border-radius
                                                "
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
                                                        :icon="[
                                                            'far',
                                                            'eye-slash',
                                                        ]"
                                                        class="font-14 mt-1 mr-1"
                                                        @click="myPassword()"
                                                    ></font-awesome-icon>
                                                </div>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail
                                                            .password
                                                            .required &&
                                                            $v.signupDetail
                                                                .password
                                                                .$error &&
                                                            $v.signupDetail
                                                                .password.$touch
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Password is required
                                                </div>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail
                                                            .password.minLength
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Must have at least 8
                                                    characters.
                                                </div>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail
                                                            .password
                                                            .goodPassword &&
                                                            signupDetail.password
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Must contain a lower case
                                                    letter, an upper case
                                                    letter, a number and a
                                                    special character.
                                                </div>
                                            </div>
                                        </b-col>
                                        <b-col lg="6" sm="12" class="mb-3">
                                            <div class="user-passwordField">
                                                <b-form-input
                                                    id="confirm-password"
                                                    v-model="
                                                        signupDetail.repeatPassword
                                                    "
                                                    class="
                                                    input-box-bottom-border-radius
                                                "
                                                    type="password"
                                                    placeholder="Confirm Password*"
                                                    required
                                                ></b-form-input>
                                                <div
                                                    v-if="!showConfirmPassword"
                                                    class="iconSection"
                                                >
                                                    <font-awesome-icon
                                                        :icon="['far', 'eye']"
                                                        class="font-14 mt-1 mr-1"
                                                        @click="
                                                            myConfirmPassword()
                                                        "
                                                    ></font-awesome-icon>
                                                </div>
                                                <div
                                                    v-if="showConfirmPassword"
                                                    class="iconSection"
                                                >
                                                    <font-awesome-icon
                                                        :icon="[
                                                            'far',
                                                            'eye-slash',
                                                        ]"
                                                        class="font-14 mt-1 mr-1"
                                                        @click="
                                                            myConfirmPassword()
                                                        "
                                                    ></font-awesome-icon>
                                                </div>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail
                                                            .repeatPassword
                                                            .required &&
                                                            $v.signupDetail
                                                                .repeatPassword
                                                                .$error &&
                                                            $v.signupDetail
                                                                .repeatPassword
                                                                .$touch
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Repeat Password is required
                                                </div>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail
                                                            .repeatPassword
                                                            .sameAsPassword
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Passwords must be identical.
                                                </div>
                                            </div>
                                        </b-col>
                                    </b-row>

                                    <b-row>
                                        <b-col lg="6" sm="12" class="mb-3">
                                            <div class="gender-field">
                                                <select
                                                    v-model="
                                                        signupDetail.gender
                                                    "
                                                    class="form-control"
                                                >
                                                    <option value="" selected>
                                                        Gender*
                                                    </option>
                                                    <option value="female">
                                                        Female
                                                    </option>
                                                    <option value="male">
                                                        Male
                                                    </option>
                                                </select>
                                                <div
                                                    v-if="
                                                        !$v.signupDetail.gender
                                                            .required &&
                                                            $v.signupDetail
                                                                .gender
                                                                .$error &&
                                                            $v.signupDetail
                                                                .gender.$touch
                                                    "
                                                    class="error-txt py-1"
                                                >
                                                    Gender is required
                                                </div>
                                            </div>
                                        </b-col>
                                        <b-col lg="6" sm="12" class="mb-3">
                                            <div class="referral-field">
                                                <b-form-input
                                                    v-model="
                                                        signupDetail.referral
                                                    "
                                                    type="text"
                                                    class="
                                                    input-box-top-border-radius
                                                "
                                                    placeholder="Referral Code"
                                                    required
                                                ></b-form-input>
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <b-row class="justify-content-center mt-4">
                                        <b-col lg="6">
                                            <div class="text-center">
                                                <button
                                                    class="
                                                    bg-orange
                                                    text-white
                                                    submit-btn
                                                "
                                                    @click="signUpWeb"
                                                >
                                                    SUBMIT
                                                </button>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-form>
                                <div
                                    class="text-center mt-4 login-link"
                                    style="font-style: italic"
                                >
                                    Already have account ?
                                    <span class="italic"
                                        ><a href="login">SIGN IN</a>
                                    </span>
                                </div>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </section> -->
        <v-footer color="grey" :absolute="!fixed" app>
            <span class=" white--text"
                >&copy; {{ new Date().getFullYear() }} SmartOfferDeal</span
            >
            <v-spacer></v-spacer>
            <span class=" white--text"> Terms & Conditions</span>
        </v-footer>
    </div>
</template>
<script>
import {
    required,
    helpers,
    email,
    sameAs,
    minLength,
    maxLength,
} from 'vuelidate/lib/validators'
import global from '@/service/global'
import base64 from 'base-64'
import apiService from '@/service/apiService'
import cityState from '@/assets/json/state-city.json'
import states from '@/assets/json/states.json'
import loader from '~/components/loader.vue'
import axios from 'axios'

export default {
    layout: 'login-header',
    components: {
        loader,
    },
    data() {
        return {
            saveClicked: false,
            checkbox: false,
            num1: '',
            num2: '',
            captchaEntered: '',
            captchaAnswer: '',
            operator: '',
            valid: false,
            show1: false,
            show2: false,
            loading: false,
            packages: [
                { id: '0', name: 'Package 1', price: '500' },
                { id: '1', name: 'Package 2', price: '1000' },
                { id: '2', name: 'Package 3', price: '1500' },
            ],
            packagesStatus: [true, false, false],
            selectedPackage: 'Package 1',
            price: '500',
            membershipLimit: '1 Year',
            usage: 'Unlimited',
            shopName: '',
            states: states,
            cityState: cityState,

            phoneNumber: '',
            email: '',
            state: '',
            city: '',

            address: '',
            addressRules: [(v) => !!v || 'Shop Address is required'],
            postalCode: '',
            postalRules: [
                (v) => !!v || 'Postal Code is required',
                (v) => (v && v.length) == 6 || 'Invalid Postal Code',
            ],
            shopRules: [(v) => !!v || 'Shop Name is required'],
            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) =>
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) ||
                    'E-mail must be valid',
            ],
            nameRules: [
                (v) => !!v || 'Field is required',
                (v) =>
                    /^[A-Za-z]+$/.test(v) ||
                    'Invalid Characters entered for field',
            ],
            password: '',
            confirmPassword: '',
            errMsg2: '',
            rules: {
                required: (value) => !!value || 'Required.',
                min: (v) => (v && v.length) >= 8 || 'Min 8 characters',
                validate: (v) =>
                    /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/.test(
                        v,
                    ) ||
                    'Password must contain an Uppercase letter, a Lowercase letter, a Number and a Special Character',
            },
            phoneRules: [
                (value) => !!value || 'Phone Number is Required',
                (v) => (v && v.length) == 10 || 'Invalid phone number',
                (v) =>
                    /^[0-9]{10}$/.test(v) ||
                    'Invalid characters entered for phone number',
            ],

            // .......................................
            showPassword: '',
            showConfirmPassword: '',
            signupDetail: {
                shopName: '',
                email: '',
                phoneNumber: '',
                state: '',
                membershipLimit: '',
                address: '',
                postalCode: '',
                city: '',
                password: '',
                confirmPassword: '',
            },
            // registrationData: {
            //     name: '',
            //     email: '',
            //     phoneNumber: '',
            //     state: '',
            //     membershipLimit: '',
            // },
            // registeredData: [],
        }
    },
    watch: {
        packagesStatus() {
            for (let i = 0; i < 3; i++) {
                if (this.packagesStatus[i]) {
                    this.selectedPackage = this.packages[i].name
                    this.price = this.packages[i].price
                }
            }
        },
        confirmPassword() {
            if (this.confirmPassword != this.password) {
                this.errMsg2 = 'Password does not match'
            } else {
                this.errMsg2 = ''
            }
        },
        time2(val) {
            if (val) {
                this.closingTime.A = this.tConvert(val).slice(-2)
                if (this.tConvert(val).length === 6) {
                    this.setTime2 = '0' + this.tConvert(val)
                    this.closingTime.hh = this.setTime2.substring(0, 2)
                    this.closingTime.mm = this.setTime2.substring(3, 5)
                } else {
                    this.setTime2 = this.tConvert(val)
                    this.closingTime.hh = this.setTime2.substring(0, 2)
                    this.closingTime.mm = this.setTime2.substring(3, 5)
                }
            }
        },
        time1(val) {
            if (val) {
                this.openingTime.hh = this.time1.substring(0, 2)
                this.openingTime.mm = this.time1.substring(3, 5)
                this.openingTime.A = this.tConvert(val).slice(-2)
                if (this.tConvert(val).length === 6) {
                    this.setTime1 = '0' + this.tConvert(val)
                    this.openingTime.hh = this.setTime1.substring(0, 2)
                    this.openingTime.mm = this.setTime1.substring(3, 5)
                } else {
                    this.setTime1 = this.tConvert(val)
                    this.openingTime.hh = this.setTime1.substring(0, 2)
                    this.openingTime.mm = this.setTime1.substring(3, 5)
                }
            }
        },
    },
    validations: {
        signupDetail: {
            firstname: {
                required,
                isNameValid: helpers.regex('alpha_space', /^[a-zA-Z\s]*$/),
            },
            lastname: {
                required,
                isNameValid: helpers.regex('alpha_space', /^[a-zA-Z\s]*$/),
            },
            email: {
                required,
                email,
            },
            gender: {
                required,
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
            repeatPassword: {
                sameAsPassword: sameAs('password'),
            },
            phone: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(13),
                isPhoneValid(password) {
                    return /^[+]\d{1,2}\d{0,10}/.test(password)
                },
            },
        },
    },
    computed: {
        stateList() {
            let sL = []
            for (let stateName of this.states) {
                sL.push(stateName.name)
            }
            return sL
        },
        cityList() {
            let cL = []
            if (this.state != '') {
                for (let cityName of this.cityState) {
                    if (cityName.state == this.state) {
                        cL.push(cityName.name)
                    }
                }
            }
            return cL
        },
    },
    mounted() {
        this.chooseOperator()
        if (global.getStore()) {
            this.$router.push('/')
        }
    },

    methods: {
        // submitForm() {
        //     axios
        //         .post('/apiServices.js', this.signupData)
        //         .then((res) => {
        //             //Perform Success Action
        //         })
        //         .catch((error) => {
        //             // error.response.status Check status code
        //         })
        //         .finally(() => {
        //             //Perform action in always
        //         })
        // },

        chooseOperator() {
            let op = ['+', '-']
            let index = Math.floor(Math.random() * 2)
            this.operator = op[index]
            this.num1 = Math.floor(Math.random() * 10 + 1)
            this.num2 = Math.floor(Math.random() * 10 + 1)
            if (this.num1 < this.num2) {
                let temp = this.num1
                this.num1 = this.num2
                this.num2 = temp
            }
            if (this.operator == '+') {
                this.captchaAnswer = this.num1 + this.num2
            } else if (this.operator == '-') {
                this.captchaAnswer = this.num1 - this.num2
            } else {
                this.captchaAnswer = this.num1 * this.num2
            }
        },
        reset() {
            if (this.$refs[`form`]) {
                this.$refs[`form`].reset()
                this.loading = false
                this.selectedPackage = 'Package 1'
                this.price = '500'
                this.membershipLimit = '1 Year'
                this.usage = 'Unlimited'
                this.shopName = ''
                this.firstname = ''
                this.lastname = ''
                this.phoneNumber = ''
                this.email = ''
                this.postalCode = ''
                this.state = ''
                this.city = ''
                this.address = ''
                this.password = ''
                this.confirmPassword = ''
                this.checkbox = false
                this.errMsg2 = ''
                this.saveClicked = false
                this.$refs[`form`].resetValidation()
                this.chooseOperator()
                this.planSelected(0)
            }
        },
        planSelected(id) {
            this.packagesStatus.forEach((item, index) => {
                if (index == id) {
                    this.$set(this.packagesStatus, index, true)
                } else {
                    this.$set(this.packagesStatus, index, false)
                }
            })
        },
        dialogClose() {
            this.$emit('closeDialog')
        },
        // tConvert(time) {
        //     // Check correct time format and split into components
        //     time = time
        //         .toString()
        //         .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]

        //     if (time.length > 1) {
        //         // If time format correct
        //         time = time.slice(1) // Remove full string match value
        //         time[5] = +time[0] < 12 ? 'AM' : 'PM' // Set AM/PM
        //         time[0] = +time[0] % 12 || 12 // Adjust hours
        //     }
        //     return time.join('') // return adjusted time or original string
        // },,
        saveFormData() {
            // console.log('time1', this.openingTime)
            // console.log('time2', this.closingTime)
            this.saveClicked = true
            if (this.valid && this.checkbox) {
                if (this.captchaEntered === this.captchaAnswer) {
                    this.loading = true
                    let country = 'India'
                    let countryCodeNo = '+91'
                    let phone = countryCodeNo + this.phoneNumber
                    let signupFormData = {
                        shopName: this.shopName,
                        address: this.address,
                        firstname: this.firstname,
                        lastname: this.lastname,
                        password: this.password,
                        phone: phone,
                        email: this.email,
                        country: country,
                        city: this.city,
                        pinCode: this.postalCode,
                        state: this.state,
                        type: 'store',
                        webSiteType: 'store',
                    }
                    console.log('signUp:', signupFormData)
                    // .......................................
                    apiService.signUpWeb(signupFormData, (response) => {
                        // this.$router.push('/extra')
                        if (
                            response &&
                            response.data &&
                            response.data.error &&
                            response.data.error.code ==
                                'InvalidParameterException'
                        ) {
                            this.loading = false
                            this.$toaster.error('Please Enter Valid Details')
                        } else if (
                            response &&
                            response.data &&
                            response.data.error &&
                            response.data.error.code ==
                                'UsernameExistsException'
                        ) {
                            this.dialogClose()
                            this.loading = false
                            this.$toaster.error(
                                response.data.error.message + ' please login',
                            )
                        } else if (
                            response &&
                            response.data &&
                            response.data.error &&
                            response.data.code == 'userAlreadyExists'
                        ) {
                            this.dialogClose()
                            this.loading = false
                            this.$toaster.error(response.data.message)
                        } else if (
                            response &&
                            response.data &&
                            response.data.error &&
                            response.data.error.code
                        ) {
                            this.dialogClose()
                            this.loading = false
                            this.$toaster.error(response.data.error.message)
                        } else if (
                            response &&
                            response.data &&
                            response.data.error
                        ) {
                            this.$toaster.error('Unable to send OTP')
                            this.loading = false
                        } else if (
                            response.data &&
                            response.data == 'success'
                        ) {
                            this.$toaster.success('OTP sent Successfully.')
                            this.loading = false
                            const oid = base64.encode(signupFormData.email)
                            const access = base64.encode(
                                signupFormData.password,
                            )
                            this.dialogClose()
                            this.$router.push(
                                `/verify-otp?oid=${oid}&access=${access}`,
                            )
                            this.$toaster.success(
                                'Please update your Profile & Plan',
                            )
                        } else {
                            this.dialogClose()
                            this.loading = false
                            this.$toaster.error(
                                'Unable to signup please try again later',
                            )
                        }
                    })
                } else {
                    this.$toaster.error('Wrong Captcha Entered')
                    this.saveClicked = false
                    this.chooseOperator()
                }
            } else {
                this.$toaster.error('Please fill the required fields')
            }
            this.regteredData.push(this.registrationData)
        },

        // storeListWithFilter: (dataObj, callback) => {
        //     const obj = dataObj

        //     const accessToken = global.getToken()

        //     return axios

        //         .post(`${global.adminUrl}Store/searchInBackend`, obj, {
        //             headers: {
        //                 accesstoken: accessToken,
        //             },
        //         })

        //         .then((response) => {
        //             if (response.status === 200) {
        //                 callback(response)
        //             } else if (response.status === 204) {
        //                 callback([])
        //             }
        //         })

        //         .catch((err) => {
        //             callback(err)
        //         })
        // },

        // ...............................................
        // onSelect(data) {
        //     // console.log('data', data)
        //     this.countryCodeNo = data.dialCode
        // },
        // myPassword() {
        //     const x = document.getElementById('user-password')
        //     if (x.type === 'password') {
        //         x.t    ype = 'text'
        //         this.showPassword = true
        //     } else {
        //         x.type = 'password'
        //         this.showPassword = false
        //     }
        // },
        // myConfirmPassword() {
        //     const x = document.getElementById('confirm-password')
        //     if (x.type === 'password') {
        //         x.type = 'text'
        //         this.showConfirmPassword = true
        //     } else {
        //         x.type = 'password'
        //         this.showConfirmPassword = false
        //     }
        // },
        // signUpWeb(e) {
        //     e.preventDefault()

        //     this.signupDetail.type = 'store'
        //     this.signupDetail.webSiteType = 'store'
        //     console.log(this.signupDetail)
        // },
    },
}
</script>
<style lang="scss">
.design {
    top: 20% !important;
}

.v-input.theme--light.v-input--selection-controls.v-input--checkbox {
    padding-left: 5px;
}

div.col.col-6,
div.col.col-12 {
    padding: 6px;
}

div.col.col-4,
div.col.col-3 {
    padding: 12px 6px;
}

.txt-field {
    display: inline-block;
    width: 50%;
}

.noCopy {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}

label {
    margin-bottom: 0rem;
}

.banner2 {
    width: 100vw;
    height: 50vh;
}

.main {
    max-width: 100%;
    overflow: hidden;
}

.col-5,
.col-4 {
    padding: 0 1rem 6px 0px;
}

.col-sm-6 {
    padding: 1rem 0.9rem 0px 12px;
}

.col-7,
.col-8 {
    padding: 8px 6px 6px 1.2rem;
}

.design {
    vertical-align: middle !important;
    text-align: center;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -60%);
    font-size: 3.6rem;
    font-family: 'Roboto';
    color: white;
    text-shadow: 0 1px 0;
    /* text-decoration: bold; */
}

.subtitle {
    // color: #f17504;
    color: whitesmoke;
    font-family: monospace;
    font-size: 1.5rem;
}

.subtitle2 {
    color: black;
    font-family: 'Roboto';
    font-size: 1rem;
}

.map-margin {
    margin: 0 0 1rem 3rem;
}

.contain img.desktop {
    filter: grayscale(100%) brightness(35%) sepia(300%) hue-rotate(60deg)
        saturate(500%) blur(3px);
    object-fit: cover;
    opacity: 0.5;
}

.contain img.mobile {
    /* filter: blur(5px);
    filter: sepia(80%);
    filter: invert(40%); */
    filter: grayscale(100%) brightness(40%) sepia(300%) hue-rotate(60deg)
        saturate(500%);
    object-fit: cover;
    opacity: 0.5;
    height: 40vh;
    width: 100vh;
}

.contain {
    // margin-bottom: 4rem;
    overflow: hidden !important;
}

@media only screen and (min-width: 767px) {
    .mobile {
        display: none;
    }
}

@media only screen and (max-width: 767px) {
    .design {
        top: 21%;
        font-size: 1.5rem;
    }

    .subtitle {
        font-size: 1rem;
    }

    .map {
        width: 95vw;
    }

    .map-margin {
        margin: 2rem 0 1rem 0;
    }

    .desktop {
        display: none;
    }
}

@media (min-width: 768px) and (max-width: 1260px) {
    .map-margin {
        margin: 2rem 0 1rem 0;
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

.italic {
    font-style: italic;
}

.form-control {
    font-size: 0.8rem;
}

.login-link {
    a {
        color: black;
        font-weight: bold;
    }
}

.m-2.v-card.v-card--link.v-sheet.theme--light.elevation-3.rounded {
    height: 300px;
}

.v-card__title {
    font-size: 2.25rem;
}

.v-card__subtitle,
.v-card__text {
    font-size: 1.5rem;
}

.activepkg {
    color: white !important;
}

.pkg {
    color: black !important;
}

.activebdr {
    border: 1px solid #ff2400 !important;
}

.bdr {
    border: 1px solid silver !important;
}

.underline-1 {
    height: 2px;
    width: 1540px;
    background-color: grey;
    border-radius: 8px;
    margin-bottom: 16px;
    align-items: inherit;
}

.market-btn {
    display: inline-block;
    padding: 0.3125rem 0.875rem;
    padding-left: 2.8125rem;
    -webkit-transition: border-color 0.25s ease-in-out,
        background-color 0.25s ease-in-out;
    transition: border-color 0.25s ease-in-out,
        background-color 0.25s ease-in-out;
    border: 1px solid black;
    background-position: center left 0.75rem;
    background-color: black;
    background-size: 1.5rem 1.5rem;
    background-repeat: no-repeat;
    text-decoration: none;
}

.market-btn .market-button-subtitle {
    display: block;
    margin-bottom: -0.25rem;
    color: #888;
    font-size: 0.75rem;
}

.market-btn:hover {
    background-color: #f7f7f7;
    text-decoration: none;
}

.google-btn {
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzVDREFERDsiIHBvaW50cz0iMjkuNTMsMCAyOS41MywyNTEuNTA5IDI5LjUzLDUxMiAyOTkuMDA0LDI1MS41MDkgIi8+Cjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNCREVDQzQ7IiBwb2ludHM9IjM2OS4wNjcsMTgwLjU0NyAyNjIuMTc1LDExOS40NjcgMjkuNTMsMCAyOTkuMDA0LDI1MS41MDkgIi8+Cjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNEQzY4QTE7IiBwb2ludHM9IjI5LjUzLDUxMiAyOS41Myw1MTIgMjYyLjE3NSwzODMuNTUxIDM2OS4wNjcsMzIyLjQ3IDI5OS4wMDQsMjUxLjUwOSAiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQ0E5NjsiIGQ9Ik0zNjkuMDY3LDE4MC41NDdsLTcwLjA2Myw3MC45NjFsNzAuMDYzLDcwLjk2MWwxMDguNjg4LTYyLjg3N2M2LjI4OC0zLjU5Myw2LjI4OC0xMS42NzcsMC0xNS4yNyAgTDM2OS4wNjcsMTgwLjU0N3oiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==);
}

.market-btn-light {
    border-color: rgba(255, 255, 255, 0.14);
    background-color: rgba(0, 0, 0, 0);
}

.market-btn-light .market-button-title {
    color: #fff;
}

.market-btn-light .market-button-subtitle {
    color: rgba(255, 255, 255, 0.6);
}

.market-btn-light:hover {
    background-color: rgba(255, 255, 255, 0.06);
}

.footer {
    padding: 80px;
}

.smart-deal-offer-logo {
    width: 160px;

    img {
        width: 60%;
        height: 70%;
    }
}

.sam3 {
    margin: 1px;
}

.sam4 {
    padding: 80px;
}
</style>
