export function req({ url, params, type = 'get' }) {
    let options = {
        method: type,
        credentials: 'same-origin'
    }
    let headers = {
        "Accept":'application/json'
    }
    if (params) {
        if (type.toLowerCase() == 'get') {
            let paramsString = Object.keys(params).map(key => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            }).join('&')
            url += ('?' + paramsString);
        } else if (type.toLowerCase() == 'post') {
            options.body = JSON.stringify(params);
            headers["Content-Type"] = "application/json";
        }
    }
    options.headers = new Headers(headers)
    return fetch(url, options).then((res) => {
        let json = res.json();
        return {res,json};
    }).then(({res,json})=>{
        if (!res.ok) {
            throw new Error(json.message);
            return;
        }
        return json;
    })
}