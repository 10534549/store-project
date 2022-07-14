<template>
    <div class="offerPart">
        <div class="sidenav-part template main-content">
            <div class="heading-sec">
                <div class="row">
                    <div class="col-md-4 column">
                        <div class="heading-profile">
                            <h2>Create Product</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel-content mr-2 mt-2 mb-2 ml-2">
                <div class="row">
                    <div class="col-md-12">
                        <div class="widget">
                            <div class="form-elements-sec">
                                <div class="form-body">
                                    <form
                                        novalidate="true"
                                        name="productDetails"
                                        class="formPart text-left"
                                        @reset.prevent="resetForm()"
                                        @submit.prevent="submitForm()"
                                    >
                                        <!-- Store -->

                                        <div class="form-group">
                                            <label for="productName"
                                                >Name </label
                                            ><span class="error-txt">*</span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="productName"
                                                placeholder="Enter Name"
                                                v-model.trim="
                                                    productDetails.name
                                                "
                                                required
                                            />
                                            <div
                                                class="error-txt"
                                                v-if="
                                                    !$v.productDetails.name
                                                        .required &&
                                                    $v.productDetails.name
                                                        .$error
                                                "
                                            >
                                                Name is required
                                            </div>
                                        </div>

                                        <!-- Points -->

                                        <div class="form-group">
                                            <label for="productPoints"
                                                >₹
                                            </label>
                                            <span class="error-txt">*</span>
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="productPoints"
                                                min="0"
                                                placeholder="Enter ₹"
                                                v-model.trim="
                                                    productDetails.productPoints
                                                "
                                                required
                                            />
                                            <div
                                                class="error-txt"
                                                v-if="
                                                    !$v.productDetails
                                                        .productPoints
                                                        .required &&
                                                    $v.productDetails
                                                        .productPoints.$error
                                                "
                                            >
                                                ₹ is required
                                            </div>
                                        </div>

                                        <div
                                            :class="{
                                                'form-group--error':
                                                    $v.productDetails.category
                                                        .$error,
                                            }"
                                        >
                                            <b-form-group>
                                                <div>
                                                    <label for="Categories">
                                                        Categories
                                                        <span class="error-txt"
                                                            >*</span
                                                        >
                                                    </label>
                                                </div>
                                                <multiselect
                                                    v-model="
                                                        productDetails.category
                                                    "
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
                                                            productDetails.category,
                                                        )
                                                    "
                                                >
                                                    <template
                                                        slot="_id"
                                                        slot-scope="{ option }"
                                                    >
                                                        <strong>{{
                                                            option.name
                                                        }}</strong>
                                                    </template>
                                                </multiselect>
                                                <div
                                                    v-if="
                                                        $v.productDetails
                                                            .category.$touch &&
                                                        $v.productDetails
                                                            .category.$error
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
                                                <span class="error-txt">*</span>
                                            </div>
                                            <multiselect
                                                v-model="
                                                    productDetails.subCategory
                                                "
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
                                                    <strong>{{
                                                        option.name
                                                    }}</strong>
                                                </template>
                                            </multiselect>
                                            <div
                                                v-if="
                                                    $v.productDetails
                                                        .subCategory.$touch &&
                                                    $v.productDetails
                                                        .subCategory.$error
                                                "
                                                class="error-txt"
                                            >
                                                Subcategory is required
                                            </div>
                                        </b-form-group>

                                        <!-- Desccription -->
                                        <div class="form-group">
                                            <label for="description"
                                                >Description </label
                                            ><span class="error-txt">*</span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="description"
                                                placeholder="Enter Product Description"
                                                v-model.trim="
                                                    productDetails.description
                                                "
                                                required
                                            />
                                            <!-- <tinymce
                                                id="description"
                                                v-model="
                                                    productDetails.description
                                                "
                                                required
                                            ></tinymce> -->
                                            <div
                                                class="error-txt"
                                                v-if="
                                                    !$v.productDetails
                                                        .description.required &&
                                                    $v.productDetails
                                                        .description.$error
                                                "
                                            >
                                                Description is required
                                            </div>
                                        </div>

                                        <!-- images -->
                                        <div class="mb-3">
                                            <div
                                                class="
                                                    mt-4
                                                    pt-2
                                                    d-flex
                                                    justify-content-between
                                                    align-items-center
                                                "
                                            >
                                                <label class="mb-0">
                                                    Images
                                                    <span class="error-txt"
                                                        >*</span
                                                    >
                                                    <small
                                                        >(Browse it, Upload it
                                                        and Select
                                                        it)(570px/500px)</small
                                                    >
                                                </label>
                                                <b-button
                                                    v-if="!hideAddImage"
                                                    type="button"
                                                    variant="success"
                                                    class="px-5"
                                                    accept="image/jpeg, image/png, image/gif"
                                                    @click="Addbox()"
                                                    >Add Image</b-button
                                                >
                                            </div>
                                            <div
                                                class="
                                                    mb-3
                                                    pb-2
                                                    pt-1
                                                    text-right
                                                "
                                            >
                                                <label class="mb-0">
                                                    <small>
                                                        <b v-if="!hideAddImage"
                                                            >**Click Add Image
                                                            to add more
                                                            images</b
                                                        >
                                                    </small>
                                                </label>
                                            </div>
                                            <div class="mb-2">
                                                <div
                                                    class="row mb-2"
                                                    v-for="(
                                                        singleImage, index
                                                    ) in productDetails.images"
                                                    :key="index"
                                                >
                                                    <div class="col-md-11">
                                                        <!-- <b-input-group>
                              <b-form-input
                                aria-label="Text input with checkbox"
                                id="storeTheme"
                                v-model="singleImage.image"
                              ></b-form-input>
                              <b-input-group-prepend is-text>
                                <b-form-checkbox
                                  v-model="singleImage.showImage"
                                  switch
                                  @input="changeShowImage(singleImage.showImage, index)"
                                  class="mr-n2"
                                >
                                  <span class="sr-only">Switch for following text input</span>
                                </b-form-checkbox>
                              </b-input-group-prepend>
                            </b-input-group>-->
                                                        <b-input-group
                                                            class="input-group"
                                                        >
                                                            <b-form-file
                                                                v-model="file"
                                                                placeholder="Choose a file..."
                                                                ref="file"
                                                                drop-placeholder="Drop file here..."
                                                                accept="image/jpeg, image/png, image/gif"
                                                                @input="
                                                                    onImage(
                                                                        file,
                                                                        index,
                                                                    )
                                                                "
                                                            ></b-form-file>
                                                            <!-- <b-input-group-append>
                                <b-button class="career-btn" v-on:click="onImage(file, index)"
                                  >Upload</b-button
                                >
                              </b-input-group-append> -->
                                                            <b-input-group-prepend
                                                                is-text
                                                            >
                                                                <b-form-checkbox
                                                                    v-model="
                                                                        singleImage.showImage
                                                                    "
                                                                    switch
                                                                    @input="
                                                                        changeShowImage(
                                                                            singleImage.showImage,
                                                                            index,
                                                                        )
                                                                    "
                                                                    class="
                                                                        mr-n2
                                                                    "
                                                                >
                                                                    <span
                                                                        class="
                                                                            sr-only
                                                                        "
                                                                        >Switch
                                                                        for
                                                                        following
                                                                        text
                                                                        input</span
                                                                    >
                                                                </b-form-checkbox>
                                                            </b-input-group-prepend>
                                                        </b-input-group>
                                                        <span
                                                            v-if="
                                                                singleImage.image !=
                                                                ''
                                                            "
                                                        >
                                                            <img
                                                                :src="
                                                                    singleImage.image
                                                                "
                                                                class="pt-2"
                                                                height="100"
                                                            />
                                                        </span>
                                                    </div>
                                                    <div
                                                        class="col-md-1"
                                                        v-if="
                                                            productDetails
                                                                .images.length >
                                                            1
                                                        "
                                                    >
                                                        <b-button
                                                            variant="danger"
                                                            @click="
                                                                removeBox(index)
                                                            "
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                aria-hidden="true"
                                                                role="img"
                                                                width="1em"
                                                                height="1em"
                                                                preserveAspectRatio="xMidYMid meet"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <g
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                                                                    />
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                                    />
                                                                </g>
                                                            </svg>
                                                        </b-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Sequency -->
                                        <div class="form-group">
                                            <label for="sequency"
                                                >Sequency </label
                                            ><span class="error-txt"> *</span>
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="sequency"
                                                min="0"
                                                placeholder="Enter Sequency"
                                                v-model.trim="
                                                    productDetails.sequency
                                                "
                                                required
                                            />
                                            <div
                                                class="error"
                                                v-if="
                                                    !$v.productDetails.sequency
                                                        .required &&
                                                    $v.productDetails.sequency
                                                        .$error
                                                "
                                            >
                                                Sequency is required
                                            </div>
                                        </div>
                                        <!-- Sequency -->
                                        <!-- toggle for enable disable for Status -->
                                        <div>
                                            <label>Status </label
                                            ><span class="error-txt"> *</span>
                                            <div>
                                                <label class="switch">
                                                    <input
                                                        type="checkbox"
                                                        v-model="
                                                            productDetails.preStatus
                                                        "
                                                    />
                                                    <div
                                                        class="slider round"
                                                    ></div>
                                                </label>
                                            </div>
                                        </div>
                                        <!-- button -->
                                        <div class="btnPart text-center">
                                            <button
                                                type="submit"
                                                class="btn btn-success"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="reset"
                                                class="btn btn-danger mx-3"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
