/*
 * @Author: taoshiwei
 * @Date: 2019-04-09 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:32:40
 *
 * 企业管理
 */

import { createAPI } from '@/utils/request'

export const listApi = data => createAPI('/companys', 'get', data)
export const addApi = data => createAPI('/companys', 'post', data)
export const updateApi = data => createAPI(`/companys/${data.id}`, 'put', data)
export const removeApi = data => createAPI(`/companys/${data.id}`, 'delete', data)
export const detailApi = data => createAPI(`/companys/${data.id}`, 'get', data)
export const disabledApi = data =>
  createAPI(`/companys/${data.id}/state`, 'post', data) //企业管理设置状态
