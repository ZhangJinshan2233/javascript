class Router {
    constructor() {
        this.routes = {};
        this.currentHash = '';
        //bind this and avoid change pointer
        this.freshRoute = this.freshRoute.bind(this)
        //listen
        window.addEventListener('load', this.freshRoute, flase)
        window.addEventListener('hashchange', this.freshRoute, false)
    }

    //store route
    storeRoute(path, cb) {

        this.routes[path] = cb || function () {}
    }

    //update route

    freshRoute() {
        this.currentHash=location.hash.slice(1)||'/';
        this.routes[this.currentHash]();
    }
}