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
                    <h6>List of Store</h6>
                    <v-spacer></v-spacer>
                    <h6>Show entries:</h6>
                    
                    
                    <span v-for="perPageOption in [10,50,100,150,200]" :key="perPageOption">
                    <button class="per-page-button">{{perPageOption}}</button>
                    </span>
                    
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
                <v-data-table :headers="headers" :items="stores" >
                    <template v-slot:item.actions="{ item }">

                        <v-icon small class="update">
                            mdi-pencil
                        </v-icon>
                        <v-icon small class="eye">
                            mdi-eye
                        </v-icon>



                    </template>
                    <template v-slot:item.actions1="{ item }">
                        <v-switch class="extra"></v-switch>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
    </div>
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
.eye{
  color:green;
  padding-right:15px;
}
.delete{
  color:red;
  cursor: pointer;
}
.per-page-button{
    padding:3px;
    margin:2px;
    border-radius:3px;
    font-size:0.75em;
    background-color:rgb(240, 237, 237);
}
</style>
