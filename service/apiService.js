import axios from 'axios'
import global from '@/service/global.js'
export default {
    login(data, callback) {
        axios
            .post(global.cognitoUrl, {
                type: 'store',
                url: global.cognitoUrlCreateToken,
                redirect_Url: data,
                webSiteType: 'store',
            })
            .then((response) => {
                window.open(response.data, '_self')
                callback(response)
            })
            .catch((error) => {
                callback(error)
            })
    },
    logout(callback) {
        axios({
            method: 'get',
            headers: {},
            url: global.cognitoUrlLogOut,
            body: {},
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getOneUser(data, callback) {
        axios({
            method: 'post',
            url: `${global.adminUrl}User/getuserbyaccesstoken`,
            headers: {
                accessToken: data,
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },

    // getOneStore(data, callback) {
    //     axios
    //         .get(`${global.adminUrl}store/getOneStore/${data}`)
    //         .then((response) => {
    //             callback(response)
    //         })
    //         .catch((e) => {
    //             callback(e)
    //         })
    // },

    getOneStore(data, formData, callback) {
        axios({
            method: 'get',
            url: `${global.adminUrl}store/getOneStore/${data.id}`,
            data: formData,
            headers: {
                accessToken: formData,
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },

    getOneStoreInfo(Id, callback) {
        axios({
            method: 'get',
            url: `${global.adminUrl}Store/getOneStore/${Id}`,
        })
            .then((response) => {
                callback(response.data)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getOneStoreWithFavourite(Id, callback) {
        axios({
            method: 'get',
            url: `${global.adminUrl}Store/getOneStoreWithFavourite/${Id}`,
            headers: {
                accessToken: global.getUser(),
            },
        })
            .then((response) => {
                callback(response.data)
            })
            .catch((e) => {
                callback(e)
            })
    },
    searchWithOutLogin(formData, callback) {
        axios({
            method: 'post',
            url: `${global.adminUrl}Offers/search`,
            data: formData,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getAllHomeOffers(formData, callback) {
        axios({
            method: 'post',
            url: `${global.adminUrl}Offers/search`,
            data: formData,
            headers: {
                accessToken: global.getUser(),
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },

    getAllStoreOffers(data, formData, callback) {
        axios({
            method: 'post',
            url: `${global.adminUrl}Offers/getStoreOffersAndDeals`,
            data: formData,
            headers: {
                accessToken: data,
            },
        })
            .then((response) => {
                callback(response.data)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getAllStoreProducts(data, formData, callback) {
        axios({
            method: 'post',
            url: `${global.adminUrl}StoreProduct/searchInStore`,
            data: formData,
            headers: {
                accessToken: data,
            },
        })
            .then((response) => {
                callback(response.data)
            })
            .catch((e) => {
                callback(e)
            })
    },
    updateStore(data, callback) {
        axios
            .put(`${global.adminUrl}store/${data._id}`, data)
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },

    getAll(data, callback) {
        axios
            .post(`${global.adminUrl}Category/search`)
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getAllCategoryList(data) {
        console.log('IN')
        return axios.post(`${global.adminUrl}Category/search`, data)
    },

    callApiWithData(data, callback) {
        axios
            .post(`${global.adminUrl}SubCategory/getSubCat`, data)
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },

    awsPhotoUpload(data, callback) {
        const bodyFormData = new FormData()
        bodyFormData.append('file', data)
        axios({
            method: 'POST',
            url: `${global.adminUrl1}/api/upload`,

            headers: {
                'content-type':
                    'multipart/form-data boundary=---011000010111000001101001',
            },
            data: bodyFormData,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
        // axios
        //     .post(`${global.adminUrl1}api/upload`, data)
        //     .then((response) => {
        //         callback(response)
        //     })
        //     .catch((e) => {
        //         callback(e)
        //     })
    },
    AllCategory(data, callback) {
        axios
            .post(`${global.adminUrl}Category/searchInStore`, data)
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getAllByFilter(data, formData, callback) {
        axios({
            method: 'post',
            url: `${global.adminUrl}Offers/getStoreOffersAndDeals`,
            data: formData,
            headers: {
                accessToken: data,
            },
        })
            .then((response) => {
                callback(response.data)
            })
            .catch((e) => {
                callback(e)
            })
    },
    saveData: (dataObj, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}Offers/`,
            data: dataObj,
            header: {},
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getTopUpList: (dataObj, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}TopUp/search`,
            data: dataObj,
            header: {},
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getAllTopUpTransactionList: (dataObj, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}Transaction/getTopupTransactionForStore`,
            data: dataObj,
            headers: {
                accessToken: global.getUser(),
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    sendNotification: (dataObj, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}Notification/sentNotificationToStore`,
            data: dataObj,
            headers: {
                accessToken: global.getUser(),
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getTransactionForStore: (data, formData, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}Transaction/getTransactionForStore`,
            data: formData,
            headers: {
                accessToken: data,
            },
        })
            .then((response) => {
                callback(response.data)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getAllProducts: (formData, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}StoreProduct/searchInStore`,
            data: formData,
            // headers: {
            //     accessToken: data,
            // },
        })
            .then((response) => {
                callback(response.data)
            })
            .catch((e) => {
                callback(e)
            })
    },
    topUpPurchase: (dataObj, accesstoken, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}TopUp/topUpPurchase`,
            data: dataObj,
            headers: {
                accessToken: accesstoken,
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    NotificationList: (dataObj, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}Notification/userNotification`,
            data: dataObj,
            headers: {
                accessToken: global.getUser(),
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getOneUserAndNotification: (callback) => {
        axios({
            method: 'get',
            url: `${global.adminUrl}User/getOneUser/user`,
            headers: {
                accessToken: global.getUser(),
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getAllPackage(data, callback) {
        axios
            .post(`${global.adminUrl}Package/search`)
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    updatePlan: (formData, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}Store/updatePackage`,
            data: formData,
            headers: {
                accessToken: global.getUser(),
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getGeofenceHistory: (dataObj, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}Notification/allGeoFenceHistory`,
            data: dataObj,
        })
            .then((response) => {
                callback(response.data)
            })
            .catch((e) => {
                callback(e)
            })
    },
    verifyAgentId: (dataObj, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}User/verifyAgentId`,
            data: dataObj,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    generateInvoiceforDownload: (dataObj, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}Transaction/generateInvoiceforDownload`,
            data: dataObj,
        })
            .then((data) => {
                // const fileName = `${data.data.fileName}`
                // const filePath = `${data.data.filePath}`
                // const blob = new Blob([filePath], {
                //     type: 'application/pdf',
                // })
                // const objectUrl = (
                //     window.URL || window.webkitURL
                // ).createObjectURL(blob)
                // const link = document.createElement('a')
                // link.href = objectUrl
                // link.setAttribute('download', fileName)
                // // document.body.appendChild(link)
                // link.click()
                const fileName = `${data.data.fileName}`
                const filePath = `${data.data.filePath}`
                const link = document.createElement('a')
                link.href = filePath
                link.target = '_blank'
                link.setAttribute('download', fileName)
                link.click()
                callback(data)
            })
            .catch((err) => {
                callback(err)
            })
    },
    seenNotification: (callback) => {
        axios({
            method: 'get',
            url: `${global.adminUrl}Notification/getOneUser/updateUnseenNotification`,
            headers: {
                accessToken: global.getUser(),
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    updateUserByToken(profile, callback) {
        axios({
            method: 'put',
            url: `${global.adminUrl}User/updateUser/byToken`,
            data: profile,
            headers: {
                accessToken: global.getUser(),
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    allTicketinSupport: (email, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}Config/viewAllTickets`,
            data: email,
        })
            .then((response) => {
                callback(response.data)
            })
            .catch((e) => {
                callback(e)
            })
    },
    allChatByIdinSupport: (id, callback) => {
        axios({
            method: 'get',
            url: `${global.adminUrl}Config/viewAllChatsById/${id}`,
        })
            .then((response) => {
                callback(response.data)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getOneoffer: (offerId, callback) => {
        axios({
            method: 'get',
            url: `${global.adminUrl}Offers/${offerId}`,
            headers: {
                accessToken: global.getUser(),
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getOneData: (url, param, callback) => {
        axios({
            method: 'get',
            url: `${global.adminUrl}${url}/${param}`,
            // headers: {
            //     accesstoken: global.getToken(),
            // },
        })
            .then((response) => {
                if (response.status === 200) {
                    callback(response)
                } else if (response.status === 204) {
                    callback()
                }
            })
            .catch((e) => {
                callback(e)
            })
    },
    getOneProd: (id, callback) => {
        axios({
            method: 'get',
            url: `${global.adminUrl}StoreProduct/getOne/${id}`,
            headers: {
                accessToken: global.getUser(),
            },
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    updateSingle: (dataObj, param, callback) => {
        axios({
            method: 'put',
            url: `${global.adminUrl}Offers/${param}`,
            data: dataObj,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    updateProduct: (dataObj, param, callback) => {
        axios({
            method: 'put',
            url: `${global.adminUrl}StoreProduct/${param}`,
            data: dataObj,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    getCatByStoreId: (storeId, callback) => {
        // console.log('storeId', storeId)
        axios({
            method: 'get',
            url: `${global.adminUrl}Store/getCatByStoreId/${storeId}`,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    SubCatData(data, callback) {
        const obj = { category: data }
        // console.log("data", data);
        axios
            .post(`${global.adminUrl}SubCategory/getSubCat`, obj)
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    deleteOffer: (param, callback) => {
        axios({
            method: 'delete',
            url: `${global.adminUrl}Offers/${param}`,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    signUpWeb: (data, callback) => {
        axios({
            method: 'post',
            url: `${global.webUrl}/sign-up-web`,
            data,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },

    storeList: (dataObj, callback) => {
        const obj = dataObj

        // const accessToken = global.getToken()

        return axios

            .post(`${global.adminUrl}Store/searchInBackend`, obj, {
                headers: {
                    // accesstoken: accessToken,
                },
            })

            .then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    callback(response)
                } else if (response.status === 204) {
                    callback([])
                }
            })

            .catch((err) => {
                callback(err)
            })
    },

    // getsignupFormData(data, callback) {
    //     axios
    //         .get(`${global.adminUrl}extra/searchInBackend`, data)
    //         .then((response) => {
    //             callback(response)
    //             console.log('extra', response)
    //         })
    //         .catch((e) => {
    //             callback(e)
    //             console.log(e)
    //         })
    // },
    //   sample api
    // storeListWithFilter: (dataObj, callback) => {
    //     const obj = dataObj

    //     const accessToken = global.getToken()

    //     return axios

    //         .post(`${global.adminUrl}Store/searchInBackend`, obj, {
    //             headers: {
    //                 accesstoken: accessToken,
    //             },
    //         })

    //         .then((response) => {
    //             if (response.status === 200) {
    //                 callback(response)
    //             } else if (response.status === 204) {
    //                 callback([])
    //             }
    //         })

    //         .catch((err) => {
    //             callback(err)
    //         })
    // },
    // getAllData(data, formData, callback) {
    //     axios({
    //         method: 'post',
    //         url: `${global.adminUrl}/searchInBackend`,
    //         data: formData,
    //         headers: {
    //             accessToken: data,
    //         },
    //     })
    //         .then((response) => {
    //             callback(response.data)
    //         })
    //         .catch((e) => {
    //             callback(e)
    //         })
    // },
    verifyOtpWeb: (data, callback) => {
        axios({
            method: 'post',
            url: `${global.webUrl}/verify-otp-web`,
            data,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    loginWeb: async (data, callback) => {
        if (!data.loginFrom) {
            data.loginFrom = 'store'
        }
        await axios({
            method: 'post',
            url: `${global.webUrl}/login-web`,
            data,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                console.log(e)
                callback(e)
            })
    },
    forgotPasswordWeb: (data, callback) => {
        axios({
            method: 'post',
            url: `${global.webUrl}/forgot-password-web`,
            data,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    confirmForgotPasswordWeb: (data, callback) => {
        axios({
            method: 'post',
            url: `${global.webUrl}/confirm-forgot-password-web`,
            data,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    changePasswordWeb: (data, callback) => {
        axios({
            method: 'post',
            url: `${global.webUrl}/change-password-web`,
            data,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    logoutWeb: (data, callback) => {
        axios({
            method: 'post',
            url: `${global.webUrl}/logout-web`,
            data,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    resendOtpWeb: (data, callback) => {
        axios({
            method: 'post',
            url: `${global.webUrl}/resend-otp-web`,
            data,
        })
            .then((response) => {
                callback(response)
            })
            .catch((e) => {
                callback(e)
            })
    },
    saveProductData: (url, dataObj, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}${url}`,
            data: dataObj,
            header: {},
        })
            .then((response) => {
                if (response.status === 201) {
                    callback(response)
                } else if (response.status === 204) {
                    callback({})
                }
            })
            .catch((e) => {
                callback(e)
            })
    },
    delete: (url, param, callback) => {
        axios({
            method: 'delete',
            url: `${global.adminUrl}${url}/${param}`,
            header: {},
        })
            .then((response) => {
                if (response.status === 200) {
                    callback(response)
                } else if (response.status === 204) {
                    callback([])
                }
            })
            .catch((e) => {
                callback(e)
            })
    },
    getAll: (url, dataObj, callback) => {
        axios({
            method: 'post',
            url: `${global.adminUrl}${url}`,
            header: {},
            data: dataObj,
        })
            .then((response) => {
                if (response.status === 200) {
                    callback(response)
                } else if (response.status === 204) {
                    callback([])
                }
            })
            .catch((e) => {
                callback(e)
            })
    },
}
