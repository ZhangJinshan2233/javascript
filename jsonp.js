// simple implementation
function jsonp(req) {
    let script = document.createElement('script');
    let url = req.url + '?=callback' + req.callback.name
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild('script');
}
//perfact implementation
(function (global) {
    let id = 0;
    let container = document.getElementsByTagName('head')[0];

    function jsonp(options) {
        if (!options || !options.url) return
        let sriptNode = document.createElement('script')
        let {
            data,
            url,
            callback
        } = options;
        let fnName = 'jsonp' + id++;
        //add callback funtion
        data['callback'] = fnName;
        //concatenate url
        let params = []
        for (let key in data) {
            params.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));

        }
        url = url.indexOf('?') > 0 ? (url + "&") : (url + '?');
        url += params.join('&');
        scriptNode.src = url;
        global[fnName] = function (ret) {
            callback && callback(ret);
            container.removeChild(scriptNode);
            delete global[fnName];
        }

        //handle error
        scriptNode.onerror = function () {
            callback && callback({
                error: "error"
            });
            container.removeChild(scriptNode);
            global[fnName] && delete global[fnName];
        }
        scriptNode.type = "text/javascript";
        container.appendChild(scriptNode)
    }
    global.jsonp = jsonp;
})(this)