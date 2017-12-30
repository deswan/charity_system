export function req({url,params,type = 'get'}) {
    let options = {
        method:type
    }
    if(params){
        let paramsString = Object.keys(params).map(key=>{
            return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        }).join('&')
        if(type.toLowerCase() == 'get'){
            url += ('?' + paramsString);
        }else if(type.toLowerCase() == 'post'){
            options.body = paramsString;
        }
    }
    return new Promise((resolve, reject) => {
        fetch(url,options).then((res) => {
            if (!res.ok) {
                return reject(new Error('request error'))
            }
            let json = res.json();
            console.log(json)
            return json;
        }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
}