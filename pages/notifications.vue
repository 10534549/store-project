<template>
    <div class="notification-section main-content padd-top-80">
        <!-- title section start -->
        <div class="title-section pl-4 p-2 border-bottom">
            <div class="title text-uppercase">{{ title }}</div>
        </div>
        <!-- title section end -->
        <div class="notification-content overflow-mob p-3 font-12">
            <!-- notification section start -->
            <b-card>
                <div
                    v-for="notification in notifications"
                    :key="notification._id"
                    class="mb-2"
                >
                    <b-list-group>
                        <b-list-group-item>
                            <!-- <div
                            class="d-flex justify-content-between align-items-center"
                        >
                            <div class="font-32">
                                <font-awesome-icon
                                    :icon="['fas', 'exclamation-triangle']"
                                />
                            </div>
                            <div class="pl-4">{{ offer.notification }}</div>
                            <div class="notification-view-section pointer">
                                View
                            </div>
                        </div>-->
                            <!-- <b-row align-v="center">
                            <b-col md="1">
                                <div class="font-32">
                                    <font-awesome-icon
                                        :icon="['fas', 'exclamation-triangle']"
                                    />
                                </div>
                            </b-col>
                            <b-col md="10">
                                <div>{{ notification.content }}</div>
                            </b-col>
                            <b-col md="1">
                                <div class="notification-view-section pointer">
                                    View
                                </div>
                            </b-col>
                        </b-row>-->

                            <div class="notification-content-section">
                                <div
                                    class="
                                        d-flex
                                        justify-content-between
                                        align-items-center
                                    "
                                >
                                    <div
                                        class="
                                            w-33
                                            align-item-center
                                            d-flex
                                            justify-content-center
                                        "
                                    >
                                        <div class="shop-image-section">
                                            <b-img
                                                v-if="notification.offers"
                                                :src="
                                                    notification.offers.images
                                                        | imageRender(
                                                            'offer-350.png',
                                                            'deal-350.png',
                                                            notification.offers
                                                                .type,
                                                        )
                                                "
                                                img-alt="Shop Image"
                                                class="shop-image"
                                            />
                                            <b-img
                                                v-if="!notification.offers"
                                                :src="
                                                    notification.store.images
                                                        | imageRender(
                                                            'store-160.png',
                                                        )
                                                "
                                                img-alt="Shop Image"
                                                class="shop-image"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        v-if="notification.offers"
                                        class="offer-section w-33 text-center"
                                    >
                                        {{ notification.offers.title }}
                                    </div>
                                    <div
                                        v-if="!notification.offers"
                                        class="offer-section w-33 text-center"
                                    >
                                        {{ notification.content }}
                                    </div>
                                    <!-- <div
                                    v-if="notification.topup"
                                    class="offer-section"
                                >
                                    {{ notification.topup.text }}
                                </div>-->
                                    <div
                                        v-if="notification.store"
                                        class="
                                            shop-name-section
                                            w-33
                                            text-center
                                        "
                                    >
                                        {{ notification.store.name }}
                                    </div>
                                </div>
                            </div>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-card>
            <!-- notification section end -->
            <div
                v-if="noResultFound"
                class="text-center py-3 font-16 font-weight-bold"
            >
                No Results Found
            </div>
            <infinite-loading @infinite="infiniteHandler">
                <div slot="no-more"></div>
            </infinite-loading>
        </div>
        <!-- Loader start  -->
        <div v-if="loader" class="text-center">
            <loader />
        </div>
        <!-- loader end  -->
    </div>
</template>
<script>
import service from '@/service/apiService'
import loader from '~/components/loader.vue'

export default {
    middleware: 'authenticationGuard',

    components: {
        loader,
    },
    data() {
        return {
            title: 'notification',
            page: 1,
            formData: {},
            notifications: [],
            noResultFound: false,
            loader: true,
        }
    },
    methods: {
        infiniteHandler($state) {
            this.formData.page = this.page
            service.NotificationList(this.formData, (data) => {
                this.loader = false
                if (this.formData.page === 1 && data.status === 204) {
                    this.noResultFound = true
                    $state.complete()
                }
                if (data.data.getAllNotification) {
                    this.page += 1
                    data.data.getAllNotification.forEach((o) => {
                        this.notifications.push(o)
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
.notification-section {
    .notification-content {
        .notification-view-section {
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
.shop-image-section {
    max-width: 35%;
    height: 70px;
    overflow: hidden;
    .shop-image {
        width: 100%;
        height: 100%;
    }
}
.w-33 {
    width: 33%;
}
</style>
