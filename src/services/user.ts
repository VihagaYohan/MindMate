import { AxiosError, AxiosResponse } from 'axios'

// api client
import { ApiClient } from '.'

import Endpoint from './endpoints'

// shared
import { ErrorResponse, ServerResponse, Storage } from '../shared'

// model
import { User, Token, Profile } from '../data/models'

export interface ProfileResponse {
    message: string,
    success: boolean,
    data: Profile
}

class UserService {
    endpoint: Endpoint

    constructor() {
        this.endpoint = new Endpoint()
    }

    // get current-user
    currentUser = async (): Promise<ServerResponse<ProfileResponse | ErrorResponse>> => {
        try {
            const result: AxiosResponse<ProfileResponse> = await ApiClient({
                url: this.endpoint.profile,
                method: 'get',
                params: {
                    'userId': '68e3f2b9c7f81302079d0046'
                }
            })

            console.log(result)

            const response = new ServerResponse<ProfileResponse>(
                true,
                result.data.message,
                result.data
            )
            return response

        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>

            if (axiosError.response) {
                // server returned an error response
                return new ServerResponse<ErrorResponse>(
                    false,
                    axiosError.response.data?.message || "Request failed",
                    axiosError.response.data,
                    axiosError.response.data.statusCode
                )
            } else if (axiosError.request) {
                // request was made but no response
                return new ServerResponse<ErrorResponse>(
                    false,
                    "No response from server. Check your network or API server",
                    { message: "No response" } as ErrorResponse,
                    400
                )
            } else {
                // something else happened during setup
                return new ServerResponse<ErrorResponse>(
                    false,
                    axiosError.message || "Unexpected error occured",
                    { message: axiosError.message } as ErrorResponse,
                    500
                )
            }
        }
    }
}

export default UserService

