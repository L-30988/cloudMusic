import request from '@/utils/request.js'
const URL = 'http://localhost:3000'
export function fetchPlaylist(params){
      return request({
          method:'get',
          url:`${URL}/playlist/list`,
          params
      })
}

export function fetchSingleId(params){
    return request({
        method:'get',
        url:`${URL}/playlist/singleId`,
        params

    })

}

export function update(params) {
    return request({
        method:'post',
        url:`${URL}/playlist/update`,
        data:{
            ...params
        }
    })
    
}


export function delStorage(params){
    return request({
        method:'get',
        url:`${URL}/playlist/del`,
        params
    })

}

export function remove(params){
    return request({
        method:'get',
        url:`${URL}/playlist/remove`,
        params
    })

}

