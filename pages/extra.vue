<template>
    <!-- <v-row>
        <v-col cols="12" sm="5" md="2"> </v-col>
        <v-col cols="12" sm="5" md="9">
            <h3>stores</h3>
        </v-col>
    </v-row> -->
    <v-row>
        <v-col cols="12" sm="5" md="2"> </v-col>
        <v-col cols="12" sm="5" md="9">
            <v-card class="mx-auto">
                <!-- <div>{{ info }}</div> -->
                <v-card-title class="text--secondary">
                    <h6>List of Store( Total: {{ totalRecords }} )</h6>
                    <v-spacer></v-spacer>
                    <h6>Show entries:</h6>
                    <v-pagination v-model="page" :length="pageCount">
                    </v-pagination>

                    <!-- <v-pagination v-model="page" :length="3"  >
                    </v-pagination> -->
                </v-card-title>
                <div>
                    <v-row class="d-flex">
                        <v-col cols="12" sm="6" md="2">
                            <v-text-field placeholder="Filter by" outlined dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-btn depressed color="error">
                                Clear Filter
                            </v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" sm="6" md="1">
                            <v-btn depressed color="primary">
                                Export
                            </v-btn>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field placeholder="search store" outlined dense></v-text-field>
                        </v-col>
                    </v-row>
                </div>
                <v-data-table :headers="headers" :items="stores" :page.sync="page" :items-per-page="itemsPerPage"
                    hide-default-footer>
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="update" color="indigo" dark>
                            mdi-pencil
                        </v-icon>
                        <v-icon small class="eye" color="indigo" dark>
                            mdi-eye
                        </v-icon>
                    </template>
                    <template v-slot:item.actions1="{ item }">
                        <v-switch class="extra"></v-switch>
                    </template>
                </v-data-table>
                <!-- <v-row class="text-center px-4 align-center" wrap>
                    <v-col class="text-truncate" cols="12" md="2">
                        Total {{ totalRecords }} records
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-pagination v-model="page" :length="pageCount">
                        </v-pagination>
                    </v-col>
                </v-row> -->
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import axios from 'axios'
import apiService from '@/service/apiService'
export default {
    name: 'Extra',
    data() {
        return {
            page: 1,
            stores: [],
            totalItems: null,
            currentPage: null,
            perPage: 5,
            info: null,
            itemsPerPage: 5,
            perPageChoices: [
                { text: '5 records/page', value: 5 },
                { text: '10 records/page', value: 10 },
                { text: '20 records/page', value: 20 },
            ],
            formData: {
                keyword: '',
                limit: 0,
                verifiedStatus: null,
                filter: {
                    filterBy: '',
                },
            },
            headers: [
                { text: 'Date', value: 'createdAt' },
                { text: 'Name', value: 'name' },
                { text: 'Email', value: 'email' },
                { text: 'Mobile', value: 'contactNumber' },
                { text: 'Expiry Date', value: 'updatedAt' },
                { text: 'Actions', value: 'actions' },
                { text: '', value: 'actions1' },
            ],
        }
    },
    computed: {
        totalRecords() {
            return this.stores.length
        },
        pageCount() {
            return this.totalRecords / this.itemsPerPage
        },
    },
    mounted() {
        /* axios
            .get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then((response) => (this.info = response)) */
    },
    created() {
        this.formData.page = this.currentPage
        this.allStore(this.formData)
    },
    methods: {
        allStore(formData) {
            apiService.storeList(formData, (response) => {
                if (response && response.data && response.data.getAllStore) {
                    this.stores = response.data.getAllStore
                    this.totalItems = response.data.count
                    this.currentPage = response.data.page
                    this.perPage = response.data.perPage
                } else {
                    this.stores = []
                    this.currentPage = 1
                }
            })
        },
    },
}
</script>
<style>
.extra {
    padding: 10px;
}

.mx-auto {
    margin: 60px;
    box-shadow: 9px 9px 9px rgba(128, 128, 128, 0.6);
}

.eye {
    color: green;
    padding-right: 15px;
}

.delete {
    color: red;
    cursor: pointer;
}

.per-page-button {
    padding: 3px;
    margin: 2px;
    border-radius: 3px;
    font-size: 0.75em;
    background-color: rgb(240, 237, 237);
}
</style>
