/*
 * @Author: taoshiwei
 * @Date: 2019-04-09 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 15:16:53
 *
 * 文章
 */

import { createAPI } from '@/utils/request'

// 文章列表 
export const listApi = data => createAPI('/articles', 'get', data)

// 文章简单列表
export const simpleApi = data => createAPI('/articles/simple', 'get', data)

// 文章详情
export const detailApi = data => createAPI(`/articles/${data.id}`, 'get', data)

// 文章添加
export const addApi = data => createAPI('/articles', 'post', data)

// 文章修改
export const updateApi = data => createAPI(`/articles/${data.id}`, 'put', data)

// 文章删除
export const removeApi = data => createAPI(`/articles/${data.id}`, 'delete', data)

// 文章状态
export const changeStateApi = data =>
  createAPI(`/articles/${data.id}/${data.state}`, 'post', data)
