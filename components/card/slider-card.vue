<template>
    <div>
        <client-only>
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide v-for="store in storedetails" :key="store._id">
                    <b-row
                        v-for="images in store.multipleImages"
                        :key="images.index"
                        class="no-gutters"
                    >
                     <div class="ff" style="width:100%;" align="center">
                        <div @click="getpath(store)">
                            <div class="swiper-image-section " align="center">
                                <b-img
                                    :src="images"
                                    :alt="store.name"
                                    class="swiper-image"
                                ></b-img>
                                <div   class=" new "  align="center">
                                <h6 class="new2" > {{ store.name }}
                                </h6>
                                
                                   
                            </div>
                            </div>
                        </div>
                     </div>
                      
                    </b-row>
                    <!-- <b-row v-for="images in store.multipleImages"
                        :key="images.index"
                        class="no-gutters">
                    <pre>{{images}}</pre>

                           <div @click="getpath(store)">
                                   <div class="store-image" style="background-image: url({images})">
                            <div>Testing swiper </div>

                        </div>
                        </div>
                    </b-row> -->
                </swiper-slide>
                <div slot="button-prev" class="swiper-button-prev"></div>
                <div slot="button-next" class="swiper-button-next"></div>
            </swiper>
        </client-only>
    </div>
</template>
<script>
import _ from 'lodash'

export default {
    props: {
        storedetails: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            isNotEmpty: true,
            swiperOption: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                },
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
        }
    },
    created() {
        if (_.isEmpty(this.storedetails)) {
            this.isNotEmpty = false
        } else {
            this.isNotEmpty = true
        }
    },
    methods: {
        getpath(store) {
            if (!_.isEmpty(store._id)) {
                this.$router.push({
                    name: 'store-storeId',
                    params: { storeId: store._id },
                })
            } else {
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import 'swiper/css/swiper.css';
@import '~/assets/scss/variables';
.swiper-wrapper {
    .swiper-slide {
        width: 100%;
        // height: 200px;
        // border: 5px solid green;

        .swiper-image-section {
            width: 100%;
            // border: 5px solid red;
            display: grid;
            place-content: center;
            // height: 200px;
            overflow: hidden;
            .swiper-image {
                width: 95%;
                height: 200px;
                left: 0;
    right: 0;
    margin: auto;
                
            }
           
        }
    }
}

.new {
    width:100%;
    // border: 5px solid green;
     overflow: hidden;
    //  background-color: rgb(36, 34, 34);
    //  padding-right: 10px;
    

.new2 {
    // text-align: center;
    // display: flex;
    // justify-items: center;
    // left: 0;
    // right: 0;
    // margin: auto;
    
                width: 95%;
                // border: 5px blue dotted;
                // height: 200px;
                background-color: black;
                color: white;
                font-size: 20px;
               height: 30px;
              

            
}
}
.test{
    // left: 0;
    // right: 0;
    // margin: auto;
}
@media screen {
    
}
</style>
