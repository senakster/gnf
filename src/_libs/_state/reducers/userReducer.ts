// import { loadState } from 'components/global/Storage/Storage'
import { loadState } from 'components/global/Storage/Storage'
import { getUUID } from '_libs/_helpers/fn'

export type Context = {
    data: TUserData
}


export type TUserData = {
    id: string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
    loggedin: boolean;
}

type TCredentials = {
    username?: string;
    email?: string;
    password: string;
}

export enum ActionType {
    LOGIN = 'Login',
    LOGOUT = 'Logout',
    SET_USER = 'Set User',
    CREATE_USER = 'Create User',
}
export type Action =
    | { type: ActionType.LOGIN, payload: TCredentials }
    | { type: ActionType.LOGOUT }
    | { type: ActionType.SET_USER, payload: TUserData }
    | { type: ActionType.CREATE_USER, payload: TUserData }


export const defaultUser: TUserData  = {
        id: 'GUEST',
        email: 'guest@gpsadventure.com',
        username: 'Guest',
        firstname: 'Guest',
        lastname: '',
        role: 'guest',
        loggedin: false,
    }
export const initialState: Context =
    loadState('user') ||
    {
        data: {...defaultUser}
    }

export const reducer = (state = initialState, action: Action): Context => {
    let ta: any = {};
    switch (action.type) {
        case ActionType.LOGIN:
            console.log('login', action.payload)
            return state;
        case ActionType.LOGOUT:
            console.log('logout')
            return state;
        case ActionType.SET_USER:
            console.log('setUser')
            return state;
        case ActionType.CREATE_USER:
            const newUser = {...defaultUser, id: getUUID()}
            console.log(newUser)
            return state;
        default:
            return state
    }
}
export default reducer;



