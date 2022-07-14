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
                        <label class="typo__label">Category:*</label>
                        <multiselect
                            v-model="OfferDetails.category"
                            deselect-label="Can't remove this value"
                            track-by="_id"
                            name="_id"
                            label="name"
                            placeholder="Select one"
                            :options="stores"
                            :searchable="true"
                            :allow-empty="false"
                            required
                        >
                            <template slot="_id" slot-scope="{ option }">
                                <strong>{{ option.name }}</strong>
                            </template>
                        </multiselect>

                        <div
                            v-if="
                                !$v.OfferDetails.store.required &&
                                $v.OfferDetails.store.$error
                            "
                            class="error"
                        >
                            Category is required
                        </div>
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
                                :value="option"
                                v-for="option in optiontype"
                                v-bind:key="option"
                            >
                                {{ option | capitalize }}
                            </option>
                        </b-form-select>
                        <div
                            class="error"
                            v-if="
                                !$v.OfferDetails.type.required &&
                                $v.OfferDetails.type.$error
                            "
                        >
                            Type is required
                        </div>
                    </div>

                    <!-- Title -->
                    <div>
                        <div class="form-group">
                            <label for="title">Title:*</label>
                            <input
                                type="text"
                                class="form-control"
                                id="title"
                                placeholder="Enter title"
                                v-model.trim="OfferDetails.title"
                                required
                            />
                            <div
                                class="error"
                                v-if="
                                    !$v.OfferDetails.title.required &&
                                    $v.OfferDetails.title.$error
                                "
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
                        <label for="profileimage">Image:*(350px/250px)</label>
                        <b-input-group class="input-group">
                            <b-form-file
                                v-model="file"
                                placeholder="Choose a file..."
                                ref="file"
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

                    <!-- Multiple Image -->
                    <div class="col-md-12">
                        <b-row>
                            <label for="multipleImages"
                                >Multiple Images:(550px/300px)</label
                            >
                        </b-row>
                    </div>

                    <div class="form-group">
                        <b-form-group>
                            <b-input-group class="input-group">
                                <b-form-file
                                    ref="file"
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
                        </b-form-group>
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
                                            alt="logo"
                                            class="add-image pt-2"
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
                    </div>

                    <!-- MRP -->

                    <div>
                        <div class="form-group">
                            <label for="mrp">MRP:*</label>
                            <input
                                type="text"
                                class="form-control"
                                id="mrp"
                                placeholder="Enter MRP"
                                v-model.trim="OfferDetails.mrp"
                                required
                            />
                            <div
                                class="error"
                                v-if="
                                    !$v.OfferDetails.title.required &&
                                    $v.OfferDetails.title.$error
                                "
                            >
                                MRP is required
                            </div>
                        </div>
                    </div>

                    <!-- Discount -->
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
                                        <input
                                            type="radio"
                                            name="radio"
                                            :checked="checked == true"
                                        />
                                        <span
                                            class="checkmark"
                                            @click="price()"
                                        ></span>
                                    </label>
                                </div>
                                <div class="pl-5">
                                    <label class="checkbox-container">
                                        Percentage
                                        <input
                                            type="radio"
                                            name="radio"
                                            :checked="checked1 == true"
                                        />
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
                                    v-model="OfferDetails.price"
                                    type="text"
                                    name="indianRupees"
                                    class="form-control-sm"
                                    placeholder="Indian Rupees"
                                    required
                                ></b-form-input>
                            </div>
                            <div v-if="showPercentage" class="pt-2">
                                <b-form-input
                                    id="percentage"
                                    v-model="OfferDetails.percentage"
                                    type="text"
                                    name="percentage"
                                    class="form-control-sm"
                                    placeholder="Percentage"
                                    required
                                ></b-form-input>
                            </div>
                        </b-form-group>
                    </div>

                    <!-- Start Date -->
                    <div class="form-group mydate-content">
                        <label for="dob">Start Date:*</label>
                        <datepicker
                            class="picker"
                            v-model="OfferDetails.start"
                            required
                        ></datepicker>
                    </div>
                    <!-- End Date -->
                    <div class="form-group mydate-content">
                        <label for="dob">End Date:*</label>
                        <datepicker
                            class="picker"
                            v-model="OfferDetails.end"
                            required
                        ></datepicker>
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
            title: 'Edit Deal',
            multipleImages: [],
            imageFile: '',
            s3URL: '',
            file: [],
            showPrice: false,
            showPercentage: false,
            disabled: 0,
            stores: [],
            categories: [],
            SubCategories: [],
            optiontype: ['offer', 'deal'],
            optionsVerify: [''],
            checkbox: false,
            storeId: '',
            checked: false,
            checked1: false,

            OfferDetails: {
                multipleImages: [],
                store: '',
                type: '',
                title: '',
                image: '',
                price: '',
                percentage: '',
            },
        }
    },
    validations: {
        OfferDetails: {
            store: {
                required,
            },
            type: {
                required,
            },
            title: {
                required,
            },
        },
    },
    created() {
        this.getOneOffer()
    },

    methods: {
        /**
         * this is use for save button
         */
        price() {
            // console.log("price click");
            this.showPrice = true
            this.showPercentage = false
            this.OfferDetails.percentage = ''
        },
        percentage() {
            // console.log("percentage click");
            this.OfferDetails.price = ''
            this.showPrice = false
            this.showPercentage = true
        },
        submitForm() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
                this.$toaster.error('Please fill the form correctly.')
            } else {
                this.OfferDetails.store = this.OfferDetails.store._id
                this.updateSingle()
            }
        },
        /**
         * this method use for cancel button
         */
        resetForm() {
            this.$router.push({ name: 'offers-list' })
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
                console.log('this.imageFile', this.imageFile)

                this.onMultipleImage(this.imageFile)
            }
        },
        onMultipleImage() {
            service.awsPhotoUpload(this.imageFile, (awsResponse) => {
                console.log('awsResponse', awsResponse)
                if (awsResponse.status === 200) {
                    this.s3URL = awsResponse.data.file
                    console.log('this.s3URL', this.s3URL)
                    console.log(typeof 'this.OfferDetails.multipleImages')

                    this.OfferDetails.multipleImages.push(this.s3URL)
                    console.log(
                        'this.OfferDetails.multipleImages',
                        this.OfferDetails.multipleImages,
                    )
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
        /**
         * update sigle offer
         */
        updateSingle() {
            const storeId = this.OfferDetails.store._id
            this.OfferDetails.store = storeId
            // console.log("this.OfferDetails", this.OfferDetails);
            service.updateSingle(
                this.OfferDetails,
                this.$route.params.dealId,
                (response) => {
                    if (response.status === 200) {
                        this.$toaster.success('Form Submitted Successfully.')
                        this.$router.push({ name: 'my-deals' })
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
            service.getOneData(
                'Offers',
                this.$route.params.dealId,
                (response) => {
                    if (!_.isEmpty(response)) {
                        this.OfferDetails = response.data
                        console.log('this.OfferDetails', this.OfferDetails)
                        if (this.OfferDetails.multipleImages) {
                            this.OfferDetails.multipleImages =
                                response.data.multipleImages
                        } else {
                            this.OfferDetails.multipleImages = []
                        }
                        if (this.OfferDetails.percentage) {
                            this.showPercentage = true
                            this.checked1 = true
                            this.checked = false
                        } else if (this.OfferDetails.price) {
                            this.showPrice = true
                            this.checked = true
                            this.checked1 = false
                        }
                        this.OfferDetails.start = moment(
                            response.data.start,
                        ).format('DD-MMM-YYYY')
                        this.OfferDetails.end = moment(
                            response.data.end,
                        ).format('DD-MMM-YYYY')
                        this.storeId = response.data.store._id
                        this.getCatByStoreId(this.storeId)
                    } else {
                        this.OfferDetails = {}
                    }
                },
            )
        },

        getCatByStoreId(storeId) {
            // console.log("storeId", storeId);
            service.getCatByStoreId(storeId, (response) => {
                if (!_.isEmpty(response)) {
                    this.categories = response.data.category
                    // console.log("this.categories", this.categories);
                    if (this.categories) {
                        this.SubCatData(this.categories._id)
                    } else {
                        this.categories = {}
                    }
                }
            })
        },
        SubCatData(catId) {
            // console.log("catId", catId);
            this.$service.SubCatData(catId, (response) => {
                if (!_.isEmpty(response)) {
                    this.SubCategories = response.data
                    // console.log("this.SubCategories", this.SubCategories);
                } else {
                    this.SubCategories = {}
                }
            })
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
