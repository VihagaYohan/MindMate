import { AxiosError, AxiosResponse } from 'axios'

// api client
import { ApiClient } from '.'

import Endpoint from './endpoints'

// shared
import { ErrorResponse, ServerResponse } from '../shared'

// model
import { User, Token } from '../data/models'


interface LoginRequest {
    email: string
    password: string
}


export interface LoginResponse {
    user: User,
    token: Token,
    message: string,
    success: boolean
}

class AuthService {
    endpoint: Endpoint

    constructor() {
        this.endpoint = new Endpoint();
        console.log('endpoint created ', this.endpoint)
    }

    // login 
    userLogin = async (
        request: LoginRequest): Promise<ServerResponse<LoginResponse | ErrorResponse>> => {
        try {
            const result: AxiosResponse<LoginResponse> = await ApiClient({
                url: this.endpoint.login,
                method: 'post',
                data: request
            })

            const response = new ServerResponse<LoginResponse>(true, result.data.message, result.data)
            console.log(response)
            return response

        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            console.log(axiosError)

            if (axiosError.response) {
                console.log(axiosError.response)
                // server returned an error response
                return new ServerResponse<ErrorResponse>(
                    false,
                    axiosError.response.data?.message || "Request failed",
                    axiosError.response.data,
                    axiosError.response.data.statusCode
                )
            } else if (axiosError.request) {
                console.log(2)
                // request was made but no response
                return new ServerResponse<ErrorResponse>(
                    false,
                    "No response from server. Check your network or API server",
                    { message: "No response" } as ErrorResponse,
                    400
                )
            }
            else {
                console.log(3)
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

export default AuthService