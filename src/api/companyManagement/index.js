import request from '@/utils/request'

export function companyManagementApi (params){
    return request({
      url:'/companys',
      params
    })
}  