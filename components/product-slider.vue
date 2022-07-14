<template>
    <div>
        <div v-if="productdetails.length > 0" class="slider-main-content">
            <div class="swiper-single">
                <swiper
                    ref="swiperTop"
                    class="swiper gallery-top"
                    :options="swiperOptionTop"
                >
                    <swiper-slide
                        v-for="(prodImg, index) in productdetails"
                        :key="prodImg._id"
                    >
                        <div class="swiper-image-section">
                            <b-img
                                fluid
                                :src="prodImg"
                                :alt="'Image' + index"
                                class="img-single"
                            ></b-img>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="slider-img-thumbnail">
                <swiper
                    ref="swiperThumbs"
                    class="swiper gallery-thumbs"
                    :options="swiperOptionThumbs"
                >
                    <swiper-slide
                        v-for="(prodImg, index) in productdetails"
                        :key="prodImg._id"
                        class="slide-all text-white"
                    >
                        <b-img
                            center
                            fluid
                            :src="prodImg"
                            :alt="'Image' + index"
                        ></b-img>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
import productImg from '~/assets/img/static/product-570.png'

export default {
    props: {
        productdetails: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            swiperOptionTop: {
                spaceBetween: 10,
                slidesPerView: 1,
                loop: true,
                loopedSlides: this.productdetails.length + 3,
                breakpoints: {
                    320: {
                        spaceBetween: 10,
                        loopedSlides: this.productdetails.length + 3,
                    },
                    640: {
                        spaceBetween: 10,
                        loopedSlides: this.productdetails.length + 3,
                    },
                    768: {
                        spaceBetween: 10,
                        loopedSlides: this.productdetails.length + 3,
                    },
                },
            },

            swiperOptionThumbs: {
                spaceBetween: 10,
                loop: true,
                slidesPerView: 4,
                touchRatio: 0.2,
                loopedSlides: this.productdetails.length + 3,
                slideToClickedSlide: true,
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                        loopedSlides: this.productdetails.length + 3,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                        loopedSlides: this.productdetails.length + 3,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                        loopedSlides: this.productdetails.length + 3,
                    },
                },
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // },
            },
            defaultImg: productImg,
        }
    },

    mounted() {
        setTimeout(() => {
            if (this.productdetails.length > 0) {
                const swiperTop = this.$refs.swiperTop.$swiper
                const swiperThumbs = this.$refs.swiperThumbs.$swiper
                swiperTop.controller.control = swiperThumbs
                swiperThumbs.controller.control = swiperTop
            }
        }, 1500)
    },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/variables';

.swiper-single {
    max-height: 400px;
    width: 100%;
    overflow: hidden;

    .img-single {
        max-height: 400px;
        margin: auto;
        display: flex;
    }
}

.img-fluid {
    height: 100% !important;
}

.slide-all {
    box-shadow: 0 0 10px 0px;
    transition: all ease 300ms;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
    }
}

.thumbnail {
    position: relative;
}

.gallery-thumbs {
    height: 125px;
    padding: 7px 1px;

    .swiper-slide {
        border: 1px solid #ccc;
        padding: 2px;
    }
}

@media (min-width: 320px) and (max-width: 480px) {
    .slide-all[data-v-516adc0c] {
        padding: 10px 14px;
    }
}
</style>
