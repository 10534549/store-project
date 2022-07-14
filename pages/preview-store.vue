<template>
    <div>
        <client-only>
            <div class="pt-5 store-subsection bg-white p-3">
                <nuxt-link to="/profile">
                    <div class="pb-3 back-button font-18">
                        <font-awesome-icon
                            :icon="['fas', 'chevron-left']"
                            class="ml-2 text-black"
                            :class="{
                                'text-danger': isActive,
                            }"
                        />
                        <span class="text-black">Back to Profile</span>
                    </div>
                </nuxt-link>
                <div v-if="storeDetail" class="storebg-part p-4">
                    <b-row>
                        <b-col md="2">
                            <!-- user for the image -->
                            <div
                                v-if="storeDetail.images"
                                class="store-image-section"
                                :style="{
                                    background:
                                        'url(' +
                                        storeDetail.images +
                                        ') no-repeat center center',
                                    'background-size': 'cover',
                                    height: '155px',
                                }"
                            ></div>
                            <div
                                v-if="!storeDetail.images"
                                class="store-image-section"
                            >
                                <b-img
                                    :src="image | imageRender('store-160.png')"
                                    img-alt="Card image"
                                    class="store-image"
                                />
                            </div>
                        </b-col>
                        <b-col md="10">
                            <!-- this is use for title and button -->
                            <div class="first-section">
                                <b-row>
                                    <b-col md="6">
                                        <div class="main-title">
                                            {{ storeDetail.name }}
                                        </div>
                                        <div
                                            v-if="storeDetail.email"
                                            class="font-weight-bold"
                                        >
                                            {{ storeDetail.email }}
                                            <span
                                                v-if="storeDetail.contactNumber"
                                                class="pl-3"
                                            >
                                                {{ storeDetail.contactNumber }}
                                            </span>
                                        </div>
                                        <div
                                            v-if="storeDetail.category"
                                            class="category font-weight-bold"
                                        >
                                            {{ storeDetail.category.name }}
                                        </div>
                                    </b-col>
                                    <b-col md="6">
                                        <div
                                            class="d-flex direction-btn-section"
                                        >
                                            <b-button
                                                size="sm"
                                                class="
                                                    direction-btn
                                                    mr-2
                                                    shadow-none
                                                    bg-navy-blue
                                                    white--text
                                                "
                                                target="_blank"
                                                @click="openMap(storeDetail)"
                                                >Direction</b-button
                                            >
                                            <b-button
                                                size="sm"
                                                class="
                                                    direction-btn
                                                    shadow-none
                                                    bg-navy-blue
                                                    white--text
                                                "
                                                >Favourite
                                                <font-awesome-icon
                                                    :icon="['fas', 'heart']"
                                                    class="ml-2"
                                                    :class="{
                                                        'text-danger': isActive,
                                                    }"
                                                />
                                            </b-button>
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                            <!-- this is use for the followers,offers/deals and address -->
                            <div class="second-section">
                                <b-row
                                    ><b-col v-if="followers != 0" md="4">
                                        <div class="title-section">
                                            Marked As Favourite
                                        </div>
                                        <div class="store-followers pt-1">
                                            {{ followers }}
                                        </div>
                                    </b-col>
                                    <b-col
                                        v-if="offerCount != 0 || dealCount != 0"
                                        md="3"
                                    >
                                        <div class="title-section">
                                            offers/Deals
                                        </div>
                                        <div class="store-followers pt-1">
                                            {{ offerCount }}/{{ dealCount }}
                                        </div>
                                    </b-col>
                                    <b-col v-if="storeDetail.address" md="5">
                                        <div class="title-section">address</div>
                                        <div class="store-followers pt-1">
                                            {{ storeDetail.address }}
                                        </div>
                                        <div
                                            v-if="openingTime.hh != ''"
                                            class="mt-1"
                                        >
                                            <span class="title-section"
                                                >Time -
                                            </span>
                                            {{ openingTime.hh }}:{{
                                                openingTime.mm
                                            }}
                                            {{ openingTime.A }} to
                                            {{ closingTime.hh }}:{{
                                                closingTime.mm
                                            }}
                                            {{ closingTime.A }}
                                        </div></b-col
                                    >

                                    <b-col v-if="followers == 0" md="4">
                                    </b-col>
                                    <b-col
                                        v-if="offerCount == 0 && dealCount == 0"
                                        md="3"
                                    >
                                    </b-col>
                                </b-row>
                            </div>
                        </b-col>
                    </b-row>
                </div>
                <div v-if="storeDetail" class="store-slider p-4">
                    <slidercard :storedetails="newSliderContent"></slidercard>
                </div>
                <div v-if="storeDetail" class="offer-content-section pt-4">
                    <!-- custom tab -->
                    <div class="d-flex">
                        <div
                            v-for="item in items"
                            :key="item.index"
                            class="px-2 active tab-title"
                        >
                            <div
                                v-if="item.name === 'Offers and Deals'"
                                class="font-weight-bold"
                            >
                                {{ item.name }}
                                <!-- <span v-show="offers.length">
                                [{{ item.totalCount }}]</span -->
                                <!-- > -->
                            </div>
                        </div>
                    </div>
                    <div class="mt-2">
                        <div>
                            <b-row v-if="!noResultFound">
                                <b-col
                                    v-for="offer in offers"
                                    :key="offer._id"
                                    md="4"
                                >
                                    <offercard
                                        :offersection="offer"
                                        :offerimage="
                                            offer.image
                                                | imageRender(
                                                    'offer-350.png',
                                                    'deal-350.png',
                                                    offer.type,
                                                )
                                        "
                                    ></offercard>
                                </b-col>
                            </b-row>
                        </div>
                        <!-- <span v-if="noResultFound"> No Results Found</span> -->
                        <div
                            v-if="noResultFound"
                            class="text-center py-3 font-16 font-weight-bold"
                        >
                            No Offers and Deals
                        </div>
                        <div
                            v-if="offers == undefined && !noResultFound"
                            class="text-center py-3 font-16 font-weight-bold"
                        >
                            Loading ...
                        </div>
                        <div
                            v-if="
                                noOffersDeals &&
                                offers != undefined &&
                                offers.length > 0
                            "
                            class="text-center py-3 font-14 font-weight-bold"
                        >
                            Login to see more offers and deals
                        </div>
                    </div>
                    <infinite-loading
                        v-if="scrollOrNot"
                        @infinite="infiniteHandler"
                    >
                        <div slot="no-more"></div>
                    </infinite-loading>
                </div>
            </div>
        </client-only>
        <!-- Loader start  -->
        <div v-if="loader" class="text-center">
            <loader />
        </div>
        <!-- loader end  -->
    </div>