let _ = require('lodash')
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import service from '@/service/apiService'
import global from '@/service/global.js'
// import headerCustom from "@/components/Header.vue";

export default {
    middleware: 'authenticationGuard',

    components: {
        // headerCustom,
        Multiselect,
    },
    data() {
        return {
            checkbox: false,
            file: [],
            categories: [],
            SubCategories: [],
            catFound: true,

            productDetails: {
                name: '',
                storeId: '',
                productPoints: '',
                category: '',
                subCategory: '',
                description: '',
                sequency: 0,
                images: [
                    {
                        showImage: false,
                        image: '',
                    },
                ],
                preStatus: true,
                status: 'Enable',
                verifiedStatus: false,
            },
            hideAddImage: false,
        }
    },
    validations: {
        productDetails: {
            name: {
                required,
            },
            productPoints: {
                required,
            },
            category: {
                required,
            },
            subCategory: {
                required,
            },
            description: {
                required,
            },
            sequency: {
                required,
            },
        },
    },
    created() {
        const id = global.getStore()
        this.productDetails.storeId = id
        this.getAllCategory()
    },
    methods: {
        /**
         * this is use for save button
         */
        submitForm() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
                this.$toaster.error('Please fill the form correctly.')
            } else {
                this.saveData()
            }
        },
        /**
         * this method use for cancel button
         */

        resetForm() {
            this.$router.push('/products')
        },

        onImage(file, index) {
            service.awsPhotoUpload(file, (awsResponse) => {
                if (awsResponse.status === 200) {
                    this.productDetails.images[index].image =
                        awsResponse.data.file
                    this.$toaster.success('Image Save')
                } else {
                    this.$toaster.danger('Image Not Save')
                    this.productDetails.images[index].image = ''
                }
            })
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

        /**
         * saveData
         */
        saveData() {
            if (this.productDetails.preStatus === true) {
                this.productDetails.status = 'Enable'
            } else {
                this.productDetails.status = 'Disable'
            }
            this.productDetails.productPoints = parseInt(
                this.productDetails.productPoints,
                10,
            )
            this.productDetails.sequency = parseInt(
                this.productDetails.sequency,
                10,
            )
            const showImage = _.findIndex(this.productDetails.images, [
                'showImage',
                true,
            ])
            if (showImage === -1) {
                this.$toaster.error('One Image should be selected.')
            } else {
                if (this.productDetails.images.length >= 1) {
                    this.productDetails.images = _.filter(
                        this.productDetails.images,
                        'image',
                    )
                }
                service.saveProductData(
                    'StoreProduct/',
                    this.productDetails,
                    (response) => {
                        if (response.status === 201) {
                            this.$toaster.success('Product Added Successfully.')
                            this.$router.push('/products')
                        } else {
                            this.$toaster.error('something went worng')
                        }
                    },
                )
            }
        },

        /**
         * this for add input
         */
        Addbox() {
            // console.log(this.productDetails.images.length);
            if (this.productDetails.images.length < 4) {
                if (this.productDetails.images.length === 3) {
                    this.hideAddImage = true
                }
                this.productDetails.images.push({
                    showImage: false,
                    image: '',
                })
            }
        },
        /**
         * this for remove input
         */
        removeBox(index) {
            if (this.productDetails.images.length === 4) {
                this.hideAddImage = false
            }
            this.productDetails.images.splice(index, 1)
        },

        changeShowImage(data, index) {
            if (data) {
                if (this.productDetails.images.length > 1) {
                    this.$.forEach(this.productDetails.images, (value, key) => {
                        const values = value
                        const keys = key
                        if (keys !== index) {
                            values.showImage = false
                        }
                    })
                }
            }
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
</style>
