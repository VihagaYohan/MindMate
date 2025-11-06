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
    getServices = async () => {
        try {
            const result: AxiosResponse = await ApiClient({
                url: this.endpoint.categories,
                method: 'get'
            })

            console.log(result)

            if (result.status === 200 || 201) {
                return new ServerResponse<ListResponse<Category>>(true, "Categories retrieved successfully", result.data)
            }
            return new ServerResponse<ErrorResponse>(false, 'Unable to retrieve categories', { message: '', statusCode: 400 }, 400)
        } catch (e) {
            console.log(e)
        }
    }
}

export default CategoriesService