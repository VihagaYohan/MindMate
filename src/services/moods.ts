import { AxiosError, AxiosResponse } from 'axios';
// api client
import { ApiClient } from '.';
import Endpoint from './endpoints';

// model
import { Mood, MoodEntry, GraphData } from '../data/models';

// shared
import { ErrorResponse, ListResponse, ServerResponse } from '../shared';

export interface AddMoodRequest {
  level: number;
  description: string;
  notes: string;
}

class MoodService {
  endpoint: Endpoint;

  constructor() {
    this.endpoint = new Endpoint();
  }

  // add new user-mood
  addMood = async (
    request: AddMoodRequest,
  ): Promise<ServerResponse<Mood> | ServerResponse<ErrorResponse>> => {
    try {
      const result: AxiosResponse<ServerResponse<Mood>> = await ApiClient({
        url: this.endpoint.register,
        method: 'post',
        data: request,
      });

      const response = new ServerResponse<Mood>(
        true,
        result.data.message,
        result.data.data,
        result.status,
      );
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        // server returned and error response
        return new ServerResponse<ErrorResponse>(
          false,
          axiosError.response.data?.message || 'Request failed',
          axiosError.response.data,
          axiosError.response.data.statusCode,
        );
      } else if (axiosError.request) {
        // request was made but no response
        return new ServerResponse<ErrorResponse>(
          false,
          'No response from server. Check your network or API server',
          { message: 'No response' } as ErrorResponse,
          400,
        );
      } else {
        // something else happened during setup
        return new ServerResponse<ErrorResponse>(
          false,
          axiosError.message || 'Unexpected error occured',
          { message: axiosError.message } as ErrorResponse,
          500,
        );
      }
    }
  };

  // get user mood entries
  getUserMood = async (
    page: number = 1,
    limit: number = 5,
  ): Promise<
    ServerResponse<ListResponse<MoodEntry>> | ServerResponse<ErrorResponse>
  > => {
    try {
      const result: AxiosResponse<ListResponse<MoodEntry>> = await ApiClient({
        url: `${this.endpoint.moodEntry}?page=${page}&limit=${limit}`,
        method: 'get',
      });

      if (result.status == 200) {
        return new ServerResponse<ListResponse<MoodEntry>>(
          true,
          'User moods fetched sucessfully',
          result.data,
        );
      }
      console.log(result.data);

      return new ServerResponse<ErrorResponse>(
        false,
        'Unable to retreive user moods',
        { message: '', statusCode: 400 },
        400,
      );
    } catch (e) {
      return new ServerResponse<ErrorResponse>(
        false,
        'Unable to retrieve user moods',
        { message: (e as Error).message || String(e), statusCode: 500 },
        500,
      );
    }
  };

  // get graph data for selected date
  getGraphData = async(
    selectedDate: string = new Date().toString()):
    Promise<ServerResponse<GraphData> | ServerResponse<ErrorResponse>> => {
    try {
      const result: AxiosResponse<GraphData> = await ApiClient({
        url: this.endpoint.moodStats,
        method: 'get'
      })

      if(result.status === 200) {
        return new ServerResponse<GraphData>(
          true,
          "User mood stats fetched successfully",
          result.data
        )
      }
      return new ServerResponse<ErrorResponse>(
        false,
        "Unable to retreive user mood stats",
        {message: '', statusCode: 400}
      )
    } catch(e) {
      return new ServerResponse<ErrorResponse>(
        false,
        "Unable to retrieve user mood stats",
        {message: (e as Error).message || String(e), statusCode: 500},
        500
      )
    }
  }
}

export default MoodService;
