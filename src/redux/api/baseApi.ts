import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {getStorageToken} from '../../utils/utils';

interface BaseQueryArgs extends AxiosRequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

// Type for the args that will be passed to axios (base query arguments)

const baseQueryWithRath: BaseQueryFn<BaseQueryArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) => {
  const token = getStorageToken();

  try {
    const result: AxiosResponse = await axios({
      // baseURL: 'http://192.168.12.140:8000/api',
      // baseURL: 'http://10.0.2.2:8000/api',
      baseURL: 'https://api.wovo.love/api', // If this doesn't work, try: 'https://api.wovo.love' (without /api)
      ...args,
      url: args.url,
      method: args.method,
      data: args.body,
      headers: {
        ...args.headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    // console.log(result.data);
    // Check if response data is a string and malformed
    if (typeof result?.data === 'string') {
      // if (!result.data.endsWith('}')) {
      const withCurly = (result.data += '}');
      return {data: JSON.parse(withCurly)};
      // }
    }
    if (typeof result?.data === 'object') {
      return {data: result?.data};
    }

    return {data: result?.data};
  } catch (error: any) {
    // Log error for debugging (only in development, and only for unexpected errors)
    // Don't log expected errors like 404 as console.error to avoid React Native error overlay
    if (__DEV__ && error.response?.status >= 500) {
      console.warn('API Error:', {
        message: error.message,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    }

    if (error.response?.data) {
      if (typeof error.response?.data === 'string') {
        try {
          const withCurly = (error.response.data += '}');
          return {error: JSON.parse(withCurly)};
        } catch (parseError) {
          return {
            error: {
              status: error.response?.status || 500,
              data: error.response?.data || 'Something went wrong',
            },
          };
        }
      } else {
        return {error: error.response?.data};
      }
    }
    return {
      error: {
        status: error.response?.status || 500,
        data: error.message || 'Something went wrong',
      },
    };
  }
};

// Define the `createApi` with appropriate types
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRath,
  endpoints: () => ({}),
  tagTypes: [
    'user',
    'message',
    'group',
    'news_feed',
    'friend',
    'shop',
    'product',
    'wall',
    'payment',
    'wallet',
    'comment',
    'order',
    'notification'
  ],
});

// export const imageUrl = 'http://192.168.12.160:7000/';
// export const imageUrl = 'http://10.0.2.2:8000';
export const imageUrl = 'https://api.wovo.love';
