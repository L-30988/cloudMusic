import request from '@/utils/request.js'
const URL = 'http://localhost:3000'

export function fetchBlogList(params){
   return request({
        method:'get',
        url:`${URL}/blog/list`,
        params
        
    })

}

export function del(params) { 
    return request({
        method:'get',
        url:`${URL}/blog/remove`,
        params
    })
 }