</template>
<script>
import service from '@/service/apiService'
import offercard from '~/components/card/offer-list-card.vue'
import slidercard from '~/components/card/slider-card.vue'
import global from '@/service/global'
import loader from '~/components/loader.vue'
export default {
    middleware: 'authenticationGuard',

    layout: 'login',
    components: {
        offercard,
        slidercard,
        loader,
    },
    data() {
        return {
            items: [{ key: 1, name: 'Offers and Deals', totalCounts: '' }],
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
            offerpage: 1,
            isActive: false,
            page: 1,
            formData: {},
            currentTab: 0,
            // offers array
            offers: undefined,
            // deals: [],
            // storebg part
            storeDetail: {},
            noOffersDeals: false,
            followers: '',
            offerCount: '',
            dealCount: '',
            noResultFound: false,
            scrollOrNot: false,
            image: '',
            newSliderContent: [],
            loader: true,
        }
    },
    mounted() {
        this.scrollOrNot = true
        this.getOneStore()
    },
    methods: {
        getOneStore() {
            service.getOneStoreInfo(global.getStore(), (data) => {
                if (data) {
                    this.storeDetail = data.store
                    const newData = this.storeDetail.multipleImages

                    for (let i = 0; i < newData.length; i += 1) {
                        const obj = {}
                        obj.multipleImages = [newData[i]]

                        obj.name = data.store.name
                        // obj._id = data.store._id

                        this.newSliderContent.push(obj)
                    }
                    this.offerCount = data.totalOffers
                    this.dealCount = data.totalDeals
                    this.followers = data.followers
                    this.loader = false
                }
            })
        },
        infiniteHandler($state) {
            this.formData.store = global.getStore()
            this.formData.page = this.offerpage
            const filterObj = {}
            this.formData.filter = filterObj
            service.getAllHomeOffers(this.formData, (data) => {
                if (this.offerpage === 1 && data.status === 204) {
                    this.noResultFound = true
                    this.offers = undefined
                    $state.complete()
                }
                if (data.data.getAllOffer) {
                    this.offerpage += 1
                    if (this.offers === undefined) {
                        this.offers = []
                    }
                    data.data.getAllOffer.forEach((o) => {
                        this.offers.push(o)
                    })
                    this.noResultFound = false
                    $state.loaded()
                } else {
                    $state.complete()
                }
            })
        },
        makeFavourite() {},
        openMap(store) {
            if (store.location && store.location.coordinates.length > 0) {
                const mapUrl =
                    'https://maps.google.com/?q=' +
                    store.location.coordinates[1] +
                    ',' +
                    store.location.coordinates[0]
                window.open(mapUrl, '_blank')
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/variables';
.container {
    max-width: 100%;
    margin: 0;
    padding: 0;
}
.store-subsection {
    .back-button {
        color: $black;
    }
    a:hover {
        text-decoration: none;
    }

    .storebg-part {
        background: $white;
        box-shadow: 5px 4px 12px #ddd;
        .store-image-section {
            // width: 80%;
            // height: 100%;
            .store-image {
                width: 100%;
                height: 100%;
            }
        }

        .first-section {
            .main-title {
                font-size: $font-28;
                font-family: $montserrat-bold;
            }
            .direction-btn-section {
                .btn-secondary {
                    text-transform: uppercase;
                    border-radius: 10px;
                    width: 100%;
                    padding: 10px;
                    &:hover,
                    &:focus {
                        background: $navy-blue;
                    }
                }
            }
            .btn-primary {
                background-color: $navy-blue;
            }
        }
        .second-section {
            padding-top: 1rem;
            .title-section {
                font-family: $montserrat-semi-bold;
                text-transform: capitalize;
                font-size: $font-18;
            }
        }
    }
    .offer-content-section {
        .active {
            border-bottom: 5px solid $black;
        }
        .tab-title {
            font-size: $font-26;
            cursor: pointer;
        }
    }
}
@media (min-width: 320px) and (max-width: 480px) {
    .store-subsection {
        .storebg-part {
            .store-image-section {
                width: 100%;
                text-align: center;
                .store-image {
                    width: 50%;
                    // height: 100%;
                }
            }
            .second-section {
                padding-top: 1rem;
            }
        }
    }
}
@media (min-width: 768px) and (max-width: 1024px) {
    .store-subsection {
        .storebg-part {
            .first-section {
                .direction-btn-section {
                    .btn-secondary {
                        font-size: $font-10;
                    }
                }
            }
            .second-section {
                // padding-top: 3rem;
                .title-section {
                    // font-family: $montserrat-semi-bold;
                    // text-transform: capitalize;
                    font-size: $font-12;
                }
            }
        }
    }
}
</style>
