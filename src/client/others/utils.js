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
