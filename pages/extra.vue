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
                            <v-text-field
                                placeholder="Filter by"
                                outlined
                                dense
                            ></v-text-field>
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
                            <v-text-field
                                placeholder="search store"
                                outlined
                                dense
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </div>
                <v-data-table
                    :headers="headers"
                    :items="stores"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                >
                    <!-- <template v-slot:item.actions1="{ item }">
                        <v-switch class="extra"></v-switch>
                    </template> -->
                    <template v-slot:item.createdAt="{ item }">
                        <span>{{ formatDate(item.createdAt) }} </span>
                    </template>
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <v-card>
                                    <v-card-title>
                                        <span v-if="hasEdit" class="text-h5"
                                            >Edit Item</span
                                        >
                                        <span v-if="hasView" class="text-h5"
                                            >View Item</span
                                        >
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col
                                                    v-if="hasEdit"
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.createdAt
                                                        "
                                                        label="CreatedAt"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                    v-if="hasView"
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-if="hasView"
                                                        :readonly="hasView"
                                                        label="CreatedAt"
                                                        :value="
                                                            formatDate(
                                                                editedItem.createdAt,
                                                            )
                                                        "
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.name
                                                        "
                                                        :readonly="hasView"
                                                        label="Name"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.email
                                                        "
                                                        :readonly="hasView"
                                                        label="Email"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.contactNumber
                                                        "
                                                        :readonly="hasView"
                                                        label="Phone"
                                                    ></v-text-field>
                                                </v-col>
                                                <!-- <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.address
                                                        "
                                                        :readonly="hasView"
                                                        label="Address"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.city
                                                        "
                                                        :readonly="hasView"
                                                        label="City"
                                                    >
                                                    </v-text-field>
                                                </v-col> -->
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions v-if="hasEdit">
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="close"
                                        >
                                            Cancel
                                        </v-btn>
                                        <v-btn colo>

                                        </v-btn>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="save"
                                        >
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            class="update"
                            color="indigo"
                            dark
                            @click="editItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            small
                            class="eye"
                            color="indigo"
                            dark
                            @click="viewItem(item)"
                        >
                            mdi-eye
                        </v-icon>
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
import moment from 'moment'
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
                { text: '30 records/page', value: 30 },
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
                // { text: 'Expiry Date', value: 'updatedAt' },
                { text: 'Actions', value: 'actions' },
                { text: '', value: 'actions1' },
            ],
            dialog: false,
            hasEdit: false,
            hasView: false,
            editedIndex: -1,
            editedItem: {
                name: '',
                email: '',
                contactNumber: '',
                createdAt: '',
            },
            defaultItem: {
                name: '',
                email: '',
                contactNumber: '',
                updatedAt: '',
                createdAt: '',
                city: '',
                state: '',
                country: '',
            },
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
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
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
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY')
            }
        },
        editItem(item) {
            this.dialog = true
            this.hasView = false
            this.hasEdit = true
            this.editedIndex = this.stores.indexOf(item)
            this.editedItem = Object.assign({}, item)
        },
        viewItem(item) {
            this.dialog = true
            this.hasEdit = false
            this.hasView = true
            this.editedIndex = this.stores.indexOf(item)
            this.editedItem = Object.assign({}, item)
        },
        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.stores[this.editedIndex], this.editedItem)
            } else {
                this.stores.push(this.editedItem)
                // call apiService
            }
            console.log('editedIndex', this.editedItem)
            apiService.updateStore(this.editedItem, (response) => {
                if (response.status === 200) {
                    console.log('response', response)
                } else {
                    console.log('erorr', response)
                }
            })
            this.close()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
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
