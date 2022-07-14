<template>
    <div class="profile-section main-content padd-top-80">
        <!-- title section start -->
        <div class="title-section pl-4 p-2 border-bottom">
            <div class="title text-uppercase">Update Store</div>
        </div>
        <!-- title section end -->
        <div class="store-profile-content p-3">
            <b-form ref="form" name="store" @submit.stop.prevent="handleSubmit">
                <div class="update-store-section open-sans-semi-bold p-2">
                    <!-- store-details start -->
                    <b-row>
                        <b-col lg="6" md="6" sm="12">
                            <div
                                :class="{
                                    'form-group--error':
                                        $v.storedetails.name.$error,
                                }"
                            >
                                <b-form-group>
                                    <div>
                                        <label for="storeName">
                                            Store Name
                                            <span class="error-txt">*</span>
                                        </label>
                                    </div>
                                    <b-form-input
                                        id="storeName"
                                        v-model="storedetails.name"
                                        class="form-control-sm"
                                        placeholder="Store Name"
                                    ></b-form-input>
                                    <div
                                        v-if="
                                            $v.storedetails.name.$touch &&
                                            $v.storedetails.name.$error
                                        "
                                        class="error-txt"
                                    >
                                        Store Name is required
                                    </div>
                                </b-form-group>
                            </div>

                            <div
                                :class="{
                                    'form-group--error':
                                        $v.storedetails.category.$error,
                                }"
                            >
                                <b-form-group>
                                    <div>
                                        <label for="Categories">
                                            Categories
                                            <span class="error-txt">*</span>
                                        </label>
                                    </div>
                                    <multiselect
                                        v-model="storedetails.category"
                                        deselect-label="Can't remove this value"
                                        track-by="_id"
                                        name="_id"
                                        label="name"
                                        placeholder="Select one"
                                        :options="categories"
                                        :searchable="true"
                                        :allow-empty="false"
                                        @input="
                                            subCatBasedOnCat(
                                                storedetails.category,
                                            )
                                        "
                                    >
                                        <template
                                            slot="_id"
                                            slot-scope="{ option }"
                                        >
                                            <strong>{{ option.name }}</strong>
                                        </template>
                                    </multiselect>
                                    <div
                                        v-if="
                                            $v.storedetails.category.$touch &&
                                            $v.storedetails.category.$error
                                        "
                                        class="error-txt"
                                    >
                                        Category is required
                                    </div>
                                </b-form-group>
                            </div>
                            <b-form-group>
                                <div>
                                    <label for="subCategories">
                                        SubCategories
                                    </label>
                                </div>
                                <multiselect
                                    v-model="storedetails.subCategory"
                                    deselect-label="Can't remove this value"
                                    track-by="_id"
                                    name="_id"
                                    label="name"
                                    placeholder="Select one"
                                    :options="SubCategories"
                                    :searchable="true"
                                    :allow-empty="false"
                                    :disabled="catFound"
                                >
                                    <template
                                        slot="_id"
                                        slot-scope="{ option }"
                                    >
                                        <strong>{{ option.name }}</strong>
                                    </template>
                                </multiselect>
                            </b-form-group>
                            <div
                                :class="{
                                    'form-group--error':
                                        $v.storedetails.contactPerson.$error,
                                }"
                            >
                                <b-form-group>
                                    <div>
                                        <label for="contactPersonName">
                                            Contact Person Name
                                            <span class="error-txt">*</span>
                                        </label>
                                    </div>
                                    <b-form-input
                                        id="contactPersonName"
                                        v-model="storedetails.contactPerson"
                                        class="form-control-sm"
                                        placeholder="Contact Person Name"
                                    ></b-form-input>
                                    <div
                                        v-if="
                                            $v.storedetails.contactPerson
                                                .$touch &&
                                            $v.storedetails.contactPerson.$error
                                        "
                                        class="error-txt"
                                    >
                                        Contact Person Name is required
                                    </div>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group>
                                    <div>
                                        <label for="agent"> Agent Code </label>
                                    </div>
                                    <b-form-input
                                        id="agent"
                                        v-model="agentId"
                                        class="form-control-sm"
                                        placeholder="Agent Code"
                                        onpaste="verifyAgentId()"
                                        @input="verifyAgentId"
                                    ></b-form-input>
                                    <div
                                        name.$error
                                        v-if="message && agentId"
                                        class="error-txt"
                                    >
                                        Agent Code is Invalid
                                    </div>
                                </b-form-group>
                            </div>
                        </b-col>
                        <b-col lg="6" md="6" sm="12">
                            <div class="store">
                                <div class="add-image-section p-2 mb-2">
                                    <b-img
                                        :src="
                                            storedetails.images
                                                | imageRender('store-152.png')
                                        "
                                        alt="logo"
                                        class="add-image"
                                    />
                                </div>
                                <div class="add-photos-section">
                                    <b-form-group>
                                        <label>image:(160px/160px)</label>
                                        <b-input-group class="input-group">
                                            <b-form-file
                                                ref="file"
                                                v-model="file"
                                                placeholder="Choose a file..."
                                                drop-placeholder="Drop file here..."
                                                accept="image/jpeg, image/png, image/gif"
                                                @input="onImage(file)"
                                            ></b-form-file>
                                            <!-- <b-input-group-append>
                                                <b-button
                                                    class="career-btn pt-0"
                                                    @click="onImage(file)"
                                                    >Upload</b-button
                                                >
                                            </b-input-group-append> -->
                                        </b-input-group>
                                    </b-form-group>
                                </div>
                            </div>

                            <div>
                                <b-form-group>
                                    <div>
                                        <label for="emailId"> Email Id </label>
                                    </div>
                                    <b-form-input
                                        id="emailId"
                                        :value="storedetails.email"
                                        class="form-control-sm"
                                        placeholder="Email Id"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group>
                                    <div>
                                        <label for="Description">
                                            Description
                                            <span class="error-txt">*</span>
                                        </label>
                                    </div>
                                    <b-form-input
                                        id="description"
                                        class="form-control-sm"
                                        v-model="storedetails.description"
                                        placeholder="Description"
                                    ></b-form-input>
                                    <div
                                        v-if="
                                            $v.storedetails.description
                                                .$touch &&
                                            $v.storedetails.description.$error
                                        "
                                        class="error-txt"
                                    >
                                        Description is required
                                    </div>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group
                                    label="Mobile No"
                                    label-for="mobileNo"
                                >
                                    <b-form-input
                                        id="mobileNo"
                                        :value="storedetails.contactNumber"
                                        class="form-control-sm"
                                        placeholder="Mobile No"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            <div>
                                <b-form-group>
                                    <div>
                                        <label for="gstNo">GST No</label>
                                    </div>
                                    <b-form-input
                                        id="gstNo"
                                        type="tel"
                                        :value="storedetails.gstNumber"
                                        class="form-control-sm"
                                        placeholder="GST Number"
                                        :maxlength="15"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="6" md="6" sm="12">
                            <div
                                :class="{
                                    'form-group--error':
                                        $v.storedetails.location.$error,
                                }"
                            >
                                <b-form-group>
                                    <label for="searchpin">
                                        Set Latitude and Longitude
                                        <span class="error-txt">*</span>
                                    </label>
                                    <gmap-autocomplete
                                        class="form-control"
                                        :value="placeName"
                                        @place_changed="setPlace"
                                    >
                                    </gmap-autocomplete>
                                </b-form-group>
                                <div
                                    v-if="
                                        $v.storedetails.location.$touch &&
                                        $v.storedetails.location.$error
                                    "
                                    class="error-txt"
                                >
                                    Location is required
                                </div>
                            </div>
                        </b-col>
                        <b-col lg="2" md="2" sm="12">
                            <b-form-group>
                                <label for="searchpin" class="hide-text">
                                    Add button
                                </label>
                                <b-button
                                    type="button"
                                    block
                                    size="sm"
                                    @click="addMarker"
                                >
                                    Add
                                </b-button>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12">
                            <b-form-group>
                                <gmap-map
                                    ref="mapRef"
                                    :center="center"
                                    :zoom="12"
                                    class="w-100 h-200"
                                    @click="getMap"
                                >
                                    <gmap-marker
                                        :key="index"
                                        v-for="(m, index) in markers"
                                        :position="m.position"
                                        :clickable="true"
                                        @click="center = m.position"
                                    >
                                    </gmap-marker>
                                </gmap-map>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row v-if="checkCoordinates">
                        <b-col lg="6" md="6" sm="12">
                            <b-form-group>
                                <div>
                                    <label for="latitude"> Latitude </label>
                                </div>
                                <b-form-input
                                    id="latitude"
                                    :value="
                                        storedetails.location.coordinates[1]
                                    "
                                    class="form-control-sm"
                                    placeholder="Latitude"
                                    disabled
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6" md="6" sm="12">
                            <b-form-group>
                                <div>
                                    <label for="latitude"> Longitude </label>
                                </div>
                                <b-form-input
                                    id="longitude"
                                    :value="
                                        storedetails.location.coordinates[0]
                                    "
                                    class="form-control-sm"
                                    placeholder="Longitude"
                                    disabled
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="3" sm="12">
                            <div
                                :class="{
                                    'form-group--error':
                                        $v.storedetails.openingTime.$error,
                                }"
                            >
                                <b-form-group>
                                    <div>
                                        <label for="addressLine1">
                                            Opening Time
                                        </label>
                                        <span class="error-txt">*</span>
                                    </div>
                                    <vue-timepicker
                                        v-model="storedetails.openingTime"
                                        class="form-control"
                                        format="hh:mm A"
                                        placeholder="Store Name"
                                        required
                                    ></vue-timepicker>
                                </b-form-group>
                                <div
                                    v-if="
                                        $v.storedetails.openingTime.$touch &&
                                        $v.storedetails.openingTime.$error
                                    "
                                    class="error-txt"
                                >
                                    Opening Time is required
                                </div>
                            </div>
                        </b-col>
                        <b-col lg="3" sm="12">
                            <div
                                :class="{
                                    'form-group--error':
                                        $v.storedetails.closingTime.$error,
                                }"
                            >
                                <b-form-group>
                                    <div>
                                        <label for="pincode">
                                            Closing Time
                                        </label>
                                        <span class="error-txt">*</span>
                                    </div>
                                    <vue-timepicker
                                        v-model="storedetails.closingTime"
                                        class="form-control"
                                        format="hh:mm A"
                                        required
                                    ></vue-timepicker>
                                </b-form-group>
                                <div
                                    v-if="
                                        $v.storedetails.closingTime.$touch &&
                                        $v.storedetails.closingTime.$error
                                    "
                                    class="error-txt"
                                >
                                    Closing Time is required
                                </div>
                            </div>
                        </b-col>
                        <b-col lg="6" sm="12">
                            <b-form-group>
                                <div>
                                    <label for="url">Website link</label>
                                    <label>{Eg-https://www.google.com/}</label>
                                    <b-form-group>
                                        <div></div>
                                        <b-form-input
                                            id="url"
                                            v-model="websiteLink"
                                            class="form-control-sm"
                                            placeholder="Link"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <div class="modal-title text-uppercase p-3">
                            address details
                        </div>
                    </b-row>
                    <b-row>
                        <b-col lg="6" md="6" sm="12">
                            <div>
                                <b-form-group>
                                    <div>
                                        <label for="addressLine1">
                                            Address
                                        </label>
                                    </div>
                                    <b-form-input
                                        id="addressLine1"
                                        v-model="storedetails.address"
                                        class="form-control-sm"
                                        placeholder="Address"
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                        </b-col>
                        <b-col lg="6" md="6" sm="12">
                            <div class="mb-4">
                                <b-form-group>
                                    <div>
                                        <label for="pincode"> Pincode </label>
                                    </div>
                                    <b-form-input
                                        id="pincode"
                                        v-model="storedetails.pincode"
                                        class="form-control-sm"
                                        placeholder="Pincode"
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                        </b-col>
                    </b-row>
                    <!-- address-details end -->
                    <b-row>
                        <div class="modal-title text-uppercase p-3">
                            Multiple Images:
                            <span style="color: black; font-size: 15px"
                                >(555px/200px)</span
                            >
                        </div>
                    </b-row>

                    <b-row>
                        <b-col lg="6" sm="12">
                            <div class="add-photos-section">
                                <b-form-group>
                                    <b-input-group class="input-group">
                                        <b-form-file
                                            ref="file"
                                            v-model="file"
                                            multiple
                                            placeholder="Choose a file..."
                                            drop-placeholder="Drop file here..."
                                            accept="image/jpeg, image/png, image/gif"
                                            @change="
                                                onFileChange(
                                                    $event.target.name,
                                                    $event.target.files,
                                                )
                                            "
                                        ></b-form-file>
                                    </b-input-group>
                                </b-form-group>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col
                            v-for="(
                                image, index
                            ) in storedetails.multipleImages"
                            :key="index"
                            lg="2"
                            md="2"
                            sm="6"
                        >
                            <div class="store">
                                <div
                                    class="
                                        add-image-section
                                        p-2
                                        mb-3
                                        position-relative
                                    "
                                >
                                    <b-img
                                        :src="
                                            image | imageRender('store-152.png')
                                        "
                                        alt="logo"
                                        class="add-image"
                                    />
                                    <div
                                        class="
                                            position-absolute
                                            place-cross-on-topright
                                        "
                                    >
                                        <font-awesome-icon
                                            :icon="['fas', 'times']"
                                            class="text-white"
                                            @click="remove(index)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row class="justify-content-center pt-3 py-2 border-top">
                        <div class="create-btn">
                            <b-button
                                type="button"
                                class="btn bg-light-green px-4 shadow-none"
                                @click="onUpdate(storedetails)"
                            >
                                Update
                            </b-button>
                        </div>
                    </b-row>
                </div>
            </b-form>
        </div>
        <!-- Loader start  -->
        <div v-if="loader" class="text-center">
            <loader />
        </div>
        <!-- loader end  -->
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import VueTimepicker from 'vuejs-timepicker'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import service from '@/service/apiService'
import global from '@/service/global.js'
import loader from '~/components/loader.vue'

