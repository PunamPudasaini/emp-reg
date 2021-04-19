export function encodeData(
    data
  ) {
    if(data) {
    return btoa(JSON.stringify(data))
    }else return null
  }
  export function decodeData(
    data
  ) {
    if(data) {
      try{
        let decoded = atob(data)
        return JSON.parse(decoded)
      }catch{
      }
    } else return null
  }
  export function encodeNepaliData(data){
    if(data){
      return btoa(encodeURIComponent(JSON.stringify(data)))
    }
    else return null
  }
  export function decodeNepaliData(data){
    if(data){
      try{
        let decoded =decodeURIComponent(atob(data))
        return JSON.parse(decoded)
      }catch{
      }
      // return decodeURIComponent(atob(data))
    }else return null
  }