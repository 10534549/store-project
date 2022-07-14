<template>
    <!-- my offers section start -->
    <!-- offers section start -->
    <div class="transaction-card-section">
        <b-list-group>
            <b-list-group-item>
                <div class="d-flex text-center align-items-center">
                    <div class="w-20">
                        <div v-if="product.images.length == 0">
                            <b-img
                                :src="productStaticImg"
                                :alt="product.name"
                                width="100"
                            />
                        </div>
                        <div
                            v-else
                            v-for="image in product.images"
                            :key="image._id"
                        >
                            <img
                                :src="image.image"
                                v-if="image.showImage"
                                :alt="product.name"
                                width="100"
                            />
                        </div>
                    </div>
                    <div v-if="product.name" class="open-sans-semi-bold w-20">
                        {{ product.name }}
                    </div>

                    <div
                        v-if="product.productPoints"
                        class="open-sans-semi-bold w-20 text-center w-20"
                    >
                        {{ '₹ ' + product.productPoints }}
                    </div>
                    <div
                        v-if="product.verifiedStatus"
                        class="open-sans-semi-bold w-20 text-center w-20"
                    >
                        Approved
                    </div>
                    <div
                        class="open-sans-semi-bold w-20 text-center w-20"
                        v-else
                    >
                        Pending
                    </div>
                    <div style="margin: 0 auto">
                        <div class="w-20">
                            <div class="d-flex">
                                <div class="mr-2">
                                    <div
                                        v-if="!product.verifiedStatus"
                                        class="btn btn-primary"
                                        @click="editProduct(product._id)"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            role="img"
                                            width="1em"
                                            height="1em"
                                            preserveAspectRatio="xMidYMid meet"
                                            viewBox="0 0 32 32"
                                        >
                                            <path
                                                fill="none"
                                                stroke="currentcolor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m30 7l-5-5L5 22l-2 7l7-2Zm-9-1l5 5ZM5 22l5 5Z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div class="deletedModal">
                                    <b-button
                                        variant="danger"
                                        v-b-modal.delete-modal
                                        @click="deleteproduct(product)"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            role="img"
                                            width="1em"
                                            height="1em"
                                            preserveAspectRatio="xMidYMid meet"
                                            viewBox="0 0 16 16"
                                        >
                                            <g fill="currentColor">
                                                <path
                                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                                                />
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                />
                                            </g>
                                        </svg>
                                    </b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-list-group-item>
        </b-list-group>
    </div>
    <!-- offers section end -->
    <!-- my offers section end -->
</template>
<script>
import service from '@/service/apiService'
export default {
    props: {
        product: {
            type: Object,
            name: '',
            productPoints: '',
            description: '',
            sequency: 0,
            images: [
                {
                    showImage: false,
                    image: '',
                },
            ],
            preStatus: true,
            verifiedStatus: false,
            default() {
                return undefined
            },
        },
    },

    data() {
        return {
            geofenceCustomer: '500',
            customer: 'Customers in your geofence',
        }
    },
    methods: {
        // generateInvoiceforDownload(id) {
        //     const obj = {
        //         productId: id,
        //     }
        //     service.generateInvoiceforDownload(obj, () => {})
        // },
        deleteStoreProductById(data) {
            this.productData = data
        },
        /**
         * delete user
         */
        deleteproduct(singleData) {
            service.delete('StoreProduct', singleData._id, (response) => {
                if (response.status === 200) {
                    this.$toaster.success('Successfuly Deleted')
                    this.getAllProducts()
                } else {
                    this.$toaster.errors('Somthing went wrong')
                }
            })
        },
        getStoreProducts(formData) {
            service.getAll(
                'StoreProduct/searchInBackend',
                formData,
                (response) => {
                    if (
                        !this.$_.isEmpty(
                            response && response.data && response.data.result,
                        )
                    ) {
                        this.products = response.data.result
                        this.totalItems = response.data.count
                    } else {
                        this.products = []
                        this.currentPage = 1
                    }
                },
            )
        },
        editProduct(id) {
            this.$router.push({
                path: 'editProduct/' + id,
                // params: {
                //     id: id,
                // },
            })
        },
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.my-offers-content {
    .offer-image-section {
        width: 50px;
        height: 50px;
        .offer-image {
            width: 100%;
            height: 100%;
        }
    }
    .send-notification {
        .btn-secondary:hover {
            color: $white;
            background-color: $orange;
            border-color: $orange;
        }
        .btn-secondary:focus {
            color: $white;
            background-color: $orange;
            border-color: $orange;
        }
    }
}
.transaction-card-section {
    .list-group-item {
        width: 100vh;
    }
}

@media only screen and (min-width: 768px) {
    .transaction-card-section {
        .list-group-item {
            width: 100%;
        }
    }
}
</style>
