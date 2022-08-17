/*
 * @Author: taoshiwei
 * @Date: 2019-04-09 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:53:23
 *
 * 学科
 */

import { createAPI } from '@/utils/request'

// 学科列表
export const list = data => createAPI('/subjects', 'get', data)

// 学科简单列表
export const simple = data => createAPI('/subjects/simple', 'get', data)

// 学科详情
export const detail = data => createAPI(`/subjects/${data.id}`, 'get', data)

// 学科添加
export const add = data => createAPI('/subjects', 'post', data)

// 学科修改
export const update = data => createAPI(`/subjects/${data.id}`, 'put', data)

// 学科删除
export const remove = data => createAPI(`/subjects/${data.id}`, 'delete', data)

// 目录列表
export const directorysList = data => createAPI('/directorys', 'get', data)

// 目录添加
export const adddirectorys = data => createAPI('/directorys', 'post', data)

// 目录修改
export const updatedirectorys = data => createAPI(`/directorys/${data.id}`, 'put', data)

// 目录删除
export const removedirectorys = data => createAPI(`/directorys/${data.id}`, 'delete', data)

// 目录状态修改
export const updatedirectorysstate = data => createAPI(`/directorys/${data.id}/${data.state}`, 'post', data)


// 標籤列表
export const tagslist = data => createAPI('/tags', 'get', data)

// 标签添加
export const addtags = data => createAPI('/tags', 'post', data)

// 标签修改
export const updatetags = data => createAPI(`/tags/${data.id}`, 'put', data)

// 标签状态修改
export const updatetagsstate = data => createAPI(`/tags/${data.id}/${data.state}`, 'post', data)

// 目录删除
export const removetags = data => createAPI(`/tags/${data.id}`, 'delete', data)