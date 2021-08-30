import { loadState } from "components/global/Storage/Storage"


export type Context = {
    count: number,
    ui: any,
    data: { grupper: TGNFG[], updated: number },
}

export enum ActionType {
    INCREMENT = 'Increment',
    DECREMENT = 'Decrement',
    RESET = 'Reset',
    SET_UI = 'Set UI',
    SET_DATA = 'Set Data'

}
export type Action =
    | { type: ActionType.INCREMENT }
    | { type: ActionType.DECREMENT }
    | { type: ActionType.RESET }
    | { type: ActionType.SET_UI, payload: { [property: string]: any } }
    | { type: ActionType.SET_DATA, payload: { [property: string]: any } }



export const initialState: Context = 
loadState('state') ||
{
    count: 0,
    ui: {},
    data: { grupper: [], updated: 0 },
}
// EVENT TYPEGUARD
function isLatLng(event: { lat: number, lng: number } | any): event is { lat: number, lng: number } {
    const e = event as { lat: number, lng: number };
    return e.lat !== undefined &&
        e.lng !== undefined
}

export const reducer = (state: Context = initialState, action: Action): Context => {
    switch (action.type) {
        case ActionType.INCREMENT:
            return {
                ...state,
                count: state.count + 1,
            }
        case ActionType.DECREMENT:
            return {
                ...state,
                count: state.count - 1,
            }
        case ActionType.RESET:
            return {
                ...state,
                count: 0,
            }
        case ActionType.SET_UI:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    ...action.payload
                }
            }
        case ActionType.SET_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload, 
                    updated: new Date().getTime()
                }
            }
        default:
            return state;
        // throw new Error('Not among actions');
    }
}
export default reducer;



