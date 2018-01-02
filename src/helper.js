export function req({ url, params, type = 'get' }) {
    let options = {
        method: type,
        credentials: 'same-origin'
    }
    if (params) {
        if (type.toLowerCase() == 'get') {
            let paramsString = Object.keys(params).map(key => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            }).join('&')
            url += ('?' + paramsString);
        } else if (type.toLowerCase() == 'post') {
            options.body = JSON.stringify(params);
            options.headers = new Headers({
                "Content-Type": "application/json"
            })
        }
    }
    return fetch(url, options).then((res) => {
        if (!res.ok) {
            throw new Error('request error');
            return;
        }
        let json = res.json();
        return json;
    })
}