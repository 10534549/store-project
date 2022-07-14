<template>
    <div class="update-section main-content">
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
        <div class="update-plan-content p-3 font-12">
            <!-- update plan section start -->
            <div class="plan-section justify-content-center">
                <div v-for="plan in updatePlan" :key="plan._id" class="mb-2">
                    <div
                        class="card-section m-3 p-3 h-90"
                        style="
                            background: linear-gradient(
                                to bottom right,
                                #ff5900,
                                #ff8b26,
                                #ffefe0
                            );
                        "
                    >
                        <div class="d-flex justify-content-between">
                            <div
                                class="
                                    plan-title
                                    text-capitalize
                                    font-16
                                    open-sans-bold
                                "
                            >
                                {{ plan.name }}
                            </div>
                            <div>
                                <label class="checkbox-container">
                                    <input
                                        type="radio"
                                        name="radio"
                                        :checked="selectedPlan == plan._id"
                                        @click="selectedPackage(plan._id)"
                                    />

                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div class="open-sans-semi-bold pt-2 font-10">
                            <div class="offers-deals">
                                * User can create {{ plan.noOfOffers }} Offers
                                and {{ plan.noOfDeals }} Deals
                            </div>
                            <div>
                                *
                                {{ plan.noOfNotifications }}
                                PushMsgs can use
                            </div>
                            <div>
                                * {{ plan.validTill }}
                                Months Subscription
                            </div>
                            <div>
                                * {{ plan.themeLimit }}
                                theme Available
                            </div>
                        </div>
                        <div class="d-flex justify-content-between pt-3">
                            <div
                                v-if="plan.discountPrice"
                                class="open-sans-bold font-16"
                            >
                                <span>Rs. {{ discountedAmount(plan) }}</span>
                                <del class="font-12 text-dark">
                                    Rs. {{ plan.price }}.00
                                </del>
                                <div>
                                    <span
                                        >Flat Rs.
                                        {{ plan.discountPrice }} Off</span
                                    >
                                </div>
                            </div>
                            <div
                                v-else-if="plan.discountPercent"
                                class="open-sans-bold font-16"
                            >
                                <span>Rs. {{ discountedPrice(plan) }}</span>
                                <del> Rs. {{ plan.price }}.00 </del>
                                <span>{{ plan.discountPercent }}% off</span>
                            </div>
                            <div v-else class="open-sans-bold font-16">
                                Rs. {{ plan.price }}.00
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div>
                <b-button style="margin-left:495px" @click="updatePackage()">
                    Update Plan
                </b-button>
            </div> -->
            <div class="plan-store-btn text-center">
                <b-button
                    type="button"
                    variant="warning"
                    class="btn bg-orange rounded-pill px-4 shadow-none"
                    @click="updatePackage()"
                >
                    Update Plan
                </b-button>
            </div>
            <!-- update plan section end -->
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
import global from '@/service/global.js'
import loader from '~/components/loader.vue'

export default {
    middleware: 'authenticationGuard',

    components: {
        loader,
    },
    data() {
        return {
            title: 'update plan',
            updatePlan: [],
            selectedPlan: '',
            formData: {},
            storeId: '',
            loader: true,
        }
    },
    created() {
        this.storeId = global.getStore()
        this.getAllPackage()
    },
    methods: {
        discountedAmount(product) {
            return product.price - product.discountPrice
        },
        discountedPrice(product) {
            // console.log('product', product)
            return (
                product.price - (product.price * product.discountPercent) / 100
            )
        },
        selectedPackage(id) {
            this.selectedPlan = id
        },
        getAllPackage() {
            service.getAllPackage({}, (response) => {
                this.loader = false
                if (response.status === 200) {
                    this.updatePlan = response.data.getAllPackage
                    if (response.data.getAllPackage.length >= 1) {
                        this.selectedPlan = response.data.getAllPackage[0]._id
                    }
                } else {
                    this.updatePlan = []
                }
            })
        },
        updatePackage() {
            this.formData.store = this.storeId
            this.formData.package = this.selectedPlan
            this.formData.type = this.$route.params.type
            this.loader = true
            service.updatePlan(this.formData, (response) => {
                if (response.status === 200) {
                    if (response.data.value == 'Exist') {
                        this.$toaster.success(
                            'Please update plan after current plan has been expired !',
                        )
                    } else {
                        this.$toaster.success('plan updated')
                    }
                    this.loader = false
                    this.$router.push('/profile')
                } else {
                    this.loader = false
                    this.$toaster.error('something went worng')
                }
            })
        },
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.h-90 {
    height: 90%;
}
.update-section {
    .update-plan-content {
        .plan-section {
            display: flex;
            .card-section {
                border-radius: 5px;

                .checkbox-container {
                    display: block;
                    position: relative;
                    padding-left: 35px;
                    margin-bottom: 12px;
                    cursor: pointer;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }

                .checkbox-container input[type='radio'] {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;
                }
                .checkbox-container:hover input[type='radio'] ~ .checkmark {
                    background-color: $active-grey;
                }

                .checkbox-container input[type='radio']:checked ~ .checkmark {
                    background-color: $black;
                }

                .checkbox-container
                    input[type='radio']:checked
                    ~ .checkmark:after {
                    display: block;
                }
                .checkmark {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 20px;
                    width: 20px;
                    background-color: $light-grey;
                }
                .checkmark:after {
                    content: '';
                    position: absolute;
                    display: none;
                }
                .checkbox-container .checkmark:after {
                    left: 8px;
                    top: 4px;
                    width: 5px;
                    height: 10px;
                    border: solid $white;
                    border-width: 0 3px 3px 0;
                    -webkit-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    transform: rotate(45deg);
                }
            }
        }
    }
    .plan-store-btn {
        .btn-warning {
            background: $orange;
            color: $white;
        }
        .btn-warning:hover {
            color: $white;
            background-color: $orange;
            border-color: $orange;
        }
    }
}

@media (min-width: 320px) and (max-width: 480px) {
    //CSS
    .update-section {
        .update-plan-content {
            background: $light-grey;
            .plan-section {
                display: block;
                .card-section {
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>
