<template>
    <!-- my offers section start -->
    <!-- offers section start -->
    <div class="transaction-card-section">
        <b-list-group>
            <b-list-group-item>
                <div class="d-flex align-item-center text-center">
                    <div
                        v-if="transaction.type"
                        class="pl-2 open-sans-semi-bold w-20 text-center"
                    >
                        {{ transaction.type | typeText }}
                    </div>

                    <div class="w-20 text-center">
                        <div
                            v-if="transaction.package"
                            class="open-sans-semi-bold"
                        >
                            {{ transaction.package.name }}
                        </div>
                        <div
                            v-if="transaction.topup"
                            class="open-sans-semi-bold"
                        >
                            {{ transaction.topup.text }}
                        </div>
                        <div v-if="!transaction.package && !transaction.topup">
                            -
                        </div>
                    </div>
                    <!-- <div v-if="transaction.store" class="open-sans-semi-bold">
                        {{ transaction.store.name }}
                    </div> -->
                    <div
                        v-if="transaction.amount"
                        class="open-sans-semi-bold  w-20 text-center"
                    >
                        {{ transaction.amount }}
                    </div>
                    <div
                        v-if="transaction.status"
                        class="open-sans-semi-bold  w-20 text-center"
                    >
                        {{ transaction.status }}
                    </div>
                    <div
                        v-if="transaction.upiId"
                        class="open-sans-semi-bold  w-20 text-center"
                    >
                        {{ transaction.upiId }}
                    </div>
                    <div
                        v-if="transaction.transactionID"
                        class="open-sans-semi-bold  w-20"
                    >
                        {{ transaction.transactionID }}
                    </div>
                    <div class="w-20">
                        <b-button
                            variant="outline-info"
                            size="sm"
                            @click="generateInvoiceforDownload(transaction._id)"
                        >
                            Invoice
                            <font-awesome-icon
                                :icon="['fas', 'download']"
                                class="pl-1"
                            />
                        </b-button>
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
        transaction: {
            type: Object,
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
        generateInvoiceforDownload(id) {
            const obj = {
                transactionId: id,
            }
            service.generateInvoiceforDownload(obj, () => {})
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
