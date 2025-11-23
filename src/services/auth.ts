import { AxiosError, AxiosResponse } from 'axios'

// api client
import { ApiClient } from '.'

import Endpoint from './endpoints'

// shared
import { ErrorResponse, ServerResponse, Storage } from '../shared'
import { savePayload } from '../shared/utils/Storage'

// model
import { User, Token, PersistentStorage } from '../data/models'


interface AuthRequest {
    email: string
    password: string
}


export interface AuthResponse {
    user: User,
    token: Token,
    message: string,
    success: boolean,
    data: any
}

class AuthService {
    endpoint: Endpoint

    constructor() {
        this.endpoint = new Endpoint();
    }

    // register
    userRegister = async (
        request: AuthRequest
    ): Promise<ServerResponse<AuthResponse | ErrorResponse>> => {

        try {
            const result: AxiosResponse<AuthResponse> = await ApiClient({
                url: this.endpoint.register,
                method: 'post',
                data: request
            })

            const response = new ServerResponse<AuthResponse>(
                true,
                result.data.message,
                result.data
            )

            const { data } = response.data

            const persistentStorage = new PersistentStorage(
                data.token,
                data.user._id,
                data.user.email,
                data.user.userType,
                data.user.isActive
            )

            await Storage.storeItem({ key: 'user', value: persistentStorage })
            return response
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>

            if (axiosError.response) {
                // server returned and error response
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
                // something else happend during setup
                return new ServerResponse<ErrorResponse>(
                    false,
                    axiosError.message || "Unexpected error occured",
                    { message: axiosError.message } as ErrorResponse,
                    500
                )
            }
        }
    }

    // login 
    userLogin = async (
        request: AuthRequest): Promise<ServerResponse<AuthResponse | ErrorResponse>> => {
        try {
            const result: AxiosResponse<AuthResponse> = await ApiClient({
                url: this.endpoint.login,
                method: 'post',
                data: request
            })

            const response = new ServerResponse<AuthResponse>(
                true,
                result.data.message,
                result.data)

            const { data } = response.data

            const persistentStorage = new PersistentStorage(
                data.token,
                data.user._id,
                data.user.email,
                data.user.userType,
                data.user.isActive
            )

            await Storage.storeItem({ key: 'user', value: persistentStorage })
            return response

        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;

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
            }
            else {
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