export default {
    middleware: 'authenticationGuard',

    components: {
        Multiselect,
        loader,
        VueTimepicker,
    },
    data() {
        return {
            imageFile: '',
            s3URL: '',
            openingTime: {
                hh: '',
                mm: '',
                A: '',
            },
            closingTime: {
                hh: '',
                mm: '',
                A: '',
            },
            formData: {
                id: global.getStore(),
            },
            websiteLink: '',
            theme_options: ['Skyline Theme', 'Standard Theme', 'Skyline Theme'],
            categories: [],
            SubCategories: [],
            catFound: true,
            description: '',
            loader: true,
            users: [],
            file: null,
            packages: [],
            placeName: '',
            agentId: '',
            message: '',
            oldagent: null,
            storedetails: {
                multipleImages: [],
                name: '',
                category: '',
                subCategory: '',
                contactPerson: '',
                location: {
                    type: '',
                    coordinates: ['', ''],
                },
                openingTime: {},
                closingTime: {},
                agent: null,
                agentId: '',
            },
            center: { lat: 45.508, lng: -73.587 },
            markers: [],
            places: [],
            currentPlace: null,
            checkCoordinates: false,
        }
    },
    validations: {
        storedetails: {
            name: {
                required,
            },
            category: {
                required,
            },
            description: {
                required,
            },
            contactPerson: {
                required,
            },
            location: {
                required,
            },
            openingTime: {
                hh: { required },
                mm: { required },
                A: { required },
            },
            closingTime: {
                hh: { required },
                mm: { required },
                A: { required },
            },
        },
    },
    created() {
        this.getOneStore()
        this.getAllCategory()
    },
    mounted() {
        this.geolocate()
    },
    methods: {
        // receives a place object via the autocomplete component
        setPlace(place) {
            this.currentPlace = place
            this.placeName = place.name + ', ' + place.formatted_address
        },
        addMarker() {
            if (this.currentPlace) {
                const marker = {
                    lat: this.currentPlace.geometry.location.lat(),
                    lng: this.currentPlace.geometry.location.lng(),
                }
                this.markers = [{ position: marker }]
                this.places.push(this.currentPlace)
                this.center = marker
                this.currentPlace = null
                this.storedetails.location.coordinates[0] = marker.lng
                this.storedetails.location.coordinates[1] = marker.lat
                this.checkCoordinates = true
            }
        },
        getMap(e) {
            if (e) {
                const marker = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                }
                this.markers = [{ position: marker }]
                this.center = marker
                this.currentPlace = null
                this.storedetails.location.coordinates[0] = marker.lng
                this.storedetails.location.coordinates[1] = marker.lat
                const geocoder = new google.maps.Geocoder()
                geocoder.geocode({ location: marker }, (results, status) => {
                    if (status === 'OK') {
                        if (results[0]) {
                            this.placeName = results[0].formatted_address
                        } else {
                            this.placeName = ''
                        }
                    } else {
                        this.placeName = ''
                    }
                })
            }
        },
        geolocate() {
            navigator.geolocation.getCurrentPosition((position) => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
            })
        },
        getOneStore() {
            const accessToken = global.getUser()
            service.getOneStore(this.formData, accessToken, (data) => {
                this.loader = false
                this.storedetails = data.data.store
                this.agentId = data.data.store.agentId
                if (
                    this.storedetails.openingTime &&
                    this.storedetails.closingTime &&
                    this.storedetails.websiteLink
                ) {
                    this.openingTime = this.storedetails.openingTime
                    this.closingTime = this.storedetails.closingTime
                    this.websiteLink = this.storedetails.websiteLink
                }
                if (this.storedetails.category) {
                    this.subCatBasedOnCat(this.storedetails.category)
                }
                if (this.storedetails.agent) {
                    this.oldagent = this.storedetails.agent
                }
                if (this.storedetails.location) {
                    this.checkCoordinates = true
                } else {
                    this.checkCoordinates = false
                    this.storedetails.location = {}
                    this.storedetails.location.type = 'Point'
                    this.storedetails.location.coordinates = ['', '']
                }
            })
        },
        verifyAgentId() {
            const obj = {}
            obj.agentId = this.agentId
            service.verifyAgentId(obj, (response) => {
                if (response.status === 200) {
                    if (response.data.error) {
                        this.message = response.data.error.message
                        if (this.oldagent) {
                            this.storedetails.agent = this.oldagent
                        } else {
                            delete this.storedetails.agent
                        }
                    } else {
                        this.message = ''
                        this.storedetails.agent = response.data.id
                    }
                } else {
                    this.$toaster.error('Technical Issue. Try Again Later')
                }
            })
        },
        onUpdate(storedetails) {
            // if (this.openingTime != '' && this.closingTime != '') {
            //     this.storedetails.openingTime = this.openingTime
            //     this.storedetails.closingTime = this.closingTime
            //     this.storedetails.websiteLink = this.websiteLink
            // }
            this.$v.storedetails.$touch()
            if (this.$v.$invalid) {
                this.$toaster.error('Please fill all the required fields')
            } else if (!this.invalid) {
                this.storedetails.agentId = this.agentId
                if (this.message !== '' && this.agentId) {
                    this.$toaster.error('agentId not match')
                } else {
                    // this.storedetails.openingTime = this.openingTime
                    // this.storedetails.closingTime = this.closingTime
                    this.storedetails.websiteLink = this.websiteLink
                    service.updateStore(this.storedetails, (response) => {
                        if (response.status === 200) {
                            this.$toaster.success('Data Updated Successfully.')
                            this.$router.push('/profile')
                        } else {
                            this.$toaster.error('something went worng')
                        }
                    })
                }
            }
        },
        async getAllCategory() {
            // service.getAll({}, (response) => {
            //     if (response.status === 200) {
            //         this.categories = response.data.getAllCategory
            //     } else {
            //         this.categories = []
            //     }
            // })
            console.log('IN')
            try {
                const data = {}
                const result = await service.getAllCategoryList(data)
                if (result.status === 200) {
                    this.categories = result.data.getAllCategory
                }
            } catch (error) {
                console.log(error)
            }
        },
        subCatBasedOnCat(categoryData) {
            const obj = {
                category: categoryData._id,
            }
            service.callApiWithData(obj, (response) => {
                if (response.status === 200) {
                    this.SubCategories = response.data
                    this.catFound = false
                } else {
                    this.SubCategories = []
                    this.catFound = false
                }
            })
        },
        onFileChange(fileName, fileList) {
            const fileArray = []
            // Convert from fileList to array

            for (let i = 0; i < fileList.length; i += 1) {
                fileArray.push(fileList[i])
            }

            const newImages = fileArray.map((imageFile, index) => ({
                imageFile,
                imageURL: URL.createObjectURL(imageFile),
                name: imageFile.name,
                key: `${new Date().getTime()}-${index}`,
            }))

            for (let i = 0; i < newImages.length; i += 1) {
                this.imageFile = newImages[i].imageFile

                this.onMultipleImage(this.imageFile)
            }
        },
        onMultipleImage() {
            service.awsPhotoUpload(this.imageFile, (awsResponse) => {
                if (awsResponse.status === 200) {
                    this.s3URL = awsResponse.data.file

                    this.storedetails.multipleImages.push(this.s3URL)
                } else {
                    this.$toaster.error('Image Not Saved')
                }
            })
        },
        remove(index) {
            if (this.storedetails.multipleImages != null) {
                this.storedetails.multipleImages.splice(index, 1)
                this.file.splice(index, 1)
            }
            console.log('hejf')
        },
        onImage(file) {
            service.awsPhotoUpload(file, (awsResponse) => {
                if (awsResponse.status === 200) {
                    this.storedetails.images = awsResponse.data.file
                    this.$toaster.success('Image Save')
                } else {
                    this.$toaster.error('Image Not Save')
                    this.storedetails.logo = ''
                }
            })
        },
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.multiselect__placeholder {
    color: #495057;
}
.multiselect {
    min-height: calc(1.5em + 0.5rem + 2px);
}
.multiselect__select {
    right: 0.8px;
    height: 31px;
    top: 0;
    border-right: 1px solid #ced4da;
    border-top: 1px solid #ced4da;
    border-bottom: 1px solid #ced4da;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    &:before {
        top: 77%;
    }
}
.multiselect__single,
.multiselect__input {
    padding: 3px 0;
    margin-bottom: 0;
}
.multiselect__tags {
    height: calc(1.5em + 0.5rem + 2px);
    min-height: calc(1.5em + 0.5rem + 2px);
    padding: 0 40px 0 14px;
    border: 1px solid #ced4da;
}
.update-store-section {
    .store {
        .add-image-section {
            width: 120px;
            height: 100px;
            border: 2px solid $light-grey;
            .add-image {
                width: 100%;
                height: 100%;
            }
        }
    }
    .form-group {
        label {
            font-size: $font-14;
        }
        input,
        textarea::placeholder {
            font-size: $font-12;
        }
    }
    .place-cross-on-topright {
        top: -14px;
        right: -14px;
        padding: 0px 5px;
        line-height: 1.4;
        width: 22px;
        height: 22px;
        border: 1px solid $white;
        border-radius: 50%;
        background: $black;
    }
}
</style>
