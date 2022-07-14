<template>
    <div class="my-offer-section main-content padd-top-80">
        <!-- title section start -->
        <div class="title-section pl-4 p-2 border-bottom">
            <div class="d-flex justify-content-between">
                <div class="title text-uppercase">{{ title }}</div>
                <div class="create-offer">
                    <!-- create-offer modal component start -->
                    <!-- <createOffer></createOffer> -->
                    <!-- create-offer modal component end -->
                </div>
            </div>
        </div>
        <!-- title section end -->
        <!-- no-of-customer section start -->
        <!-- <div v-if="!show" class="no-of-customer p-2 bg-active-grey">
            <div class="text-right">
                <div class="add-filter" @click="addFilter">
                    <b-button class="btn-sm px-3 bg-navy-blue shadow-none"
                        >Add Filter</b-button
                    >
                </div>
            </div>
        </div>
        <div v-if="show" class="close-section text-right p-2" @click="close">
            <font-awesome-icon :icon="['fas', 'times']" />
        </div> -->
        <!-- no-of-customer section end -->
        <!-- filter section start -->
        <!-- <div v-if="show" class="filter-section p-4">
            <div class="categories-section">
                <div class="text-uppercase open-sans-bold font-16">
                    categories
                </div>
                <div class="search-categories">
                    <b-form-group>
                        <b-form-input
                            v-model="searchText"
                            class="form-control shadow-none"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            size="sm"
                            @input="getAllCategory()"
                        ></b-form-input>
                    </b-form-group>
                </div>
            </div>
            <div class="popular-categories-section">
                <b-form-group label="Category">
                    <b-form-checkbox
                        v-for="option in category"
                        :key="option._id"
                        v-model="selected"
                        :value="option._id"
                        name="flavour-4a"
                    >
                        {{ option.name }}
                    </b-form-checkbox>
                </b-form-group>
            </div>
            <div class="apply-section d-flex">
                <div>
                    <b-button
                        size="sm"
                        class="popup-btn mr-2"
                        variant="outline-primary"
                        @click="resetForm()"
                        >Clear</b-button
                    >
                    <b-button
                        size="sm"
                        class="popup-btn"
                        variant="outline-primary"
                        @click="getByFilter(selected)"
                        >Apply</b-button
                    >
                </div>
            </div>
        </div> -->
        <!-- filter section end -->
        <!-- offer-card component start -->
        <!-- <div class="d-flex justify-content-between p-3 font-14 font-weight-bold text-dark">
            <div>Type</div>
            <div>Package/Topup</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Action</div>

        </div> -->
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
                                        <div class="w-20">Type</div>
                                        <div class="w-20">Package/Topup</div>
                                        <div class="w-20">Amount</div>
                                        <div class="w-20">Status</div>
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
                            v-for="transaction in transactions"
                            :key="transaction.key"
                            class="mb-2"
                        >
                            <transactionCard :transaction="transaction" />
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
            No Transactions
        </div>

        <!-- offer-card component end -->
        <infinite-loading @infinite="infiniteHandler">
            <div slot="no-more"></div>
        </infinite-loading>
    </div>
</template>
<script>
import transactionCard from '~/components/card/transaction-card.vue'
import service from '@/service/apiService'
import global from '@/service/global'
import loader from '~/components/loader.vue'

export default {
    middleware: 'authenticationGuard',

    components: {
        transactionCard,
        loader,
    },
    data() {
        return {
            title: 'my transactions',
            page: 1,
            formData: {
                store: global.getStore(),
            },
            transactions: [],
            noResultFound: false,
            loader: true,
        }
    },
    methods: {
        infiniteHandler($state) {
            this.formData.page = this.page
            const accessToken = global.getUser()
            service.getTransactionForStore(
                accessToken,
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
                            this.transactions.push(o)
                        })
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
