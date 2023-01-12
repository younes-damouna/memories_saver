import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authdata: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            console.log(action?.data)
            return { ...state, authDAta: action?.data }
        case LOGOUT:
            // localStorage.removeItem('profile')
            localStorage.clear()
            
            return { ...state, authDAta: null }
        default:
            return state;
    }
}

export default authReducer