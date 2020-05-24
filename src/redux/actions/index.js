export const loginSubmit = (login, pass) => ({
    type: 'LOGIN_SUBMIT',
    login,
    pass
})

export const setNickName = (nickName) => ({
    type: 'SET_NICKNAME',
    nickName,
})

export const setID = (id) => ({
    type: 'SET_ID',
    id,
})

export const setTrash = (forTrash) => ({
    type: 'SET_TRASH',
    forTrash,
})

export const setName = (name) => ({
    type: 'SET_NAME',
    name,
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

export const setTrack = (track) => ({
    type: 'SET_TRACK',
    track
})

export const showPT = (forSPT) => ({
    type: 'SHOW_PLAYLIST_TRACKS',
    forSPT
})

export const initModal = (initModal) => ({
    type: 'INIT_MODAL',
    initModal,
})

export const initAttention = (initAttention, mesType, playTrash) => ({
    type: 'INIT_ATTENTION',
    initAttention,
    mesType,
    playTrash
})

export const setTrackID = (trackID) => ({
    type: 'SET_TRACKID',
    trackID,
})

export const changePage = (page) => ({
    type: 'CHANGE_PAGE',
    page
})

export const setGenreName = (genreName) => ({
    type: 'SET_GENRENAME',
    genreName
})
