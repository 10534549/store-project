<template>
    <div class="geofence-section main-content">
        <!-- title section start -->
        <div class="title-section pl-4 p-2 border-bottom">
            <div class="d-flex justify-content-between">
                <div class="title text-uppercase">{{ title }}</div>
                <!-- <div class="search-filter">
                    <div class="text-capitalize">search by filter</div>
                </div> -->
            </div>
        </div>
        <!-- title section end -->
        <div class="geofence-content p-3 font-12">
            <!-- geofence section start -->
            <div
                v-for="oneGeofence in geofence"
                :key="oneGeofence.key"
                class="mb-2"
            >
                <b-list-group v-if="oneGeofence.offer">
                    <b-list-group-item>
                        <!-- <div class="d-flex justify-content-between">
                            <div class="d-flex">
                                <div class="offer-image-section">
                                    <b-img
                                        :src="offer.img"
                                        class="offer-image"
                                        alt="offer-image"
                                    />
                                </div>
                                <div
                                    class="offer-details pl-2 open-sans-semi-bold"
                                >
                                    <div class="offer-cashback">
                                        <div>{{ offer.cashback }}</div>
                                    </div>
                                    <div class="offer-date font-10">
                                        {{ offer.date }}
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="open-sans-semi-bold silver">
                                    <font-awesome-icon
                                        :icon="['fas', 'rupee-sign']"
                                    />
                                    <del>{{ offer.discount }}</del>
                                </div>
                                <div class="open-sans-semi-bold pl-2">
                                    <font-awesome-icon
                                        :icon="['fas', 'rupee-sign']"
                                    />
                                    {{ offer.price }}
                                </div>
                            </div>
                            <div class="offer-notification">
                                {{ offer.notification }}
                            </div>
                            <div class="goefence-view-section">
                                <div
                                    class="view-section pointer"
                                    @click="$bvModal.show('geofence-modal')"
                                >
                                    View
                                </div>
                            </div>
                        </div> -->
                        <b-row align-v="center">
                            <b-col class="w-25 d-flex justify-content-center">
                                <div class="offer-image-section">
                                    <b-img
                                        v-if="oneGeofence.offer"
                                        :src="
                                            oneGeofence.offer.image
                                                | imageRender(
                                                    'offer-350.png',
                                                    'deal-350.png',
                                                    oneGeofence.offer.type,
                                                )
                                        "
                                        class="offer-image"
                                        alt="offer-image"
                                    />
                                </div>
                            </b-col>
                            <b-col class="w-25">
                                <div
                                    class="
                                        offer-details
                                        pl-2
                                        open-sans-semi-bold
                                    "
                                >
                                    <div
                                        v-if="oneGeofence.offer"
                                        class="offer-cashback"
                                    >
                                        <div>{{ oneGeofence.offer.title }}</div>
                                    </div>
                                    <div
                                        v-if="oneGeofence._id"
                                        class="offer-date font-10"
                                    >
                                        {{
                                            oneGeofence._id.createdAt
                                                | moment(
                                                    'Do MMMM , YYYY - HH:mm',
                                                )
                                        }}
                                    </div>
                                </div>
                            </b-col>
                            <b-col v-if="oneGeofence.offer" class="w-25">
                                <div
                                    v-if="
                                        oneGeofence.offer.type == 'deal' &&
                                        oneGeofence.offer.price
                                    "
                                >
                                    <span class="open-sans-semi-bold silver">
                                        <font-awesome-icon
                                            :icon="['fas', 'rupee-sign']"
                                        />
                                        <del>{{ oneGeofence.offer.mrp }}</del>
                                    </span>
                                    <span class="open-sans-semi-bold pl-2">
                                        <font-awesome-icon
                                            :icon="['fas', 'rupee-sign']"
                                        />
                                        {{ oneGeofence.offer.price }}
                                    </span>
                                </div>
                                <div
                                    v-if="
                                        oneGeofence.offer.type == 'deal' &&
                                        oneGeofence.offer.percentage
                                    "
                                >
                                    <span class="open-sans-semi-bold">
                                        {{ oneGeofence.offer.percentage }}% Off
                                        on Rs.{{ oneGeofence.offer.mrp }}
                                    </span>
                                </div>
                                <div
                                    v-if="
                                        oneGeofence.offer.type == 'deal' &&
                                        !oneGeofence.offer.percentage &&
                                        !oneGeofence.offer.price
                                    "
                                    class="text-center"
                                >
                                    <span class="open-sans-semi-bold">
                                        Rs. {{ oneGeofence.offer.mrp }}
                                    </span>
                                </div>
                                <div
                                    v-if="oneGeofence.offer.type == 'offer'"
                                    class="text-center"
                                >
                                    -
                                </div>
                            </b-col>
                            <b-col class="w-25">
                                <div class="offer-notification">
                                    {{ oneGeofence.count }} Customer Received
                                    Notification
                                </div>
                            </b-col>
                            <!-- <b-col md="1">
                                <div class="goefence-view-section">
                                    <div
                                        class="view-section pointer"
                                        @click="$bvModal.show('geofence-modal')"
                                    >
                                        View
                                    </div>
                                </div>
                            </b-col> -->
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
            </div>
            <!-- geofence section end -->
        </div>
        <div>
            <!-- geofence-details modal component start -->
            <geofenceDetails></geofenceDetails>
            <!-- geofence-details modal component end -->
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
            No Geofence History
        </div>
        <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
            <div slot="no-more"></div>
        </infinite-loading>
    </div>
</template>
<script>
import geofenceDetails from '~/components/modal/geofence-details.vue'
import service from '@/service/apiService'
import loader from '~/components/loader.vue'

export default {
    middleware: 'authenticationGuard',

    components: {
        loader,
        geofenceDetails,
    },
    data() {
        return {
            page: 1,
            title: 'geofence history',
            formData: {},
            geofence: [],
            noResultFound: false,
            loader: true,
        }
    },
    methods: {
        infiniteHandler($state) {
            this.formData.page = this.page
            service.getGeofenceHistory(this.formData, (data) => {
                this.loader = false
                if (this.formData.page === 1 && !data) {
                    this.noResultFound = true
                    $state.complete()
                }
                if (data.getAllNotification) {
                    this.page += 1
                    data.getAllNotification.forEach((o) => {
                        this.geofence.push(o)
                    })
                    $state.loaded()
                } else {
                    $state.complete()
                }
            })
        },
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.geofence-section {
    .geofence-content {
        .offer-image-section {
            width: 75px;
            height: 60px;
            .offer-image {
                width: 100%;
                height: 100%;
            }
        }
        .offer-details {
            .offer-date {
                color: darken($light-grey, 50%);
            }
        }
        .offer-notification {
            color: darken($light-grey, 50%);
        }
        .goefence-view-section {
            .view-section {
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
.w-25 {
    width: 25%;
}
</style>
