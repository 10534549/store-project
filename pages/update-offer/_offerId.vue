<template>
    <div class="profile-section main-content padd-top-80">
        <!-- title section start -->
        <div class="title-section pl-4 p-2 border-bottom">
            <div class="title text-uppercase">{{ title }}</div>
        </div>
        <!-- title section end -->
        <!-- store profile section start -->
        <div class="store-profile-content p-3">
            <!-- store plan section start -->
            <b-card class="p-3">
                <form
                    name="OfferDetails"
                    class="formPart text-left"
                    @reset.prevent="resetForm()"
                    @submit.prevent="submitForm()"
                >
                    <!-- Store -->
                    <div class="form-group">
                        <label class="typo__label">Store:</label>
                        <multiselect
                            v-model="OfferDetails.store"
                            deselect-label="Can't remove this value"
                            track-by="_id"
                            name="_id"
                            label="name"
                            placeholder="Select one"
                            :options="stores"
                            :searchable="true"
                            :allow-empty="false"
                            :disabled="disabled == 0"
                        >
                            <template slot="_id" slot-scope="{ option }">
                                <strong>{{ option.name }}</strong>
                            </template>
                        </multiselect>
                        <!-- <div
                        class="error"
                        v-if="!$v.OfferDetails.store.required && $v.OfferDetails.store.$error"
                      >
                        Store is required
                      </div> -->
                    </div>

                    <!-- Category -->
                    <div class="form-group">
                        <label class="typo__label">Category:</label>
                        <multiselect
                            v-model="OfferDetails.category"
                            deselect-label="Can't remove this value"
                            track-by="_id"
                            name="_id"
                            label="name"
                            placeholder="Select one"
                            :options="categories"
                            :searchable="true"
                            :allow-empty="false"
                            :disabled="disabled == 0"
                            required
                        >
                            <template slot="_id" slot-scope="{ option }">
                                <strong>{{ option.name }}</strong>
                            </template>
                        </multiselect>
                    </div>

                    <!-- SubCategory -->
                    <div class="form-group">
                        <label class="typo__label">Sub Category:</label>
                        <multiselect
                            v-model="OfferDetails.subCategory"
                            deselect-label="Can't remove this value"
                            track-by="_id"
                            name="_id"
                            label="name"
                            placeholder="Select one"
                            :options="SubCategories"
                            :searchable="true"
                            :allow-empty="false"
                            :disabled="disabled == 0"
                        >
                            <template slot="_id" slot-scope="{ option }">
                                <strong>{{ option.name }}</strong>
                            </template>
                        </multiselect>
                    </div>

                    <!-- Type -->
                    <div class="form-group">
                        <label for="type">Type:</label>
                        <b-form-select
                            v-model="OfferDetails.type"
                            :disabled="disabled == 0"
                        >
                            <option
                                v-for="option in optiontype"
                                :key="option"
                                :value="option"
                            >
                                {{ option }}
                            </option>
                        </b-form-select>
                        <!-- <div
                        class="error"
                        v-if="!$v.OfferDetails.type.required && $v.OfferDetails.type.$error"
                      >
                        Type is required
                      </div> -->
                    </div>

                    <!-- Title -->
                    <div>
                        <div class="form-group">
                            <label for="title">Title:*</label>
                            <input
                                id="title"
                                v-model.trim="OfferDetails.title"
                                type="text"
                                class="form-control"
                                placeholder="Enter title"
                                required
                            />
                            <div
                                v-if="
                                    !$v.OfferDetails.title.required &&
                                    $v.OfferDetails.title.$invalid
                                "
                                class="error-txt"
                            >
                                Title is required
                            </div>
                        </div>
                    </div>
                    <!-- Content -->
                    <!-- <div>
                      <div class="form-group">
                        <label for="content">Content:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model.trim="OfferDetails.content"
                          id="content"
                          placeholder="Enter content"
                        />
                      </div>
                    </div> -->
                    <!-- Description -->
                    <div class="form-group">
                        <label for="description">Description:*</label>
                        <tinymce
                            id="description"
                            v-model="OfferDetails.description"
                            required
                        ></tinymce>
                        <div
                            v-if="
                                !$v.OfferDetails.description.required &&
                                $v.OfferDetails.description.$invalid
                            "
                            class="error-txt"
                        >
                            Description is required
                        </div>
                    </div>

                    <!-- Terms And Condition -->
                    <div class="form-group">
                        <label for="termcondition">Terms And Condition:</label>
                        <tinymce
                            id="termcondition"
                            v-model="OfferDetails.termsAndConditions"
                        ></tinymce>
                    </div>

                    <!-- Image -->
                    <div class="form-group">
                        <label for="profileimage">Image:(350px/250px)</label>
                        <b-input-group class="input-group">
                            <b-form-file
                                ref="file"
                                v-model="file"
                                placeholder="Choose a file..."
                                drop-placeholder="Drop file here..."
                                @input="onImage(file)"
                                accept="image/jpeg, image/png, image/gif"
                            ></b-form-file>
                            <!-- <b-input-group-append>
                          <b-button class="career-btn" v-on:click="onImage(file)">Upload</b-button>
                        </b-input-group-append> -->
                        </b-input-group>
                        <span
                            v-if="
                                OfferDetails.image && OfferDetails.image != ''
                            "
                        >
                            <img
                                :src="OfferDetails.image"
                                class="pt-2"
                                height="100"
                            />
                        </span>
                    </div>

                    <div class="form-group">
                        <label for="profileimage"
                            >Multiple Image:(550px/300px)</label
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
                        <div
                            v-if="
                                OfferDetails.multipleImages.length >= 0 &&
                                Images.length >= 0
                            "
                            class="row row1"
                        >
                            <div class="col-md-12">
                                <b-row>
                                    <b-col
                                        v-for="(
                                            image, index
                                        ) in OfferDetails.multipleImages"
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
                    </div>
                    <!-- Start Date -->
                    <div class="form-group mydate-content">
                        <label for="dob">Start Date:*</label>
                        <datepicker
                            v-model="OfferDetails.start"
                            class="picker"
                            type="date"
                            placeholder="Select Start Date"
                            :disabled-dates="disabledDates"
                            required
                            @input="startDateValidation"
                        ></datepicker>
                        <div
                            v-if="
                                $v.OfferDetails.start.$touch &&
                                $v.OfferDetails.start.$error
                            "
                            class="error-txt"
                        >
                            Offer Start Date is required
                        </div>
                    </div>
                    <!-- End Date -->
                    <div class="form-group mydate-content">
                        <label for="dob">End Date:*</label>
                        <datepicker
                            v-model="OfferDetails.end"
                            class="picker"
                            type="date"
                            placeholder="Select End Date"
                            :disabled-dates="disabledDates"
                            required
                            @input="lastDateValidation"
                        ></datepicker>
                        <div
                            v-if="
                                $v.OfferDetails.end.$touch &&
                                $v.OfferDetails.end.$error
                            "
                            class="error-txt"
                        >
                            Offer End Date is required
                        </div>
                    </div>
                    <div v-if="showError" class="error-txt">
                        {{ message }}
                    </div>
                    <!-- button -->
                    <div class="btnPart text-center pt-3 border-top">
                        <button type="submit" class="btn btn-success">
                            Save
                        </button>
                        <button type="reset" class="btn btn-danger mx-3">
                            Cancel
                        </button>
                    </div>
                </form>
            </b-card>
        </div>
        <!-- store profile section end -->
        <!-- Loader start  -->
        <!-- loader end  -->
    </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { required } from 'vuelidate/lib/validators'
