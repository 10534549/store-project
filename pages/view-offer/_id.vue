<template>
    <div class="profile-section main-content padd-top-80">
        <!-- title section start -->
        <div class="title-section pl-4 p-2 border-bottom">
            <div class="title text-uppercase">View {{ detail.type }}</div>
        </div>
        <!-- title section end -->
        <!-- store profile section start -->
        <div class="p-3 offer-subsection">
            <b-card>
                <!-- store plan section start -->
                <div class="offer-contain">
                    <div class="mt-4">
                        <b-row>
                            <b-col md="6">
                                <div
                                    v-if="sliderContent.length <= 0"
                                    class="offer-detail-img"
                                    :style="{
                                        'background-image':
                                            'url(' + defaultImg + ')',
                                    }"
                                ><img :src="detail.image" style="width: 100%;"/></div>
                                <!-- <client-only> -->
                                <productslider
                                    :productdetails="sliderContent"
                                ></productslider>
                                <!-- </client-only> -->
                            </b-col>
                            <b-col md="6">
                                <div class="main-content">
                                    <div class="contain-title">
                                        {{ detail.title }}
                                    </div>
                                    <div v-if="detail.store" class="">
                                        {{ detail.store.name }}
                                    </div>
                                    <div
                                        v-if="detail.store"
                                        class="affer-address"
                                    >
                                        {{ detail.store.address }}
                                    </div>
                                    <div v-if="detail.type == 'deal'" class="">
                                        <div v-if="detail.percentage">
                                            <span
                                                >{{ detail.percentage }}% Off on
                                                Rs.{{ detail.mrp }}
                                            </span>
                                        </div>
                                        <div v-else-if="detail.price">
                                            <del>Rs.{{ detail.mrp }}</del
                                            ><span class="ml-2"
                                                >Rs.{{ detail.price }}</span
                                            >
                                        </div>
                                        <div
                                            v-else-if="
                                                !detail.price &&
                                                !detail.percentage
                                            "
                                        >
                                            <span>Rs.{{ detail.mrp }}</span>
                                        </div>
                                        <div v-else></div>
                                    </div>
                                    <div class="">
                                        <font-awesome-icon
                                            :icon="['fas', 'info-circle']"
                                            class="mr-2"
                                        /><span class="text-capitalize"
                                            >{{ detail.type }}s Ends On
                                            <span class="ml-1">
                                                {{
                                                    detail.end
                                                        | moment(
                                                            'Do MMMM , YYYY ',
                                                        )
                                                }}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="offertab-section mt-4 pl-0">
                        <b-tabs fill>
                            <b-tab
                                v-if="detail.description"
                                title="Description"
                            >
                                <div
                                    class="p-3 font-16 open-sans-regular"
                                    v-html="detail.description"
                                ></div>
                            </b-tab>
                            <b-tab
                                v-if="detail.termsAndConditions"
                                title="Terms & Conditions"
                            >
                                <div
                                    class="p-3 font-16 open-sans-regular"
                                    v-html="detail.termsAndConditions"
                                ></div
                            ></b-tab>
                        </b-tabs>
                    </div>
                </div>
            </b-card>
        </div>
        <!-- store profile section end -->
        <!-- Loader start  -->
        <!-- loader end  -->
    </div>
</template>
<script>
import 'vue-multiselect/dist/vue-multiselect.min.css'
import productslider from '~/components/product-slider.vue'
import service from '@/service/apiService'
import filter from '@/plugins/filter'

export default {
    middleware: 'authenticationGuard',

    components: {
        productslider,
    },
    data() {
        return {
            title: 'view offer',
            image: [],
            detail: {},
            sliderContent: [],
            defaultImg: '',
        }
    },
    created() {
        this.getOneOffer()
    },
    methods: {
        /**
         * getting single offer by _id
         */
        getOneOffer() {
            service.getOneoffer(this.$route.params.id, (response) => {
                if (response.status === 200) {
                    this.detail = response.data
                    if (response.data.multipleImages) {
                        this.detail.multipleImages.forEach((o) => {
                            this.sliderContent.push(o)
                        })
                    } else {
                        this.defaultImg = filter.imageRender(
                            this.defaultImg,
                            'offer-550.png',
                            'deal-550.png',
                            this.detail.type,
                        )
                    }
                } else {
                    this.detail = {}
                }
            })
        },
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.offer-subsection {
    .offerbg-part {
        background: $light-grey;
        .offer-img {
            width: 200px;
            height: 200px;
            .offer {
                width: 100%;
                height: 100%;
            }
        }
        .first-section {
            .main-title {
                font-size: $font-28;
                font-family: $montserrat-bold;
            }
        }
        .second-section {
            .title-section {
                font-family: $montserrat-semi-bold;
                text-transform: capitalize;
                font-size: $font-18;
            }
        }
    }
    .offer-contain {
        .offer-detail-img {
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            // width: 520px;
            width: 95%;
            height: 250px;
            overflow: hidden;
        }
        .contain-title {
            font-size: $font-20;
            font-family: $montserrat-semi-bold;
        }
        .offeramount {
            font-size: $font-18;
        }
        .nav-tabs .nav-link.active,
        .nav-tabs .nav-item.show .nav-link {
            color: $black;
            background-color: $light-grey;
            border-color: $light-grey;
        }
        .offertab-section {
            .tabs {
                .nav-tabs {
                    .nav-item {
                        .nav-link {
                            text-transform: uppercase;
                            &.active,
                            &:hover {
                                background-color: $light-grey;
                                font-family: $montserrat-semi-bold;
                            }
                        }
                    }
                }
            }
            .tab-content {
                background-color: $light-grey;
                font-size: 1rem;
            }
            a {
                color: $black;
            }

            .nav-tabs .nav-link {
                border: none;
                font-size: $font-18;
            }
        }
    }
    .main-content {
        font-size: 1rem;
        line-height: 2rem;
        padding-left: 0;
        min-height: auto;
    }
    .tab-content-section {
        .tabactive {
            border-bottom: 5px solid $black;
        }
        .tab-title {
            font-size: 25px;
            cursor: pointer;
        }
    }
}
@media (min-width: 320px) and (max-width: 480px) {
    .offer-subsection {
        .offer-contain {
            .offer-detail-img {
                width: 100%;
            }
        }
    }
}
.v-application ul,
.v-application ol {
    padding-left: 0px;
}
</style>
