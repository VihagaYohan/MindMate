import { AxiosError, AxiosResponse } from 'axios';
// api client
import { ApiClient } from '.';

import { Resource } from '../data/models';
import Endpoint from './endpoints';

// shared
import { ErrorResponse, ListResponse, ServerResponse } from '../shared';

class ResourcesService {
  endpoint: Endpoint;

  constructor() {
    this.endpoint = new Endpoint();
  }

  // get all resources
  getResources = async (): Promise<
    ServerResponse<ListResponse<Resource>> | ServerResponse<ErrorResponse>
  > => {
    try {
      const result: AxiosResponse<ListResponse<Resource>> = await ApiClient({
        url: this.endpoint.resources,
        method: 'get',
      });

      if (result.status === 200) {
        return new ServerResponse<ListResponse<Resource>>(
          true,
          'Resource have been fetched successfully',
          result.data,
        );
      }
      return new ServerResponse<ErrorResponse>(
        false,
        'Unabled to retrieve resources',
        { message: '', statusCode: 400 },
        400,
      );
    } catch (e) {
      return new ServerResponse<ErrorResponse>(
        false,
        'Unable to retrieve resources',
        { message: (e as Error).message || String(e), statusCode: 500 },
        500,
      );
    }
  };

  // get resource by id
  getResourceById = async (
    id: string,
  ): Promise<ServerResponse<Resource> | ServerResponse<ErrorResponse>> => {
    try {
      const result: AxiosResponse<ServerResponse<Resource>> = await ApiClient({
        url: `${this.endpoint.resources}/${id}`,
        method: 'get',
      });

      const response = new ServerResponse<Resource>(
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
}

export default ResourcesService;
