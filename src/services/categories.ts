import { AxiosResponse } from 'axios'
// api client
import { ApiClient } from ".";

import { Category } from "../data/models";
import Endpoint from "./endpoints";

// shared
import { ServerResponse, ListResponse, ErrorResponse } from '../shared';

class CategoriesService {
    endpoint: Endpoint


    constructor() {
        this.endpoint = new Endpoint();
    }

    // get services
    getServices = async ():
        Promise<ServerResponse<ListResponse<Category>> | ServerResponse<ErrorResponse>> => {
        try {
            const result: AxiosResponse<ListResponse<Category>> = await ApiClient({
                url: this.endpoint.categories,
                method: 'get'
            })

            if (result.status === 200 || result.status === 201) {
                return new ServerResponse<ListResponse<Category>>(true, "Categories retrieved successfully", result.data)
            }
            return new ServerResponse<ErrorResponse>(false, 'Unable to retrieve categories', { message: '', statusCode: 400 }, 400)
        } catch (e) {
            console.log(e)
            return new ServerResponse<ErrorResponse>(false, 'Unable to retrieve categories', { message: (e as Error).message || String(e), statusCode: 500 }, 500)
        }
    }
}

export default CategoriesService