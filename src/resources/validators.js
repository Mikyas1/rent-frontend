export const emailRules = [
    v => !!v || 'E-mail is required',
    v => /.+@.+/.test(v) || 'E-mail must be valid',
];

export const passwordRules = [
    v => !!v || 'Password is required',
    v => v.length >= 4 || 'Password must be greater than 4 characters',
];

export const lenRules = (field_name, size) => [
    v => !!v || `${field_name} is required`,
    v => v.length >= size || `${field_name} must be greater than 4 characters`,
];

export const required = (field_name) => [
    v => !!v || `${field_name} is required`,
]

export const min0 = (field_name) => [
    v => v > 0 || `${field_name} must be positive`,
]