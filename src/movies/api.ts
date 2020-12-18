import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// const baseAxios = (
//   url: AxiosRequestConfig,
//   method: AxiosRequestConfig,
//   data: AxiosRequestConfig,
//   headers: AxiosRequestConfig
// ) =>
//   axios.create({
//     url,
//     method,
//     data,
//     headers,
//   });

export const HttpRequest = (url: string) => {
  return axios.get(url).then((response: AxiosResponse) => response);
};
