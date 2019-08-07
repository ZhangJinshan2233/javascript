/**
 * if event won't be triggered second time in specified time,
 * and then execute
 */

function debounce(fn, waite) {
    //use closure to preserve timer
    let timer = null;
    return function () {
        let context = this
        let arg = [...arguments];
        //clear timer when it was triggered in specified time
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, arg)
        }, waite);
    }
}
