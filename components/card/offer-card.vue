<template>
    <!-- my offers section start -->
    <!-- offers section start -->
    <div class="main2">
        <b-list-group>
            <b-list-group-item>
                <div
                    class="
                        d-flex
                        justify-content-center
                        align-item-center
                        text-center
                        open-sans-semi-bold
                    "
                >
                    <div class="w-16 align-content">
                        <div class="offer-image-section">
                            <b-img
                                :src="
                                    deal.image
                                        | imageRender(
                                            'offer-350.png',
                                            'deal-350.png',
                                            deal.type,
                                        )
                                "
                                class="offer-image"
                                alt="offer-image"
                            />
                        </div>
                    </div>

                    <div class="align-content w-16">
                        {{ deal.title }}
                    </div>
                    <div v-if="deal.category" class="w-16 align-content">
                        {{ deal.category.name }}
                    </div>
                    <div class="w-16 align-content">
                        <div>
                            {{ deal.end | moment('Do MMMM , YYYY ') }}                            
                        </div>
                        <!-- <div v-if="deal.expired" class="silver font-10">
                            Expired                            
                        </div> -->
                    </div>
                    <div class="w-16 align-content">
                        <div v-if="deal.expired">Expired</div>
                        <div v-if="deal.isVerify && !deal.expired">Approved</div>
                        <div v-if="!deal.isVerify">Pending</div>
                    </div>
                    <div
                        class="send-notification w-20"
                        :class="{ 'align-content': !deal.isVerify }"
                    >
                        <div :class="{ 'mb-3': deal.isVerify }">
                            <nuxt-link
                                class="btn btn-sm main2 btn-info white--text pointer"
                                :to="{
                                    name: 'view-offer-id',
                                    params: {
                                        id: deal._id,
                                    },
                                }"
                            >
                                <span>
                                    View
                                    <!-- <font-awesome-icon :icon="['fas', 'eye']" /> -->
                                </span>
                            </nuxt-link>
                            <nuxt-link
                                v-if="deal.type == 'offer' && !deal.isVerify"
                                
                                class="btn btn-sm main2 white--text btn-primary pointer"
                                :to="{
                                    name: 'update-offer-offerId',
                                    params: {
                                        offerId: deal._id,
                                    },
                                }"
                            >
                                <span>
                                    Edit
                                    <!-- <font-awesome-icon
                                        :icon="['fas', 'pencil-alt']"
                                    /> -->
                                </span>
                            </nuxt-link>

                            <!-- For Deal Page -->

                            <!-- <nuxt-link
                                v-if="deal.type == 'deal'"
                                class="btn btn-primary"
                                :to="{
                                    name: 'update-offer-viewId',
                                    params: {
                                        viewId: deal._id,
                                    },
                                }"
                            >
                                <span>
                                    <font-awesome-icon :icon="['fas', 'eye']" />
                                </span>
                            </nuxt-link> -->
                            <nuxt-link
                                v-if="deal.type == 'deal' && !deal.isVerify"
                                class="btn btn-sm main2 bg-orange pointer text--dark"
                                :to="{
                                    name: 'update-deal-dealId',
                                    params: {
                                        dealId: deal._id,
                                    },
                                }"
                            >
                                <span>
                                    <!-- <font-awesome-icon
                                        :icon="['fas', 'pencil-alt']"
                                    /> -->
                                    Edit
                                </span>
                            </nuxt-link>

                            <!-- End Deal Page -->
                            <!-- <b-button
                                class="btn"
                                v-b-modal="deal._id"
                                @click="deleteCategoryById(deal)"
                            >
                                <span>
                                    <font-awesome-icon
                                        :icon="['fas', 'trash-alt']"
                                    />
                                </span>
                            </b-button> -->
                            <!-- <deletemodal
                                :mymodal="categoryData"
                                v-on:conformModal="deleteSingleOffer"
                            ></deletemodal> -->
                        </div>
                        <b-button
                            v-if="deal.isVerify && !deal.expired"
                            class="btn-sm  main2 px-1 bg-orange shadow-none"
                            pill
                            @click="sendNotification()"
                            >Send Notification</b-button
                        >
                    </div>
                    <!-- <nuxt-link
                        :to="{
                            name: 'my-offerss-offerId',
                            params: {
                                offerId: deal._id,
                            },
                        }"
                    >
                        <b-button
                            class="btn-sm px-3 bg-orange shadow-none"
                            pill
                            >Edit</b-button
                        >
                    </nuxt-link>-->
                </div>
            </b-list-group-item>
        </b-list-group>
    </div>
    <!-- offers section end -->
    <!-- my offers section end -->
</template>
<script>
import service from '@/service/apiService'
// import deletemodal from '@/components/deletemodal.vue'
import global from '@/service/global.js'

export default {
    components: {
        // deletemodal,
    },
    props: {
        deal: {
            type: Object,
            default() {
                return undefined
            },
        },
        offermethod: {
            type: Function,
            default() {
                return () => true
            },
        },
    },

    data() {
        return {
            categoryData: '',
            geofenceCustomer: '500',
            customer: 'Customers in your geofence',
            formData: {
                store: global.getStore(),
                NotoficationContent: 'test notification',
            },
        }
    },

    methods: {
        // deleteCategoryById(category) {
        //     this.categoryData = category._id
        // },
        sendNotification() {
            // console.log("IN")
            this.formData.latitude = this.deal.location.coordinates[1]
            this.formData.longitude = this.deal.location.coordinates[0]
            this.formData.offer = this.deal._id
            this.formData.content = 'New Test msg'
            this.formData.type = this.deal.type
            service.sendNotification(this.formData, (data) => {
                if (data.status === 200) {
                    this.$toaster.success('Notification Sent Successfully.')
                } else if (data.status === 204) {
                    this.$toaster.error(
                        'No Pending Notification Available To Send',
                    )
                } else if (data.status === 201) {
                    this.$toaster.warning(
                        'No User Found In Geofence So Can Not Send Notification',
                    )
                } else {
                    this.$toaster.error('something went wrong')
                }
            })
        },
        // deleteSingleOffer(offerId) {
        //     service.deleteOffer(offerId, (data) => {
        //         if (data.status === 200) {
        //             this.offermethod('reset')
        //             this.$toaster.success('offer deleted successfully')
        //         } else {
        //             this.$toaster.error('something went wrong')
        //         }
        //     })
        // },
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.my-offers-content {
    .offer-image-section {
        width: 75px;
        height: 60px;
        .offer-image {
            width: 100%;
            height: 100%;
        }
    }
    .send-notification {
        .btn-secondary {
            &:hover,
            &:focus {
                color: $white;
                background-color: $orange;
                border-color: $orange;
            }
        }
    }
}
.align-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

@media screen and (max-width: 767px) {
    .main2 {
        font-size: 12px;
}
    
}

</style>
