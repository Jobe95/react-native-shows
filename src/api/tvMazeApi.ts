import {AxiosResponse} from 'axios';
import {SearchShowModel} from '../models/SearchShowModel';
import {ShowModel} from '../models/ShowModel';
import {api} from './axiosClient';

export const getShows = (page: number): Promise<AxiosResponse<ShowModel[]>> =>
  api.get(`/shows?page=${page.toString()}`);

export const searchShows = (
  query: string,
): Promise<AxiosResponse<SearchShowModel[]>> =>
  api.get(`/search/shows?q=${query}`);
