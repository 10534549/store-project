<template>
    <div class="create-offer-section">
        <div class="create-offer-btn">
            <b-button
                id="shadow-none"
                class="btn-sm px-3 bg-light-green shadow-none"
                pill
                @click="openModal()"
                >Create Offer</b-button
            >
        </div>
        <b-modal
            id="update-modal"
            ref="modal"
            title="Profile Incomplete"
            size="md"
            hide-footer
            no-enforce-focus
        >
            <b-form ref="form" name="offer">
                <div>
                    <b-form-group>
                        <div>
                            <!-- <label for="reason"
                                >Profile is incomplete
                            </label> -->
                            <div>Update Your Profile to create new Offers.</div>
                        </div>
                        <div class="border-top mt-3">
                            <b-button
                                size="sm"
                                class="shadow-none bg-navy-blue px-3 mt-2 text-white"
                                type="button"
                                @click="updateProfile()"
                                >Update</b-button
                            >
                        </div>
                    </b-form-group>
                </div>
            </b-form>
        </b-modal>
        <!-- Package Expired Modal -->
        <b-modal
            id="package-expiry-modal"
            ref="modal"
            title="Package Expired"
            size="md"
            hide-footer
            no-enforce-focus
        >
            <b-form ref="form" name="offer">
                <div>
                    <b-form-group>
                        <div>
                            <!-- <label for="reason"
                                >Your Package has Expired.
                            </label> -->
                            <div>Update Your package to create new Offers.</div>
                        </div>
                        <div class="border-top mt-3">
                            <b-button
                                size="sm"
                                class="shadow-none bg-navy-blue px-3 mt-2 text-white"
                                type="button"
                                @click="updateProfile()"
                                >Update</b-button
                            >
                        </div>
                    </b-form-group>
                </div>
            </b-form>
        </b-modal>
        <!-- End -->
        <b-modal
            id="create-offer-modal"
            ref="modal"
            title="CREATE NEW OFFERS"
            size="lg"
            hide-footer
            no-enforce-focus
            no-close-on-backdrop
            class="padd-top-80"
        >
            <b-form
                ref="form"
                name="offer"
                @reset="onReset"
                @submit.stop.prevent="handleSubmit"
            >
                <div class="create-new-offer-section open-sans-semi-bold">
                    <div
                        :class="{
                            'form-group--error': $v.offer.title.$error,
                        }"
                    >
                        <b-form-group>
                            <div>
                                <label for="title">
                                    Offer Title
                                    <span class="error-txt">*</span>
                                </label>
                            </div>
                            <b-form-input
                                id="title"
                                v-model="offer.title"
                                class="form-control-sm"
                                placeholder="Offer Title"
                            ></b-form-input>
                            <div
                                v-if="
                                    $v.offer.title.$touch &&
                                        $v.offer.title.$error
                                "
                                class="error-txt"
                            >
                                Offer Title is required
                            </div>
                        </b-form-group>
                    </div>
                    <client-only>
                        <b-form-group>
                            <div>
                                <label for="termsAndConditions">
                                    Terms And Conditions
                                </label>
                            </div>
                            <tinymce
                                id="termsAndConditions"
                                v-model="offer.termsAndConditions"
                            ></tinymce>
                        </b-form-group>
                        <div
                            :class="{
                                'form-group--error':
                                    $v.offer.description.$error,
                            }"
                        >
                            <b-form-group>
                                <div>
                                    <label for="description">
                                        Description
                                        <span class="error-txt">*</span>
                                    </label>
                                </div>
                                <tinymce
                                    id="description"
                                    v-model="offer.description"
                                ></tinymce>

                                <div
                                    v-if="
                                        $v.offer.description.$touch &&
                                            $v.offer.description.$error
                                    "
                                    class="error-txt"
                                >
                                    Description is required
                                </div>
                            </b-form-group>
                        </div>
                    </client-only>
                    <div>
                        <client-only>
                            <b-row>
                                <b-col cols="6">
                                    <div
                                        :class="{
                                            'form-group--error':
                                                $v.offer.start.$error,
                                        }"
                                    >
                                        <b-form-group>
                                            <div>
                                                <label for="start">
                                                    Offer Start Date
                                                    <span class="error-txt"
                                                        >*</span
                                                    >
                                                </label>
                                            </div>
                                            <div>
                                                <datepicker
                                                class="picker"
                                                    v-model="offer.start"
                                                    type="date"
                                                    placeholder="Select Start Date"
                                                    :disabled-dates="
                                                        disabledDates
                                                    "
                                                    format="dd/MM/yyyy"
                                                    @input="startDateValidation"
                                                ></datepicker>
                                            </div>

                                            <div
                                                v-if="
                                                    $v.offer.start.$touch &&
                                                        $v.offer.start.$error
                                                "
                                                class="error-txt"
                                            >
                                                Offer Start Date is required
                                            </div>
                                        </b-form-group>
                                    </div>
                                </b-col>
                                <b-col cols="6">
                                    <div
                                        :class="{
                                            'form-group--error':
                                                $v.offer.end.$error,
                                        }"
                                    >
                                        <b-form-group>
                                            <div>
                                                <label for="end">
                                                    Offer End Date
                                                    <span class="error-txt"
                                                        >*</span
                                                    >
                                                </label>
                                            </div>
                                            <div>
                                                <datepicker
                                                class="picker"
                                                    v-model="offer.end"
                                                    type="date"
                                                    placeholder="Select End Date"
                                                    format="dd/MM/yyyy"
                                                    :disabled-dates="
                                                        disabledDates
                                                    "
                                                    @input="lastDateValidation"
                                                ></datepicker>
                                            </div>

                                            <div
                                                v-if="
                                                    $v.offer.end.$touch &&
                                                        $v.offer.end.$error
                                                "
                                                class="error-txt"
                                            >
                                                Offer End Date is required
                                            </div>
                                            <div
                                                v-if="showError"
                                                class="error-txt"
                                            >
                                                {{ message }}
                                            </div>
                                        </b-form-group>
                                    </div>
                                </b-col>
                            </b-row>
                        </client-only>
                    </div>

                    <div class="mb-4">
                        <label for="profileimage">Image (350px/250px)</label>
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
                                    class="career-btn"
                                    size="sm"
                                    @click="onImage(file)"
                                    >Upload</b-button
                                >
                            </b-input-group-append> -->
                        </b-input-group>
                    </div>
                    <div class="mb-4">
                        <label for="profileimage"
                            >Multiple Images (550px/300px)</label
                        >
                        <b-input-group class="input-group">
                            <b-form-file
                                ref="files"
                                v-model="multipleImages"
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
                    </div>
                    <div v-if="offer.multipleImages.length > 0" class="row">
                        <div class="col-md-12">
                            <b-row>
                                <b-col
                                    v-for="(image,
                                    index) in offer.multipleImages"
                                    :key="index"
                                    cols="2"
                                >
                                    <div class="store-multiple">
                                        <div
                                            class="
                                                add-image-section
                                                p-2
                                                mb-3
                                                position-relative
                                            "
                                        >
                                            <b-img
                                                :src="image"
                                                class="img-fluid"
                                                alt="logo"
                                            />
                                            <div
                                                class="
                                                    position-absolute
                                                    place-cross-on-topright
                                                    pointer
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
                        </div>
                    </div>
                    <b-row class="justify-content-center pt-3 py-2 border-top">
                        <div class="create-btn">
                            <b-button
                                type="button"
                                class="
                                    btn
                                    bg-light-green
                                    white
                                    px-4
                                    shadow-none
                                "
                                @click="onCreate(offer)"
                            >
                                Create
                            </b-button>
                        </div>
                        <div class="cancel-btn ml-2">
                            <b-button
                                type="reset"
                                class="btn bg-red  px-4 shadow-none"
                                @click="$bvModal.hide('create-offer-modal')"
                                >Cancel</b-button
                            >
                        </div>
                    </b-row>
                </div>
            </b-form>
        </b-modal>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
