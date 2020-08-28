export const PasswordValuePatternMatch = (x) => {
    return x.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+|<>?:{}]).{8,}$/
    );
};

export const EmailValuePatternMatch = (x) => {
    return x.match(
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );
};

export const PhoneNumberPatternMatch = (x) => {
    return x.match(/^[0-9-]+$/);
};

export const DeduplicationInArrContent = (arr) => {
    var what,
        a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
};
