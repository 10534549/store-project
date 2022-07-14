<template>
    <div class="my-offer-section main-content padd-top-80">
        <!-- title section start -->
        <div class="title-section pl-4 p-2 border-bottom">
            <div class="d-flex justify-content-between">
                <div class="title text-uppercase">{{ title }}</div>
                <div class="create-offer"></div>
            </div>
        </div>

        <div class="row pt-3 ml-3">
            <!-- <div class="float-right"> -->
            <div class="col">
                <h3>
                    List of Product
                    <span class="tableTotal">(Total : {{ totalItems }})</span>
                </h3>
            </div>
            <div class="col-md-auto">
                <form class="search-form mr-form" v-on:submit.prevent>
                    <!-- <input
                        type="text"
                        v-model="formData.keyword"
                        v-on:input="search(formData)"
                        placeholder="Search Package Name..."
                    /> -->
                </form>
            </div>
            <!-- create router link -->
            <div class="col col-lg-2">
                <router-link
                    to="createProduct"
                    class="btn btn-success btn-small black--text"
                    >Create</router-link
                >
            </div>
            <!-- </div> -->
        </div>

        <div class="transaction-block overflow-mob">
            <b-card class="m-3">
                <div class="transactions-content">
                    <div class="mb-2">
                        <b-list-group>
                            <b-list-group-item>
                                <div class="shop-title-section">
                                    <div
                                        class="
                                            d-flex
                                            align-item-center
                                            text-center
                                        "
                                    >
                                        <div class="w-20">Image</div>
                                        <div class="w-20">Name</div>
                                        <div class="w-20">₹</div>
                                        <div class="w-20">Verified Status</div>
                                        <div class="w-20">Action</div>
                                    </div>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
                <div v-if="!noResultFound" class="offer-card">
                    <div class="my-offers-content font-12">
                        <div
                            v-for="product in products"
                            :key="product._id"
                            class="mb-2"
                        >
                            <productCard :product="product" />
                        </div>
                    </div>
                </div>
            </b-card>
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
            No Products
        </div>

        <!-- offer-card component end -->
        <infinite-loading @infinite="infiniteHandler">
            <div slot="no-more"></div>
        </infinite-loading>
    </div>
</template>

<script>
import productCard from '~/components/card/product-card.vue'

import service from '@/service/apiService'
import global from '@/service/global'
import loader from '~/components/loader.vue'
export default {
    middleware: 'authenticationGuard',

    components: {
        productCard,
        loader,
    },
    data() {
        return {
            title: 'My Products',
            page: 1,
            formData: {
                store: global.getStore(),
            },
            products: [],
            totalItems: '',
            noResultFound: false,
            loader: true,
        }
    },
    methods: {
        infiniteHandler($state) {
            this.formData.page = this.page
            const accessToken = global.getUser()
            service.getAllProducts(
                // accessToken,

                this.formData,
                (data) => {
                    this.loader = false
                    if (this.formData.page === 1 && !data) {
                        this.noResultFound = true
                        $state.complete()
                    }
                    if (data.result) {
                        this.page += 1
                        data.result.forEach((o) => {
                            this.products.push(o)
                        })
                        this.totalItems = data.count
                        $state.loaded()
                    } else {
                        $state.complete()
                    }
                },
            )
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';
.my-offer-section {
    .no-of-customer {
        .add-filter {
            .btn-secondary {
                &:hover,
                &:focus {
                    color: $white;
                    background-color: $navy-blue;
                    border-color: $navy-blue;
                }
            }
        }
    }
    .filter-section {
        position: absolute;
        left: 73%;
        z-index: 999999;
        background: $light-grey;
        height: 80vh;
        // animation: mymove 5s;
        .categories-section {
            input#categories {
                width: 100%;
            }
        }
        .apply-section {
            .btn-secondary {
                border-radius: 10px;
                &:hover,
                &:focus {
                    background: $white;
                    color: $navy-blue;
                    border-radius: 10px;
                }
            }
        }
    }
    // @keyframes mymove {
    //     // from {
    //     //     right: 100px;
    //     // }
    //     to {
    //         left: 100px;
    //     }
    // }
    .offer-card {
        position: relative;
    }
}
.shop-title-section {
    font-family: $open-sans-bold;
    font-size: $font-16;
    color: $navy-blue;
    text-transform: capitalize;
    // .w-20{
    //     width: 20%;
    // }
}

// .transactions-content {
//     overflow-x: auto;
// }
// .my-offers-content {
//     overflow-x: auto;
// }

.transaction-block {
    .card {
        background-color: #eee;
        .card-body {
            overflow-x: auto;
            margin: 0.5rem;
            padding: 0px;
        }
    }
}
</style>