import moment from 'moment'
import _ from 'lodash'
import service from '@/service/apiService'

export default {
    middleware: 'authenticationGuard',

    components: {
        Datepicker,
        Multiselect,
    },
    data() {
        return {
            showError: false,
            disabledDates: {
                to: new Date(Date.now() - 8640000),
            },
            title: 'edit offer',
            Images: [],
            file: [],
            imageFile: '',
            s3URL: '',
            disabled: 0,
            stores: [],
            categories: [],
            SubCategories: [],
            optiontype: ['offer', 'deal'],
            optionsVerify: [''],
            checkbox: false,
            storeId: '',
            multipleImages: [],
            OfferDetails: {
                multipleImages: [],
                store: '',
                type: '',
                title: '',
                image: '',
            },
            dateFormat: false,
            message: '',
        }
    },
    validations: {
        OfferDetails: {
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
        this.getOneOffer()
    },
    methods: {
        startDateValidation() {
            this.dateFormat = true
            if (this.OfferDetails.end) {
                this.OfferDetails.end = ''
            }
        },
        lastDateValidation() {
            if (this.dateFormat) {
                if (this.OfferDetails.start > this.OfferDetails.end) {
                    this.showError = true
                    this.message =
                        'End date cannot be less than selected start date'
                    this.$toaster.error(
                        'End date cannot be less than selected start date',
                    )
                } else {
                    this.message = ''
                }
            } else {
                const localTime = moment(this.OfferDetails.end).format(
                    'YYYY-MM-DD',
                )
                const proposedDate = localTime + 'T00:00:00.000Z'
                if (this.OfferDetails.start > proposedDate) {
                    this.showError = true
                    this.message =
                        'End date cannot be less than selected start date'
                    this.$toaster.error(
                        'End date cannot be less than selected start date',
                    )
                } else {
                    this.message = ''
                }
            }
        },
        /**
         * this is use for save button
         */
        submitForm() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
                this.$toaster.error('Please fill the form correctly.')
            } else if (this.message === '' && !this.$v.$invalid) {
                this.OfferDetails.store = this.OfferDetails.store._id
                this.updateSingle()
            }
        },
        /**
         * this method use for cancel button
         */
        resetForm() {
            this.$router.push({ name: 'my-offers' })
        },

        /**
         * on Image upload
         */
        onImage(file) {
            service.awsPhotoUpload(file, (awsResponse) => {
                if (awsResponse.status === 200) {
                    this.OfferDetails.image = awsResponse.data.file
                    this.$toaster.success('Image Save')
                } else {
                    this.$toaster.error('Image Not Save')
                    this.OfferDetails.image = ''
                }
            })
        },
        /**
         * update sigle offer
         */
        updateSingle() {
            const storeId = this.OfferDetails.store._id
            this.OfferDetails.store = storeId
            service.updateSingle(
                this.OfferDetails,
                this.$route.params.offerId,
                (response) => {
                    if (response.status === 200) {
                        this.$toaster.success('Form Submitted Successfully.')
                        this.$router.push({ name: 'my-offers' })
                    } else {
                        this.$toaster.error('something went worng')
                    }
                },
            )
        },
        /**
         * getting single offer by _id
         */
        getOneOffer() {
            service.getOneoffer(this.$route.params.offerId, (response) => {
                if (!_.isEmpty(response)) {
                    this.OfferDetails = response.data
                    if (this.OfferDetails.multipleImages) {
                        this.OfferDetails.multipleImages =
                            response.data.multipleImages
                    } else {
                        this.OfferDetails.multipleImages = []
                    }
                    this.storeId = response.data.store._id
                } else {
                    this.OfferDetails = {}
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
                    this.OfferDetails.multipleImages.push(this.s3URL)
                    this.Images = this.OfferDetails.multipleImages
                } else {
                    this.$toaster.error('Image Not Saved')
                }
            })
        },
        remove(index) {
            // this.multipleImages = []
            this.OfferDetails.multipleImages.splice(index, 1)
            this.multipleImages.splice(index, 1)
        },
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.picker {
    border: 1px solid;
}
.row1 {
    margin-top: 2%;
}
.profile-section {
    .store-profile-content {
        .card-body {
            padding: 0px;
            .store-plan-section {
                .store-photo-section {
                    .store-image-section {
                        width: 10%;
                        .store-image {
                            border: 6px solid $light-grey;
                            border-radius: 20px;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .edit-section {
                        .edit {
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }
                .my-plan-section {
                    .update-plan-btn {
                        a {
                            color: $white;
                            &:hover {
                                color: $white;
                                text-decoration: none;
                            }
                        }
                        .btn-secondary {
                            &:hover,
                            &:focus {
                                color: $white;
                                background-color: $navy-blue;
                                border-color: $navy-blue;
                            }
                        }
                        .btn-link a {
                            color: $navy-blue;
                            &:hover {
                                color: $navy-blue;
                                text-decoration: underline;
                            }
                        }
                    }
                }
                .pending-section {
                    .pending {
                        background: $light-grey;
                        .pending-msg {
                            position: relative;
                            top: 8px;
                            left: 8px;
                        }
                    }
                    .top-up-btn {
                        a {
                            color: $white;
                            &:hover {
                                color: $white;
                                text-decoration: none;
                            }
                        }
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
            }
            .store-detail-section {
                .store-title {
                    color: $navy-blue;
                    font-size: $font-18;
                    font-family: $open-sans-bold;
                }
            }
            a {
                color: inherit;
                &:hover {
                    color: inherit;
                    text-decoration: none;
                }
            }
        }
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
.store-multiple {
    .add-image-section {
        // width: 120px;
        // height: auto;
        // overflow: hidden;
        border: 2px solid $light-grey;
        .add-image {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
