// 专门放置文章请求的
// 获取文章
import request from '../utils/request.js'
import { API_ARTICLES, API_CHANNELS } from '../constant/API.js'
export function getArticles (params) {
  return request({
    url: API_ARTICLES,
    params
  })
}
export function getChannels () {
  return request({
    url: API_CHANNELS
  })
}
