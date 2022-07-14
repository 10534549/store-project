<template>
    <div class="create-deal-section">
        <div class="create-deal-btn">
            <b-button
                id="show-btn"
                class="btn-sm px-3 bg-light-green shadow-none"
                pill
                @click="openModal()"
                >Create Deal</b-button
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
                            <div>Update Your Profile to create new Deals</div>
                        </div>
                        <div class="border-top mt-3">
                            <b-button
                                size="sm"
                                class="shadow-none bg-orange px-3 mt-2 white--text"
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
                            <div>Update Your package to create new Deals.</div>
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
            id="create-deal-modal"
            ref="modal"
            title="CREATE NEW DEALS"
            size="lg"
            hide-footer
            no-enforce-focus
            no-close-on-backdrop
        >
            <b-form
                ref="form"
                name="deal"
                @reset="onReset"
                @submit.stop.prevent="handleSubmit"
            >
                <div class="create-new-deal-section open-sans-semi-bold">
                    <div
                        :class="{
                            'form-group--error': $v.deal.title.$error,
                        }"
                    >
                        <b-form-group>
                            <div>
                                <label for="title">
                                    Product Name
                                    <span class="error-txt">*</span>
                                </label>
                            </div>

                            <b-form-input
                                id="title"
                                v-model="deal.title"
                                class="form-control-sm"
                                placeholder="Product Name"
                            ></b-form-input>
                            <div
                                v-if="
                                    $v.deal.title.$touch && $v.deal.title.$error
                                "
                                class="error-txt"
                            >
                                Product Name is required
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
                                ref="tm"
                                v-model="deal.termsAndConditions"
                            ></tinymce>
                        </b-form-group>
                        <div
                            :class="{
                                'form-group--error': $v.deal.description.$error,
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
                                    ref="tm"
                                    v-model="deal.description"
                                ></tinymce>

                                <div
                                    v-if="
                                        $v.deal.description.$touch &&
                                            $v.deal.description.$error
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
                                                $v.deal.start.$error,
                                        }"
                                    >
                                        <b-form-group>
                                            <div>
                                                <label for="start">
                                                    Start Date
                                                    <span class="error-txt"
                                                        >*</span
                                                    >
                                                </label>
                                            </div>
                                            <div>
                                                <datepicker
                                                    v-model="deal.start"
                                                    class="picker"
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
                                                    $v.deal.start.$touch &&
                                                        $v.deal.start.$error
                                                "
                                                class="error-txt"
                                            >
                                                Start Date is required
                                            </div>
                                        </b-form-group>
                                    </div>
                                </b-col>
                                <b-col cols="6">
                                    <div
                                        :class="{
                                            'form-group--error':
                                                $v.deal.end.$error,
                                        }"
                                    >
                                        <b-form-group>
                                            <div>
                                                <label for="end">
                                                    End Date
                                                    <span class="error-txt"
                                                        >*</span
                                                    >
                                                </label>
                                            </div>
                                            <div>
                                                <datepicker
                                                    v-model="deal.end"
                                                    class="picker"
                                                    type="date"
                                                    :min="deal.end"
                                                    placeholder="Select End Date"
                                                    format="dd/MM/yyyy"
                                                    :disabled-dates="
                                                        disabledEndDates
                                                    "
                                                    @input="lastDateValidation"
                                                ></datepicker>
                                            </div>

                                            <div
                                                v-if="
                                                    $v.deal.end.$touch &&
                                                        $v.deal.end.$error
                                                "
                                                class="error-txt"
                                            >
                                                End Date is required
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
                    <div>
                        <b-form-group>
                            <div>
                                <label for="mrp">
                                    Mrp
                                    <span class="error-txt">*</span>
                                </label>
                            </div>
                            <b-input-group>
                                <b-form-input
                                    v-model="deal.mrp"
                                    type="number"
                                    placeholder="Indian Rupees"
                                ></b-form-input>
                                <template v-slot:append>
                                    <b-dropdown
                                        no-caret
                                        text="INR"
                                        class="inr-section"
                                    >
                                    </b-dropdown>
                                </template>
                            </b-input-group>
                            <div
                                v-if="$v.deal.mrp.$touch && $v.deal.mrp.$error"
                                class="error-txt"
                            >
                                Mrp is required
                            </div>
                        </b-form-group>
                    </div>
                    <div>
                        <b-form-group>
                            <div>
                                <label for="discountedIn">
                                    Discounted In
                                </label>
                            </div>
                            <div class="d-flex">
                                <div>
                                    <label class="checkbox-container">
                                        Price
                                        <input type="radio" name="radio" />
                                        <span
                                            class="checkmark"
                                            @click="price()"
                                        ></span>
                                    </label>
                                </div>
                                <div class="pl-5">
                                    <label class="checkbox-container">
                                        Percentage
                                        <input type="radio" name="radio" />
                                        <span
                                            class="checkmark"
                                            @click="percentage()"
                                        ></span>
                                    </label>
                                </div>
                            </div>
                            <div v-if="showPrice" class="pt-2">
                                <b-form-input
                                    id="indianRupees"
                                    v-model="deal.price"
                                    type="number"
                                    name="indianRupees"
                                    class="form-control-sm"
                                    placeholder="Indian Rupees"
                                    required
                                ></b-form-input>
                            </div>
                            <div v-if="showPercentage" class="pt-2">
                                <b-form-input
                                    id="percentage"
                                    v-model="deal.percentage"
                                    type="number"
                                    name="percentage"
                                    class="form-control-sm"
                                    placeholder="Percentage"
                                    required
                                ></b-form-input>
                            </div>
                        </b-form-group>
                    </div>
                    <div class="mb-4">
                        <div class="modal-title text-uppercase ">
                            Image<span
                                style="color:black;font-size:15px;font-weight
                            "
                                >(350px/250px)</span
                            >
                        </div>
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

                    <!-- Multiple Image -->
                    <!-- <b-row>
                        <div class="modal-title text-uppercase p-3">
                            Multiple Images
                            <span
                                style="color:black;font-size:15px;font-weight
                            "
                                >(550px/300px)</span
                            >
                        </div>
                    </b-row>
                    <b-row>
                        <b-col
                            v-for="(image, index) in deal.multipleImages"
                            :key="index"
                            cols="2"
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
                                        class="add-image pt-2"
                                        height="100"
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
                    <b-row>
                        <b-col lg="6" md="6" sm="12">
                            <div class="add-photos-section">
                                <b-form-group>
                                    <b-input-group class="input-group">
                                        <b-form-file
                                            ref="file"
                                            v-model="file"
                                            multiple
                                            placeholder="Choose a file..."
                                            accept="image/jpeg, image/png, image/gif"
                                            drop-placeholder="Drop file here..."
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
                    </b-row> -->
                    <div class="mb-4">
                        <label for="profileimage"
                            >Multiple Images (550px/300px)</label
                        >
                        <b-input-group class="input-group">
                            <b-form-file
                                ref="files"
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
                    </div>
                    <div v-if="deal.multipleImages.length > 0" class="row">
                        <div class="col-md-12">
                            <b-row>
                                <b-col
                                    v-for="(image,
                                    index) in deal.multipleImages"
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
                    <!-- end multiple Image -->

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
                                @click="onCreate(deal)"
                                >Create</b-button
                            >
                        </div>
                        <div class="cancel-btn ml-2">
                            <b-button
                                type="reset"
                                class="btn bg-red  px-4 shadow-none"
                                @click="$bvModal.hide('create-deal-modal')"
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
    components: {
        // Datepicker,
    },
    props: {
        callmethod: {
            type: Function,
            default() {
                return () => true
            },
        },
    },
    data() {
        return {
            imageFile: '',
            s3URL: '',
            showError: false,
            disabledDates: {
                to: new Date(Date.now() - 8640000),
            },
            disabledEndDates: {
                to: new Date(Date.now() - 8640000),
            },
            catFound: true,
            file: 'null',
            showPrice: false,
            showPercentage: false,
            deal: {
                type: 'deal',
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
                mrp: '',
                price: '',
                percentage: '',
            },
            storeDetails: {},
            pendingDeal: '',
            nowDate: '',
            expiredDate: '',
        }
    },
    validations: {
        deal: {
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
            mrp: {
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
        onCreate(deal) {
            this.deal.store = global.getStore()
            this.saveData()
        },
        startDateValidation() {
            if (this.deal.end) {
                this.deal.end = ''
            }
        },
        lastDateValidation() {
            if (this.deal.start > this.deal.end) {
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
        saveData() {
            this.$v.$touch()
            if (this.$v.$invalid) {
            } else if (this.message === '' && !this.$v.$invalid) {
                service.saveData(this.deal, (response) => {
                    this.deal.type = 'deal'
                    if (response.status === 200) {
                        this.$toaster.success('Deal Created Successfully.')
                        this.$root.$emit(
                            'bv::hide::modal',
                            'create-deal-modal',
                            '#btnShow',
                        )
                        this.callmethod('reset')
                        this.deal = {}
                        this.showPrice = false
                        this.showPercentage = false
                        this.$v.$reset()
                    } else {
                        this.$toaster.error('something went worng')
                    }
                })
            }
        },
        onCancel() {
            this.deal = ''
        },
        onImage(file) {
            service.awsPhotoUpload(file, (awsResponse) => {
                if (awsResponse.status === 200) {
                    this.deal.image = awsResponse.data.file
                    this.$toaster.success('Image Save')
                } else {
                    this.$toaster.error('Image Not Save')
                    this.deal.image = ''
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

                    this.deal.multipleImages.push(this.s3URL)
                } else {
                    this.$toaster.error('Image Not Saved')
                }
            })
        },
        remove(index) {
            this.deal.multipleImages.splice(index, 1)
            this.file.splice(index, 1)
        },
        price() {
            this.showPrice = !this.showPrice
            this.showPercentage = false
            this.deal.percentage = ''
        },
        percentage() {
            this.showPercentage = !this.showPercentage
            this.showPrice = false
            this.deal.price = ''
        },
        getOneStore() {
            service.getOneStore(
                {
                    id: global.getStore(),
                },
                global.getUser(),
                (data) => {
                    this.storeDetails = data.data.store
                    this.pendingDeal = data.data.pendingDeals
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
                    if (this.pendingDeal === 0) {
                        this.$toaster.error(
                            'Please Update Your package, No. Of Deals Are Over',
                        )
                    } else {
                        this.$bvModal.show('create-deal-modal')
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
        onReset(event) {
            this.$bvModal.hide('create-deal-modal')
            event.preventDefault()
            // Reset our form values
            this.deal.title = ''
            this.deal.termsAndConditions = ''
            this.deal.description = ''
            this.deal.start = ''
            this.deal.end = ''
            this.deal.price = ''
            this.deal.percentage = ''
            this.deal.file = ''
            this.deal.multipleImages = ''
            this.deal.mrp = ''
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
    },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.picker {
    border: 1px solid;
}
.dropdown-menu.show {
    display: none;
}
.create-deal-section {
    .create-deal-btn {
        .btn-secondary {
            &:hover,
            &:focus {
                color: $white;
                background-color: $light-green;
                border-color: $light-green;
            }
        }
    }
    .create-new-deal-section {
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
.checkbox-container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.checkbox-container input[type='radio'] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: $light-grey;
}

.checkbox-container:hover input[type='radio'] ~ .checkmark {
    background-color: $active-grey;
}

.checkbox-container input[type='radio']:checked ~ .checkmark {
    background-color: $navy-blue;
}

.checkmark:after {
    content: '';
    position: absolute;
    display: none;
}

.checkbox-container input[type='radio']:checked ~ .checkmark:after {
    display: block;
}
.checkbox-container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid $white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
.inr-section {
    .btn {
        padding: 0.25rem 0.75rem;
        background: $navy-blue;
        .btn-secondary {
            &:hover,
            &:focus {
                background: $navy-blue;
            }
        }
    }
}
</style>
