<template>
    <div>
        <b-modal
            id="topup-list"
            ref="topup-list"
            title="List of Topup's"
            hide-footer
            size="xl"
            no-stacking
        >
            <div class="table-responsive offerPart">
                <table class="table topup-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>No. of Notifications</th>
                            <th>Expiry Date</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="list != undefined && list.length > 0">
                        <tr v-for="(topUp, index) in list" :key="topUp._id">
                            <td>
                                {{ index + 1 + (currentPage - 1) * perPage }}
                            </td>
                            <td>
                                <div>
                                    {{
                                        topUp.createdAt
                                            | moment('Do MMMM , YYYY ')
                                    }}
                                </div>
                            </td>
                            <td>
                                <div v-if="topUp.topup">
                                    {{ topUp.topup.text }}
                                </div>
                            </td>
                            <td>
                                <div>{{ topUp.type | typeText }}</div>
                            </td>
                            <td>
                                <div v-if="topUp.topup">
                                    {{ topUp.topup.numberOfNotifications }}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {{
                                        topUp.topupExpiry
                                            | moment('Do MMMM , YYYY ')
                                    }}
                                </div>
                            </td>
                            <td>
                                <div>{{ topUp.amount }}</div>
                            </td>
                            <td>
                                <div>
                                    <b-button
                                        variant="outline-info"
                                        size="sm"
                                        @click="
                                            generateInvoiceforDownload(
                                                topUp._id,
                                            )
                                        "
                                        >Invoice
                                        <font-awesome-icon
                                            :icon="['fas', 'download']"
                                            class="pl-1"
                                    /></b-button>
                                </div>
                            </td>
                        </tr>
                        <!-- end v-repeat -->
                    </tbody>
                    <tbody v-if="list == undefined">
                        <tr class="text-center">
                            <td colspan="6">Loading ...</td>
                        </tr>
                    </tbody>
                    <tbody v-if="list != undefined && list.length == 0">
                        <tr class="text-center">
                            <td colspan="6">No Topup Purchased Yet</td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="totalItems > perPage" class="overflow-auto my-3">
                    <div class="d-flex justify-content-center">
                        <!-- <div class="">
                            <b-button
                                :disabled="currentPage == 1"
                                variant="info"
                                size="sm"
                                @click="loadLess()"
                            >
                                View Less
                            </b-button>
                        </div> -->
                        <div class="">
                            <b-button
                                :disabled="list.length == totalItems"
                                variant="info"
                                size="sm"
                                @click="loadMore()"
                            >
                                View More
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import _ from 'lodash'
import service from '@/service/apiService'
import global from '@/service/global'
export default {
    name: 'TopupList',
    data() {
        return {
            list: undefined,
            page: 1,
            currentPage: 1,
            perPage: 10,
            totalItems: 0,
        }
    },
    created() {
        this.getAllTopUpTransactionList()
    },
    methods: {
        getAllTopUpTransactionList() {
            const obj = {}
            obj.store = global.getStore()
            obj.page = this.currentPage
            service.getAllTopUpTransactionList(obj, (response) => {
                if (
                    !_.isEmpty(
                        response && response.data && response.data.result,
                    )
                ) {
                    if (this.list === undefined) {
                        this.list = response.data.result
                    } else {
                        this.list.push(response.data.result)
                    }
                    this.totalItems = response.data.count
                    this.currentPage = response.data.page
                } else {
                    if (
                        this.list === undefined ||
                        (this.list && this.list.length === 0)
                    ) {
                        this.list = []
                    }
                    this.currentPage = 1
                }
            })
        },
        loadMore() {
            this.currentPage = this.currentPage + 1
            this.getAllTopUpTransactionList()
        },
        generateInvoiceforDownload(id) {
            const obj = {
                transactionId: id,
            }
            service.generateInvoiceforDownload(obj, () => {})
        },
        close() {
            this.$bvModal.hide('topup-list')
        },
    },
}
</script>
<style lang="scss" scoped>
.topup-table {
    th,
    td {
        text-align: center;
    }
    td {
        vertical-align: middle;
    }
}
.modal-body {
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1rem;
    text-align: left !important;
}
.btn-outline-primary:focus,
.btn-outline-primary.focus,
.btn-outline-primary:not(:disabled):not(.disabled):active:focus,
.btn-outline-primary:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-primary.dropdown-toggle:focus,
.btn-outline-danger:focus,
.btn-outline-danger.focus,
.btn-outline-danger:not(:disabled):not(.disabled):active:focus,
.btn-outline-danger:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-danger.dropdown-toggle:focus {
    box-shadow: unset;
}
</style>
