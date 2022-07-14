<template>
    <div class="offer-card  mt-4">
        <div class="card">
            <div class="tags">
                <div v-if="offersection.type == 'offer'" class="offer-tag">
                    <img
                        src="@/assets/img/static/offer-tag.png"
                        alt="offer"
                        width="80px"
                        height="30px"
                    />
                </div>
                <div v-if="offersection.type == 'deal'" class="deal-tag">
                    <img
                        src="@/assets/img/static/deal-tag.png"
                        alt="offer"
                        width="85px"
                        height="30px"
                    />
                </div>
            </div>
            <div
                class="offer-image-section"
                :style="{
                    'background-image': 'url(' + offerimage + ')',
                }"
            ></div>

            <div class="card-img-overlay">
                <div class="card-text p-2">
                    <div class="title-text mb-1">
                        {{ offersection.title | truncate(35, '...') }}
                    </div>
                    <div class="offerdate mb-1">
                        {{ offersection.store.name }}
                    </div>
                    <div
                        class="d-flex justify-content-between align-items-center"
                    >
                        <div class="offerdate">
                            <span
                                v-if="offersection.type == 'offer'"
                                class="mr-1"
                                >Offer ends on</span
                            >
                            <span
                                v-if="offersection.type == 'deal'"
                                class="mr-1"
                                >Deal ends on</span
                            >
                            {{ offersection.end | moment('Do MMMM , YYYY ') }}
                        </div>
                        <div v-if="offersection.dist">
                            <span
                                ><font-awesome-icon
                                    :icon="['fas', 'map-marker-alt']"
                            /></span>
                            {{ offersection.dist | roundDigit }}
                            k.m
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        offersection: {
            type: Object,
            default() {
                return undefined // The default value you want to set.
            },
        },
        offerimage: {
            type: String,
            default() {
                return ''
            },
        },
    },
}
</script>
<style lang="scss">
@import '~/assets/scss/variables';
.offer-card {
    .card {
        position: relative;
        border-radius: 0;
        .offer-image-section {
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 200px;
            overflow: hidden;
        }
        .card-img-overlay {
            top: auto;
            padding: 0;
            .card-text {
                background: $black;
                opacity: 0.8;
                color: $white;
                .title-text {
                    font-size: $font-14;
                    font-family: $montserrat-semi-bold;
                }
                .offerdate {
                    font-size: $font-14;
                }
            }
        }
        .tags {
            .offer-tag {
                position: absolute;
                right: 0px;
                top: -2px;
            }
            .deal-tag {
                position: absolute;
                right: 0px;
                top: -2px;
            }
        }
    }
}
.offer-card {
    transition: transform 0.2s;
}

.offer-card:hover {
    -ms-transform: scale(1.05); /* IE 9 */
    -webkit-transform: scale(1.05); /* Safari 3-8 */
    transform: scale(1.05);
}
</style>
