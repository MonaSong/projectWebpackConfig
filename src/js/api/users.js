import {get, post } from '../util/httpUtils';

export const getUser = param => get('http://localhost:8090/api/user?uid=233', param);