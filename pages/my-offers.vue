<template>
    <div class="my-offer-section main-content padd-top-80">
        <!-- title section start -->
        <div class="title-section pl-4 p-2 border-bottom">
            <div class="d-flex justify-content-between">
                <div class="title text-uppercase">{{ title }}</div>
                <div class="create-offer">
                    <!-- create-offer modal component start -->
                    <createOffer :offermethod="resetForm"></createOffer>
                    <!-- create-offer modal component end -->
                </div>
            </div>
        </div>
        <!-- title section end -->
        <!-- no-of-customer section start -->
        <!-- <div class="no-of-customer p-2 bg-active-grey">
            <div class="text-right">
                <div class="add-filter">
                    <b-button
                        v-b-modal.filter-modal-center
                        class="btn-sm px-3 bg-navy-blue white--text shadow-none"
                        >Add Filter</b-button
                    >
                </div>
            </div>
        </div> -->
        <!-- <b-modal
            id="filter-modal-center"
            hide-footer
            centered
            title="Filter"
            no-close-on-backdrop
            no-close-on-esc
        >
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
                        v-model="selected.category"
                        :value="option._id"
                        name="flavour-4a"
                    >
                        {{ option.name }}
                    </b-form-checkbox>
                </b-form-group>
            </div>            
            <div class="popover-body">
                <div class="button-section text-center mb-2">
                    <b-button
                        size="sm"
                        class="popup-btn px-4 shadow-none"
                        variant="outline-primary"
                        @click="resetForm()"
                        >Clear</b-button
                    >
                    <b-button
                        size="sm"
                        class="popup-btn px-4 ml-2 shadow-none"
                        variant="outline-primary"
                        @click="getByFilter(selected)"
                        >Apply</b-button
                    >
                </div>
            </div> -->
            <!-- <div class="popover-body">
                <div class="apply-section d-flex">
                    <div>
                        <b-button
                            size="sm"
                            class="popup-btn mr-2 button-section"
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
        <!-- </b-modal> -->
        <!-- <div class="position-relative"> -->
        <!-- <div class="close-section text-right p-2">
                <font-awesome-icon
                    :icon="['fas', 'times']"
                    class="pointer"
                    @click="close"
                />
            </div> -->
        <!-- filter section start -->
        <!-- <div class="filter-section p-4">
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
        <!-- </div> -->
        <!-- no-of-customer section end -->
        <!-- offer-card component start -->
        <div v-if="!noResultFound" class="offer-cards">
            <div class="my-offers-content p-3 font-12">
                <div
                    v-for="oneOffer in offers"
                    :key="oneOffer.key"
                    class="mb-2"
                >
                    <offerCard :deal="oneOffer" />
                </div>
            </div>
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
            No Offers
        </div>
        <!-- offer-card component end -->
        <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
            <div slot="no-more"></div>
        </infinite-loading>
    </div>
</template>
<script>
import _ from 'lodash'
import offerCard from '~/components/card/offer-card.vue'
import createOffer from '~/components/modal/create-offers.vue'
import service from '@/service/apiService'
import global from '@/service/global'
import loader from '~/components/loader.vue'

export default {
    middleware: 'authenticationGuard',

    components: {
        offerCard,
        createOffer,
        loader,
    },
    data() {
        return {
            show: '',
            title: 'my offers',
            page: 1,
            formData: {
                type: 'offer',
            },
            searchText: '',
            offers: [],
            selected: {
                category: [],
            },
            category: [],
            noResultFound: false,
            loader: true,
        }
    },
    created() {
        this.formData.store = global.getStore()
        this.getAllCategory()
    },
    methods: {
        infiniteHandler($state) {
            this.formData.page = this.page
            const accessToken = global.getUser()
            service.getAllStoreOffers(accessToken, this.formData, (data) => {
                this.loader = false
                if (this.formData.page === 1 && !data) {
                    this.noResultFound = true
                    $state.complete()
                }
                if (data.getAllOffer) {
                    this.page += 1
                    data.getAllOffer.forEach((o) => {
                        this.offers.push(o)
                    })
                    $state.loaded()
                    this.noResultFound = false
                } else {
                    $state.complete()
                }
            })
        },
        getAllCategory() {
            this.formData.page = 1
            if (this.searchText) {
                this.formData.keyword = this.searchText
            } else {
                this.formData.keyword = ''
            }
            service.AllCategory(this.formData, (data) => {
                this.category = data.data.getAllCategory
            })
        },
        getByFilter(value) {
            this.$bvModal.hide('filter-modal-center')
            this.formData.page = 1
            if (!_.isEmpty(value) && value.category.length > 0) {
                const filter = {}
                filter.category = value.category
                this.formData.filter = filter
            } else {
                this.formData.filter = ''
            }
            delete this.formData.keyword
            const accessToken = global.getUser()
            service.getAllByFilter(accessToken, this.formData, (data) => {
                if (data.getAllOffer) {
                    this.offers = data.getAllOffer
                    this.noResultFound = false
                } else {
                    this.noResultFound = true
                }
            })
        },
        addFilter() {
            this.show = !this.show
        },

        resetForm() {
            this.$bvModal.hide('filter-modal-center')
            this.selected = {
                category: [],
            }
            this.offers = []
            this.page = 1
            delete this.formData.filter
            if (global.getUser()) {
                delete this.filterPagation
                this.$nextTick(() => {
                    this.$refs.infiniteLoading.stateChanger.reset()
                })
            }
        },
        close() {
            this.show = false
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
        right: 0;
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
</style>
