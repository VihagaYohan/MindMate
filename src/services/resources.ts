import { AxiosResponse } from 'axios'
// api client
import { ApiClient } from '.'

import { Resource } from '../data/models'
import Endpoint from './endpoints'

// shared
import { ServerResponse, ListResponse, ErrorResponse } from '../shared'

class ResourcesService {
    endpoint: Endpoint

    constructor() {
        this.endpoint = new Endpoint()
    }

    // get all resources
    getResources = async ():
        Promise<ServerResponse<ListResponse<Resource>> | ServerResponse<ErrorResponse>> => {

        try {
            const result: AxiosResponse<ListResponse<Resource>> = await ApiClient({
                url: this.endpoint.resources,
                method: 'get'
            })

            if (result.status == 200) {
                return new ServerResponse<ListResponse<Resource>>(
                    true,
                    "Resource have been fetched successfully",
                    result.data
                )
            }
            return new ServerResponse<ErrorResponse>(
                false,
                "Unabled to retrieve resources",
                { message: '', statusCode: 400 },
                400
            )
        } catch (e) {
            return new ServerResponse<ErrorResponse>(
                false,
                "Unable to retrieve resources",
                { message: (e as Error).message || String(e), statusCode: 500 },
                500
            )
        }
    }
}

export default ResourcesService