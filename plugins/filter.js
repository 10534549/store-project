import Vue from 'vue'

// export function imageRender(value, imageName) {
//     let img = 'photograph.png'
//     if (imageName) {
//         img = imageName
//     }
//     const imageHolder = require(`@/assets/img/static/${img}`)
//     if (value) {
//         return value
//     } else {
//         return imageHolder
//     }
// }
Vue.filter('capitalize', (value) => {
    const upperCaseData = value.toUpperCase()
    return upperCaseData
})

export function imageRender(value, imageName1, imageName2, imageType) {
    let img = 'photograpgh.png'
    if (imageType) {
        // FOR OFFER AND DEAL
        if (imageType === 'deal') {
            img = imageName2
        } else {
            img = imageName1
        }
    } else if (imageName1) {
        img = imageName1
    }

    const imageHolder = require(`@/assets/img/static/${img}`)
    if (value) {
        return value
    } else {
        return imageHolder
    }
}

export function typeText(input) {
    let text = ''
    switch (input) {
        case 'storepackage':
            text = 'Package Purchased By Store'
            break
        case 'storetopup':
            text = 'Topup Purchased By Store'
            break
        case 'agentpackage':
            text = 'Package Purchased By Agent'
            break
        case 'agenttopup':
            text = 'Topup Purchased By Agent'
            break
        default:
            text = '-'
    }
    return text
}
export function freshDeskStatus(input) {
    if (input === 2) {
        return 'Open'
    } else if (input === 3) {
        return 'Pending'
    } else if (input === 4) {
        return 'Resolved'
    } else if (input === 5) {
        return 'Closed'
    }
}
// TRUNCATE
export function truncate(value, length, text) {
    let limit = 20
    if (length) {
        limit = length
    }
    let suffix = '..'
    if (text) {
        suffix = text
    }
    if (value) {
        if (value.length < limit) {
            return value
        } else {
            return value.slice(0, limit - 2) + suffix
        }
    } else {
        return ''
    }
}

const filters = { imageRender, typeText, freshDeskStatus, truncate }
Vue.filter('capitalize', (value) => {
    const upperCaseData = value.toUpperCase()
    return upperCaseData
})

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
})
export default filters
