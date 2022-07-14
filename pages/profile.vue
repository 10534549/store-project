<template>
    <div class="profile-section main-content padd-top-80">
        <!-- title section start -->
        <div
            class="
                title-section
                px-4
                p-2
                border-bottom
                d-flex
                justify-content-between
            "
        >
            <div class="title text-uppercase">{{ title }}</div>
            <div>
                <nuxt-link to="preview-store">
                    <b-button
                        id="shadow-none"
                        variant="success"
                        class="btn-sm px-3 bg-light-green shadow-none"
                        pill
                        >Preview</b-button
                    >
                </nuxt-link>
            </div>
        </div>
        <!-- title section end -->
        <!-- store profile section start -->
        <div class="store-profile-content p-3">
            <!-- store plan section start -->
            <b-card>
                <div class="store-plan-section">
                    <div class="store-photo-section border-bottom px-3 py-3">
                        <div class="d-flex">
                            <div class="store-image-section">
                                <b-img
                                    :src="
                                        storeDetails.store.images
                                            | imageRender('store-152.png')
                                    "
                                    class="store-image"
                                    :alt="storeDetails.store.name"
                                />
                            </div>
                            <div class="shop-name pl-3">
                                <div class="font-16 open-sans-bold">
                                    {{ storeDetails.store.name }}
                                </div>
                                <div class="font-13 open-sans">
                                    <a
                                        :href="`${storeDetails.store.websiteLink}`"
                                        target="_blank"
                                    >
                                        {{ storeDetails.store.websiteLink }}</a
                                    >
                                </div>
                                <div class="font-10 mt-1">
                                    GST:{{ storeDetails.store.gstNumber }}
                                </div>
                            </div>
                            <div
                                class="edit-section ml-auto font-10 shadow-none"
                            >
                                <nuxt-link
                                    :to="
                                        '/update-store/' +
                                        storeDetails.store._id
                                    "
                                >
                                    <div class="edit font-12 pointer">
                                        <span>
                                            <font-awesome-icon
                                                :icon="['fas', 'pencil-alt']"
                                            />
                                        </span>
                                        <span>Edit</span>
                                    </div>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div
                        class="
                            my-plan-section
                            border-bottom
                            px-3
                            py-3
                            open-sans-semi-bold
                        "
                    >
                        <div
                            class="
                                d-flex
                                justify-content-between
                                align-items-center
                                mb-2
                            "
                        >
                            <div class="font-18 text-uppercase open-sans-bold">
                                MY PLANS
                            </div>
                            <div class="update-plan-btn">
                                <!-- <nuxt-link
                                    v-if="updateplans && myPlan"
                                    :to="{
                                        name: 'update-plan-type',
                                        params: {
                                            type: 'update',
                                        },
                                    }"
                                >
                                    <button
                                        type="button"
                                        class="btn btn-sm bg-navy-blue shadow-none btn-secondary"
                                    >
                                        Update Plan
                                    </button>
                                </nuxt-link> -->
                                <nuxt-link
                                    v-if="myPlan"
                                    :to="{
                                        name: 'update-plan-type',
                                        params: {
                                            type: 'update',
                                        },
                                    }"
                                >
                                    <button
                                        type="button"
                                        class="
                                            btn btn-sm
                                            bg-navy-blue
                                            shadow-none
                                            btn-secondary
                                        "
                                    >
                                        Upgrade
                                    </button>
                                </nuxt-link>
                                <nuxt-link
                                    v-if="createPlan"
                                    :to="{
                                        name: 'update-plan-type',
                                        params: {
                                            type: 'create',
                                        },
                                    }"
                                >
                                    <button
                                        type="button"
                                        class="
                                            btn btn-sm
                                            bg-navy-blue
                                            shadow-none
                                            btn-secondary
                                        "
                                    >
                                        Plan
                                    </button>
                                </nuxt-link>
                            </div>
                        </div>
                        <div v-if="myPlan" class="">
                            <div
                                v-if="storeDetails.store.package"
                                class="d-flex justify-content-between mb-2"
                            >
                                <div class="font-14">
                                    {{ storeDetails.store.package.name }}
                                </div>
                                <div
                                    v-if="showGreenNotification"
                                    class="red--text"
                                >
                                    Expiry Date:
                                    {{ storeDetails.store.packageExpiry }}
                                </div>
                                <div
                                    v-if="showRedNotification"
                                    class="red--text"
                                >
                                    Expired Date:
                                    {{ storeDetails.store.packageExpiry }}
                                </div>
                                <div v-if="showExpired">
                                    Expired Date:
                                    {{ storeDetails.store.packageExpiry }}
                                </div>
                                <div v-if="showExpired" class="bg-red p-1">
                                    Expired
                                </div>
                            </div>
                            <div class="main-pending-section">
                                <div class="pending-section">
                                    <div class="pending p-1">
                                        <div class="d-flex align-items-center">
                                            <div
                                                class="total-pending-no font-18"
                                            >
                                                {{
                                                    storeDetails.pendingPackageNotification ||
                                                    0
                                                }}
                                            </div>
                                            <div class="font-12 pl-2">
                                                Pending Push Msgs
                                            </div>
                                        </div>
                                        <div class="text-right font-18 pt-3">
                                            Total
                                            {{
                                                storeDetails.store.package
                                                    .noOfNotifications || 0
                                            }}
                                        </div>
                                    </div>
                                </div>
                                <div class="pending-section ml-2">
                                    <div class="pending p-1">
                                        <div class="d-flex align-items-center">
                                            <div
                                                class="total-pending-no font-18"
                                            >
                                                {{
                                                    storeDetails.pendingOffers ||
                                                    0
                                                }}
                                            </div>
                                            <div class="font-12 pl-2">
                                                Pending Offers
                                            </div>
                                        </div>
                                        <div class="text-right font-18 pt-3">
                                            Total
                                            {{
                                                storeDetails.store.package
                                                    .noOfOffers || 0
                                            }}
                                        </div>
                                    </div>
                                </div>
                                <div class="pending-section ml-2">
                                    <div class="pending p-1">
                                        <div class="d-flex align-items-center">
                                            <div
                                                class="total-pending-no font-18"
                                            >
                                                {{
                                                    storeDetails.pendingDeals ||
                                                    0
                                                }}
                                            </div>
                                            <div class="font-12 pl-2">
                                                Pending Deals
                                            </div>
                                        </div>
                                        <div class="text-right font-18 pt-3">
                                            Total
                                            {{
                                                storeDetails.store.package
                                                    .noOfDeals || 0
                                            }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="
                            my-plan-section
                            border-bottom
                            px-3
                            py-3
                            open-sans-semi-bold
                        "
                    >
                        <div
                            class="
                                d-flex
                                justify-content-between
                                align-items-center
                                mb-2
                            "
                        >
                            <div class="font-18 text-uppercase open-sans-bold">
                                Topup
                            </div>
                            <div class="update-plan-btn">
                                <button
                                    type="button"
                                    class="
                                        btn btn-sm
                                        bg-navy-blue
                                        shadow-none
                                        btn-secondary
                                    "
                                >
                                    <nuxt-link to="/top-up">Topup</nuxt-link>
                                </button>
                            </div>
                        </div>
                        <div
                            v-if="
                                storeDetails.topup &&
                                storeDetails.topup.length > 0
                            "
                            class="
                                d-flex
                                justify-content-between
                                align-items-end
                            "
                        >
                            <div class="d-flex">
                                <div class="font-14">
                                    <div>
                                        {{ storeDetails.topup[0].topup.text }}
                                    </div>
                                    <div>
                                        Expiry Date:
                                        <span>
                                            {{
                                                storeDetails.topup[0]
                                                    .topupExpiry
                                                    | moment('Do MMMM , YYYY ')
                                            }}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    v-for="topup in storeDetails.topup.slice(
                                        0,
                                        2,
                                    )"
                                    :key="topup._id"
                                    class="pending-section ml-2"
                                >
                                    <div class="pending px-3 py-2">
                                        <div class="d-flex align-items-center">
                                            <div
                                                class="total-pending-no font-18"
                                            >
                                                {{
                                                    topup.pendingTopUpNotification
                                                }}
                                            </div>
                                            <div class="font-12 pl-2">
                                                Pending Push Msgs
                                            </div>
                                        </div>
                                        <div class="text-right font-18 pt-3">
                                            Total
                                            {{
                                                topup.topup
                                                    .numberOfNotifications
                                            }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                v-if="storeDetails.topup.length > 2"
                                class="update-plan-btn"
                            >
                                <button
                                    v-b-modal="'topup-list'"
                                    type="button"
                                    class="btn btn-link shadow-none p-0"
                                >
                                    <a class>View All Topup's</a>
                                </button>
                                <listView></listView>
                            </div>
                        </div>
                        <div
                            v-if="storeDetails.topup == undefined"
                            class="py-1 font-16 font-weight-bold"
                        >
                            Loading ..
                        </div>
                        <div
                            v-if="
                                storeDetails.topup &&
                                storeDetails.topup.length == 0
                            "
                            class="py-1 font-16 font-weight-bold"
                        >
                            No Topup Purchased Yet
                        </div>
                    </div>
                    <div class="theme-section px-3 py-3">
                        <div class="d-flex">
                            <div class="open-sans-bold">Standard Theme</div>
                            <div class="open-sans-semi-bold pl-5">
                                Skyline Theme
                            </div>
                            <div class="silver pl-5">Skyline 2 Theme</div>
                        </div>
                    </div>
                </div>
            </b-card>
            <!-- store plan section end -->
            <!-- store-details section start -->
            <b-card class="mt-3">
                <div class="store-detail-section">
                    <div class="border-bottom px-3 py-2">
                        <div class="store-title">DETAILS</div>
                    </div>
                    <div
                        v-if="storeDetails.store.location"
                        class="
                            registered-address-section
                            border-bottom
                            px-3
                            py-3
                        "
                    >
                        <div class="open-sans-bold font-14">
                            REGISTERED ADDRESS
                        </div>
                        <div>{{ storeDetails.store.address }}</div>
                        <div
                            v-if="
                                storeDetails.store.openingTime &&
                                storeDetails.store.closingTime
                            "
                            class="registered-address-section pt-2"
                        >
                            <span class="open-sans-bold font-14"> TIME: </span>
                            {{ openingTime.hh }}:{{ openingTime.mm }}
                            {{ openingTime.A }} to {{ closingTime.hh }}:{{
                                closingTime.mm
                            }}
                            {{ closingTime.A }}
                        </div>
                        <div class="d-flex open-sans-semi-bold pt-1">
                            <div>
                                <span
                                    class="
                                        open-sans-bold
                                        font-14
                                        text-uppercase
                                    "
                                >
                                    Latitude:
                                </span>

                                <span>
                                    {{
                                        storeDetails.store.location
                                            .coordinates[1]
                                    }}
                                </span>
                            </div>
                            <div class="pl-3">
                                <span
                                    class="
                                        open-sans-bold
                                        font-14
                                        text-uppercase
                                    "
                                >
                                    Longitude:
                                </span>

                                <span>
                                    {{
                                        storeDetails.store.location
                                            .coordinates[0]
                                    }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="contact-section px-3 py-3 open-sans-semi-bold">
                        <div class="open-sans-bold font-14">CONTACT</div>
                        <div class="contact-info">
                            <div>
                                <span class="open-sans-bold">Emails:</span>
                                <span>{{ storeDetails.store.email }}</span>
                            </div>
                            <div>
                                <span class="open-sans-bold"
                                    >Contact Number:</span
                                >
                                <span>
                                    {{ storeDetails.store.contactNumber }}
                                </span>
                            </div>
                            <div>
                                <span class="open-sans-bold"
                                    >Contact Person:</span
                                >
                                <span>
                                    {{ storeDetails.store.contactPerson }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </b-card>
            <!-- store details section end -->
            <!-- store-images section start -->
            <b-card v-if="multipleImages.length > 0" class="mt-3">
                <div class="store-detail-section">
                    <div class="border-bottom px-3 py-2">
                        <div class="store-title">IMAGES</div>
                    </div>
                    <div class="px-3 py-2">
                        <div
                            v-for="(image, index) in multipleImages"
                            :key="index"
                            class="
                                row
                                justify-content-center
                                align-items-center
                            "
                        >
                            <div
                                v-for="(image1, key) in image"
                                :key="key"
                                class="col-md-6 mb-3"
                            >
                                <img
                                    :src="image1 | imageRender('store-152.png')"
                                    :alt="storeDetails.name"
                                    class="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </b-card>
            <!-- store images section end -->
        </div>
        <!-- store profile section end -->
        <!-- Loader start  -->
        <div v-if="loader" class="text-center">
            <loader />
        </div>
        <!-- loader end  -->
    </div>
</template>
<script>
import moment from 'moment'
import _ from 'lodash'
import storeImg from '~/assets/img/dynamic/store.png'
import service from '@/service/apiService'
import global from '@/service/global.js'
import listView from '@/components/modal/topup-list'
import loader from '~/components/loader.vue'

export default {
    middleware: ['authenticationGuard'],
    components: {
        listView,
        loader,
    },
    data() {
        return {
            noStores: false,
            stores: [],
            multipleImages: [],
            openingTime: {
                hh: '',
                mm: '',
                A: '',
            },
            closingTime: {
                hh: '',
                mm: '',
                A: '',
            },
            formData: {
                id: global.getStore(),
            },
            title: 'my store',
            img: storeImg,
            loader: true,

            showRedNotification: false,
            showExpired: false,
            showGreenNotification: true,
            storeDetails: {
                store: {
                    _id: '1234',
                    title: '',
                    name: '',
                    category: '',
                    subCategory: '',
                    gstNumber: '',
                    address: '',
                    email: '',
                    contactNumber: '',
                    contactPerson: '',
                    packageExpiry: '',
                    location: {
                        type: '',
                        coordinates: ['', ''],
                    },
                    package: {
                        name: '',
                        noOfOffers: '',
                        noOfDeals: '',
                        noOfNotifications: '',
                    },
                    logo: '',
                    openingTime: {},
                    closingTime: {},
                    images: '',
                    multipleImages: [],
                },
                topup: undefined,
                followers: '',
                pendingOffers: '',
                pendingDeals: '',
                pendingPackageNotification: '',
            },
            createPlan: false,
            myPlan: false,
            updateplans: false,
        }
    },

    created() {
        this.getOneStore(this.formData)
    },
    methods: {
        getOneStore() {
            const accessToken = global.getUser()
            service.getOneStore(this.formData, accessToken, (data) => {
                this.loader = false
                if (data.data.store.package) {
                    this.myPlan = true
                } else {
                    this.createPlan = true
                }
                if (data.data.store) {
                    this.storeDetails = data.data
                    if (this.storeDetails.store.multipleImages.length >= 1) {
                        this.multipleImages = _.chunk(
                            this.storeDetails.store.multipleImages,
                            2,
                        )
                    }
                    // console.log('this.storeDetails', this.storeDetails.store)
                    if (
                        this.storeDetails.store.openingTime &&
                        this.storeDetails.store.closingTime
                    ) {
                        this.openingTime = this.storeDetails.store.openingTime
                        this.closingTime = this.storeDetails.store.closingTime
                    }

                    if (data.data.store) {
                        const newDate = this.storeDetails.store.packageExpiry
                        const packageExpiryDate =
                            moment(newDate).format('YYYY-MM-DD')
                        const now = moment()
                        const currentDate = now.format('YYYY-MM-DD')
                        const daysDiff = moment(packageExpiryDate).diff(
                            currentDate,
                            'days',
                        )
                        if (
                            packageExpiryDate &&
                            packageExpiryDate < currentDate
                        ) {
                            this.showExpired = true
                            this.updateplans = true
                            this.showGreenNotification = false
                        } else if (daysDiff <= 30) {
                            this.showRedNotification = true
                            this.showGreenNotification = false
                        } else {
                            this.showGreenNotification = true
                        }
                        this.storeDetails.store.packageExpiry =
                            moment(newDate).format('DD MMMM, YYYY ')
                    }
                }
            })
        },
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
@media only screen and (min-width: 768px) {
    .contact-section {
        .contact-info {
            display: flex !important;
            justify-content: space-between;
        }
    }
}
.contact-section {
    .contact-info {
        display: inline-block;
    }
}
.profile-section {
    .store-profile-content {
        .card-body {
            padding: 0px;
            .store-plan-section {
                .store-photo-section {
                    .store-image-section {
                        width: 10%;
                        .store-image {
                            border: 6px solid $light-grey;
                            border-radius: 20px;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .edit-section {
                        .edit {
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }
                .my-plan-section {
                    .update-plan-btn {
                        a {
                            color: $white;
                            &:hover {
                                color: $white;
                                text-decoration: none;
                            }
                        }
                        .btn-secondary {
                            &:hover,
                            &:focus {
                                color: $white;
                                background-color: $navy-blue;
                                border-color: $navy-blue;
                            }
                        }
                        .btn-link a {
                            color: $navy-blue;
                            &:hover {
                                color: $navy-blue;
                                text-decoration: underline;
                            }
                        }
                    }
                }
                .main-pending-section {
                    display: flex;
                    .pending-section {
                        .pending {
                            background: $light-grey;
                            height: 100%;
                            .pending-msg {
                                position: relative;
                                top: 8px;
                                left: 8px;
                            }
                        }
                        .top-up-btn {
                            a {
                                color: $white;
                                &:hover {
                                    color: $white;
                                    text-decoration: none;
                                }
                            }
                            .btn-secondary {
                                &:hover,
                                &:focus {
                                    color: $white;
                                    background-color: $navy-blue;
                                    border-color: $navy-blue;
                                }
                            }
                        }
                    }
                }
            }
            .store-detail-section {
                .store-title {
                    color: $navy-blue;
                    font-size: $font-18;
                    font-family: $open-sans-bold;
                }
            }
            a {
                color: inherit;
                &:hover {
                    color: inherit;
                    text-decoration: none;
                }
            }
        }
    }
}
</style>