// import Datepicker from 'vuejs-datepicker'

import moment from 'moment'
import service from '@/service/apiService'
import global from '@/service/global.js'

export default {
    components:{

    },
    props: {
        offermethod: {
            type: Function,
            default() {
                return () => true
            },
        },
    },
    data() {
        return {
            multipleImages: [],
            imageFile: '',
            s3URL: '',
            showError: false,

            disabledDates: {
                to: new Date(Date.now() - 8640000),
            },
            catFound: true,
            file: null,

            offer: {
                type: 'offer',
                store: {
                    _id: global.getStore(),
                },
                title: '',
                termsAndConditions: '',
                description: '',
                start: '',
                end: '',
                image: '',
                multipleImages: [],
            },
            storeDetails: {},
            pendingOffer: '',
            nowDate: '',
            expiredDate: '',
        }
    },
    validations: {
        offer: {
            title: {
                required,
            },
            description: {
                required,
            },
            start: {
                required,
            },
            end: {
                required,
            },
        },
    },
    created() {
        this.getOneStore()
        const now = moment()
        this.nowDate = now.format('YYYY-MM-DD')
    },
    methods: {
        startDateValidation() {
            if (this.offer.end) {
                this.offer.end = ''
            }
        },
        lastDateValidation() {
            if (this.offer.start > this.offer.end) {
                this.showError = true
                this.message =
                    'End date cannot be less than selected start date'
                this.$toaster.error(
                    'End date cannot be less than selected start date',
                )
            } else {
                this.message = ''
            }
        },
        setContent(e) {
            e.setContent({ offer: { termsAndConditions: 'Enter' } })
        },
        onCreate(offer) {
            this.offer.store = global.getStore()
            this.saveData()
        },
        saveData() {
            this.$v.$touch()
            if (this.$v.$invalid) {
            } else if (this.message === '' && !this.$v.$invalid) {
                this.offer.type = 'offer'
                service.saveData(this.offer, (response) => {
                    if (response.status === 200) {
                        this.$toaster.success('Offer Created Successfully.')
                        this.$root.$emit(
                            'bv::hide::modal',
                            'create-offer-modal',
                            '#btnShow',
                        )
                        this.offermethod('reset')
                        this.offer = {}
                        this.$v.$reset()
                    } else {
                        this.$toaster.error('something went worng')
                    }
                })
            }
        },
        onImage(file) {
            service.awsPhotoUpload(file, (awsResponse) => {
                if (awsResponse.status === 200) {
                    this.offer.image = awsResponse.data.file
                    this.$toaster.success('Image Save')
                } else {
                    this.$toaster.danger('Image Not Save')
                    this.offer.image = ''
                }
            })
        },
        onCancel() {
            this.offer = ''
        },
        getOneStore() {
            service.getOneStore(
                {
                    id: global.getStore(),
                },
                global.getUser(),
                (data) => {
                    this.storeDetails = data.data.store
                    this.pendingOffer = data.data.pendingOffers
                    this.expiredDate = this.storeDetails.packageExpiry
                },
            )
        },
        openModal() {
            const packageExpiryDate = moment(this.expiredDate).format(
                'YYYY-MM-DD',
            )
            if (this.storeDetails.verifiedStatus == true) {
                if (
                    this.storeDetails.category &&
                    packageExpiryDate > this.nowDate
                ) {
                    if (this.pendingOffer === 0) {
                        this.$toaster.error(
                            'Please Update Your package, No. Of Offers Are Over',
                        )
                    } else {
                        this.$bvModal.show('create-offer-modal')
                    }
                } else {
                    if (packageExpiryDate < this.nowDate) {
                        this.$bvModal.show('package-expiry-modal')
                    } else {
                        this.$bvModal.show('update-modal')
                    }
                    this.$toaster.error('Complete Profile or Update package ')
                }
            } else {
                this.$toaster.error(
                    'Your store is not yet verified.Kindly contact with smart offer deal team.',
                )
            }
        },
        updateProfile() {
            const packageExpiryDate = moment(this.expiredDate).format(
                'YYYY-MM-DD',
            )
            if (packageExpiryDate > this.nowDate) {
                this.$router.push('/update-store/' + this.storeDetails._id)
            } else {
                this.$router.push('/profile')
            }
        },
        onFileChange(fileName, fileList) {
            const fileArray = [] // Convert from fileList to array
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
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.offer.title = ''
            this.offer.termsAndConditions = ''
            this.offer.description = ''
            this.offer.start = ''
            this.offer.end = ''
            this.file = ''
            this.offer.multipleImages = ''
        },
        onMultipleImage() {
            service.awsPhotoUpload(this.imageFile, (awsResponse) => {
                if (awsResponse.status === 200) {
                    this.s3URL = awsResponse.data.file
                    this.offer.multipleImages.push(this.s3URL)
                } else {
                    this.$toaster.error('Image Not Saved')
                }
            })
        },
        remove(index) {
            // this.multipleImages[index] = ''
            this.multipleImages.splice(index, 1)
            this.offer.multipleImages.splice(index, 1)
        },
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.picker {
    border: 1px solid;
}
.create-offer-section {
    .create-offer-btn {
        .btn-secondary {
            &:hover,
            &:focus {
                color: $white;
                background-color: $light-green;
                border-color: $light-green;
            }
        }
    }
    .create-new-offer-section {
        .form-group {
            label {
                font-size: $font-14;
            }
            input,
            textarea::placeholder {
                font-size: $font-12;
            }
            .custom-file-label {
                border-color: $active-grey;
            }
        }
    }
}
</style>
