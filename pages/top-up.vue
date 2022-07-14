<template>
    <div class="top-up-section main-content padd-top-80">
        <!-- title section start -->
        <div class="title-section pl-4 p-2 border-bottom">
            <div class="d-flex justify-content-between">
                <div class="title text-capitalize">{{ title }}</div>
            </div>
        </div>
        <!-- title section end -->
        <div
            v-if="!noResultFound"
            class="top-up-content overflow-mob p-3 font-12"
        >
            <!-- top-up section start -->
            <b-card>
                <div v-for="offer in topUp" :key="offer._id" class="mb-2">
                    <b-list-group>
                        <b-list-group-item>
                            <b-row align-v="center">
                                <b-col class="w-20 text-center">
                                    <div class="open-sans-bold">
                                        {{ offer.text }}
                                    </div>
                                </b-col>
                                <b-col class="w-20 text-center">
                                    <div
                                        v-if="offer.discountPrice"
                                        class="price-section"
                                    >
                                        <span
                                            >Rs{{
                                                discountedAmount(offer)
                                            }}</span
                                        >
                                        <del> Rs.{{ offer.amount }}.00 </del>
                                        <span
                                            >Flat Rs.{{
                                                offer.discountPrice
                                            }}
                                            Off</span
                                        >
                                    </div>

                                    <div
                                        v-else-if="offer.discountPercent"
                                        class="price-section"
                                    >
                                        <span
                                            >Rs{{
                                                discountedPrice(offer)
                                            }}</span
                                        >
                                        <del> Rs.{{ offer.amount }}.00 </del>
                                        <span
                                            >{{ offer.discountPercent }}%
                                            off</span
                                        >
                                    </div>
                                    <div v-else class="price-section">
                                        Rs.{{ offer.amount }}.00
                                    </div>
                                </b-col>
                                <b-col class="w-20 text-center">
                                    <div class="open-sans-bold">
                                        {{ offer.numberOfDays }} Days
                                    </div>
                                </b-col>
                                <b-col class="w-20 text-center">
                                    <div>
                                        {{ offer.numberOfNotifications }}
                                        Notifications
                                    </div>
                                </b-col>
                                <b-col class="w-20 text-center">
                                    <div class="buy-btn">
                                        <b-button
                                            class="
                                                btn-sm
                                                bg-navy-blue
                                                white--text
                                                px-4
                                                shadow-none
                                            "
                                            @click="onClickBuy(offer._id)"
                                            >Buy Pack</b-button
                                        >
                                    </div>
                                </b-col>
                            </b-row>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-card>
            <!-- top-up section end -->
        </div>

        <!-- Loader start  -->
        <div v-if="loader" class="text-center">
            <loader />
        </div>
        <!-- loader end  -->

        <div
            v-if="noResultFound"
            class="text-center py-3 font-16 font-weight-bold"
        >
            No Topup Available
        </div>
        <infinite-loading @infinite="infiniteHandler">
            <div slot="no-more"></div>
        </infinite-loading>
    </div>
</template>
<script>
import service from '@/service/apiService'
import global from '@/service/global'
import loader from '~/components/loader.vue'

export default {
    middleware: 'authenticationGuard',

    components: {
        loader,
    },
    data() {
        return {
            page: 1,
            formData: {},
            title: 'topup',
            topUp: [],
            noResultFound: false,
            loader: true,
        }
    },
    methods: {
        discountedAmount(product) {
            return product.amount - product.discountPrice
        },
        discountedPrice(product) {
            return (
                product.amount -
                (product.amount * product.discountPercent) / 100
            )
        },
        infiniteHandler($state) {
            this.formData.page = this.page
            service.getTopUpList(this.formData, (data) => {
                this.loader = false
                if (this.formData.page === 1 && data.status === 204) {
                    this.noResultFound = true
                    $state.complete()
                }
                if (data.data.getAllTopUp) {
                    this.page += 1
                    data.data.getAllTopUp.forEach((o) => {
                        this.topUp.push(o)
                    })
                    $state.loaded()
                } else {
                    $state.complete()
                }
            })
        },
        onClickBuy(id) {
            const accessToken = global.getUser()
            const obj = {
                store: global.getStore(),
                topUp: id,
            }
            service.topUpPurchase(obj, accessToken, (data) => {
                if (data.status === 200) {
                    this.$toaster.success('Successfully Top Up Purchased')
                    this.$router.go(-1)
                } else {
                    this.$toaster.error('something went worng')
                }
            })
        },
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.top-up-content {
    .buy-btn {
        .btn-secondary {
            &:focus,
            &:hover {
                color: $white;
                background-color: $navy-blue;
                border-color: $navy-blue;
            }
        }
    }
}
</style>
