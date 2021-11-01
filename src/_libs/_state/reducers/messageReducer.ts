import { loadState } from 'components/global/Storage/Storage'
import { getUUID } from '_libs/_helpers/fn'

export type Context = {
    messages: TMessage[];
    archive: TMessage[];
}

export type TMessage = {
    id: string;
    read?: boolean;
    title: string;
    body: string;
    interactions?: any;
}
export enum ActionType {
    NEW_MESSAGE = 'New Message',
    CLEAR_MESSAGES = 'Clear Messages',
    POP_MESSAGE = 'Pop Messages'

}
export type Action =
    | { type: ActionType.NEW_MESSAGE, payload: TMessage}
    | { type: ActionType.CLEAR_MESSAGES }
    | { type: ActionType.POP_MESSAGE }

export const initialState: Context =
    loadState('messages') ||
    {
        messages: [],
        archive: [],
    }

function isMessage(event: TMessage | any): event is TMessage {
    const e = event as TMessage;
    return e.title !== undefined &&
        e.body !== undefined
}
export const reducer = (state = initialState, action: Action): Context => {
    let m = state.messages;
    let data;
    switch (action.type) {
        case ActionType.NEW_MESSAGE:
            return isMessage(action.payload) ? { ...state, 
                messages: [...m,
                {...action.payload, read: false, id: getUUID()}
                ]
            } : state
        case ActionType.CLEAR_MESSAGES:
            return {
                ...state,
                messages: [],
                archive: [],
            }
        case ActionType.POP_MESSAGE:
            data = m.shift()
            return {
                ...state,
                messages: m,
                archive: data ? [...state.archive, {...data, read: true}] : [...state.archive]
            }
        default:
            return state
    }
}
export default reducer;



