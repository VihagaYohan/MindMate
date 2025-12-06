import { AxiosError, AxiosResponse } from 'axios'
// api client
import { ApiClient } from '.'
import Endpoint from './endpoints'

// model
import { Mood } from '../data/models'

// shared
import {
    ServerResponse,
    ListResponse,
    ErrorResponse
} from '../shared'

export interface AddMoodRequest {
    level: number,
    description: string
    notes: string
}

class MoodService {
    endpoint: Endpoint

    constructor() {
        this.endpoint = new Endpoint()
    }


    // add new user-mood
    addMood = async (
        request: AddMoodRequest
    ):
        Promise<ServerResponse<Mood> | ServerResponse<ErrorResponse>> => {
        try {
            const result: AxiosResponse<ServerResponse<Mood>> = await ApiClient({
                url: this.endpoint.register,
                method: 'post',
                data: request
            })

            const response = new ServerResponse<Mood>(
                true,
                result.data.message,
                result.data.data,
                result.status
            )
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


export default MoodService