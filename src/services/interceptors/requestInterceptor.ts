import { ApiClient } from '../'

// shared
import { getUserDetails } from '../../shared/services/persistentStorage'

// model
import { PersistentStorage } from '../../data/models'

const requestInterceptor = ApiClient.interceptors.request.use(async function (config) {
    const userDetails: PersistentStorage = await getUserDetails()

    if (userDetails != null || userDetails != undefined) {
        //config.headers.Authorization = `Bearer ${userDetails.token}`
        const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTNmMmI5YzdmODEzMDIwNzlkMDA0NiIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTc2NDAwMjY3MCwiZXhwIjoxNzY0NjA3NDcwfQ.LFeXm7ApK56pc_OYbmj85MjyQtrqb1WxsK4Aur7fpD4"
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

export default requestInterceptor