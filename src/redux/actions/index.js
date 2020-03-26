export const loginSubmit = (login, pass) => ({
    type: 'LOGIN_SUBMIT',
    login,
    pass
})

export const cDM = (data) => ({
    type: 'APICALL',
    data
})

export const formChange = (imageUrl, title, res, price) => ({
    type: 'FORM_CHANGE',
    imageUrl,
    title,
    res,
    price
})

export const formSubmit = (formData) => ({
    type: 'ADD_CARD',
    formData
})

export const handleDelElem = (id) => ({
    type: 'DEL_ELEM',
    id
})
