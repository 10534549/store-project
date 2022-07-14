<template>
    <div class="geofence-details-section">
        <b-modal id="geofence-modal" ref="modal" hide-footer hide-header>
            <b-form
                ref="form"
                name="geofence"
                @submit.stop.prevent="handleSubmit"
            >
                <div class="geofence-content open-sans-semi-bold pt-2">
                    <div class="geofence-offer d-flex pb-3">
                        <div class="offer-title">
                            <div class="offer">
                                {{ offerTitle }}
                            </div>
                            <div class="date font-12 pt-2">{{ date }}</div>
                        </div>
                        <div class="geofence-image-section">
                            <b-img
                                :src="img"
                                class="geofence-image"
                                alt="offer-image"
                            />
                        </div>
                    </div>

                    <div class="message-section mb-4">
                        <b-list-group>
                            <b-list-group-item>
                                <div class="d-flex justify-content-between">
                                    <div class="text-capitalize">
                                        message send
                                    </div>
                                    <div class="light-green">
                                        {{ messageSend }}
                                    </div>
                                </div>
                            </b-list-group-item>
                            <b-list-group-item>
                                <div class="d-flex justify-content-between">
                                    <div class="text-capitalize">
                                        message view
                                    </div>
                                    <div class="gold">{{ messageView }}</div>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                    </div>

                    <b-row class="justify-content-center pt-3 py-2 border-top">
                        <div class="cancel-btn">
                            <b-button
                                type="button"
                                class="btn bg-red  px-4"
                                @click="$bvModal.hide('geofence-modal')"
                            >
                                Cancel
                            </b-button>
                        </div>
                    </b-row>
                </div>
            </b-form>
        </b-modal>
    </div>
</template>
<script>
import geofenceImg from '~/assets/img/dynamic/offer2.jpg'
export default {
    data() {
        return {
            img: geofenceImg,
            offerTitle: '215 OFREE COMBO [Dal Makhani Rice + SWIG Green Apple]',
            date: 'Message send on 25th, Jan 2020',
            messageSend: '63 people',
            messageView: '46 people',
        }
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.geofence-content {
    .geofence-offer {
        .offer-title {
            .offer {
                color: $navy-blue;
                font-size: $font-18;
                font-family: $open-sans-bold;
                line-height: 1.2;
            }
        }
        .geofence-image-section {
            width: 80px;
            height: 50px;
            .geofence-image {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
