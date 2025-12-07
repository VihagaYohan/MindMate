import { ApiClient } from '../'

// shared
import { getUserDetails } from '../../shared/services/persistentStorage'

// model
import { PersistentStorage } from '../../data/models'

const requestInterceptor = ApiClient.interceptors.request.use(async function (config) {
    const userDetails: PersistentStorage = await getUserDetails()

    console.log(userDetails)

    if (userDetails != null || userDetails != undefined) {
        //config.headers.Authorization = `Bearer ${userDetails.token}`
        const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTNmMmI5YzdmODEzMDIwNzlkMDA0NiIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTc2NTA1MTQ0MCwiZXhwIjoxNzY1NjU2MjQwfQ.B_rTu-IQS8iWE2xtkoWRyOlxhvVooclDcTVwRd3lRkQ"
        config.headers.Authorization = `Bearer ${token}`
    }
    console.log(config)
    return config
}, function (error) {
    return Promise.reject(error)
})

export default requestInterceptor