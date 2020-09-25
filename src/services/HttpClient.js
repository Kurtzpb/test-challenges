/* eslint-disable camelcase */
// modules
import axios from 'axios'
import queryString from 'query-string'

// components
import Modal from 'antd/es/modal'

// constants
import { API_BASE_URL } from '../constants'

class HttpClient {
  constructor () {
    this.client = axios.create({
      baseURL: API_BASE_URL
    })
    this.refreshRequest = null

    this.client.interceptors.request.use(
      config => config,
      e => Promise.reject(e)
    )

    this.client.interceptors.response.use(
      res => res,
      err => {
        Modal.error()
      }
    )
  }

  initialize (store) {
    this.store = store
  }

  static normalizeRoute (route = {}) {
    const normalizedRoute = {}
    if (typeof route === 'string') {
      normalizedRoute.pathname = route
    } else if (typeof route === 'object' && route) {
      normalizedRoute.pathname = route.pathname
      normalizedRoute.params = route.params
      normalizedRoute.query = route.query
    }

    return normalizedRoute
  }

  static injectStringParams = (str, params = {}) => str.replace(/:(\w+)/g, (_, param) => params[param])

  static composeRequestURL ({ pathname, params, query }) {
    const url = HttpClient.injectStringParams(pathname, params)
    const processedQuery = queryString.stringify(query)

    return processedQuery ? `${url}?${processedQuery}` : url
  }

  async request ({ method, url }) {
    const route = HttpClient.composeRequestURL(HttpClient.normalizeRoute(url))
    const response = await this.client[method](route)

    const { data } = response
    return data
  }
}

export default new HttpClient()
