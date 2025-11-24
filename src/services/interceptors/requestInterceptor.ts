import { ApiClient } from '../'

// shared
import { getUserDetails } from '../../shared/services/persistentStorage'

// model
import { PersistentStorage } from '../../data/models'

const requestInterceptor = ApiClient.interceptors.request.use(async function (config) {
    const userDetails: PersistentStorage = await getUserDetails()

    if (userDetails != null || userDetails != undefined) {
        config.headers.Authorization = `Bearer ${userDetails.token}`
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

export default requestInterceptor