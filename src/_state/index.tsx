import React, { useContext, useReducer } from 'react';
import * as State from './reducers/stateReducer';
import * as Messages from './reducers/messageReducer';
import * as User from './reducers/userReducer';

export interface Context {
    state: State.Context;
    messages: Messages.Context;
    user: User.Context;
}

export const ActionType = { 
    ...State.ActionType, 
    ...Messages.ActionType,
    ...User.ActionType,

}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ActionType = 
  State.ActionType 
| Messages.ActionType
| User.ActionType

export type Action = {type: ActionType, payload?: any };

// const mockAction: Action = { type: Event.ActionType.ADD_EVENT, payload: {} }
export interface Store {
    state: Context;
    dispatch?: React.Dispatch<Action>;
    log?: (title: string, body: string) => void
}

// Create Store Context
export const initialState: Context = { 
    state: State.initialState, 
    messages: Messages.initialState,
    user: User.initialState
    // themes: Themes.initialState,
};
export const context = React.createContext<Store>({ state: initialState });

export const useStateContext = () => useContext(context);

export const StateProvider = ({ children }: any) => {
    const combineDispatch = (...dispatches: React.Dispatch<any>[]) => (action: Action) =>
        dispatches.forEach((dispatch) => dispatch(action));

    // Get Reducers
    const [state, stateDispatch] = useReducer(State.reducer, State.initialState);
    const [messages, messagesDispatch] = useReducer(Messages.reducer, Messages.initialState);
    const [user, userDispatch] = useReducer(User.reducer, User.initialState);

    // Combine Dispatches
    // LINT-WARNING: React Hook useCallback received a function whose dependencies are unknown. Pass an inline function instead.eslintreact-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const combinedDispatch = React.useCallback(
        combineDispatch(
            stateDispatch,
            messagesDispatch, 
            userDispatch
        ), 
        [
            combineDispatch, 
            messagesDispatch, 
            userDispatch
        ],
    );

    // Combine States
    const combinedState = React.useMemo(() => (
        { 
            state, 
            messages, 
            user,
        }
        ), [
            state, 
            messages, 
            user,
        ]);

    const log = (title: string, body: string) => {
        combinedDispatch && combinedDispatch(
            {
                type: ActionType.NEW_MESSAGE,
                payload: {
                    title: title,
                    body: body,
                }
            }
        )
    }
    
    return <context.Provider value={{ state: combinedState, dispatch: combinedDispatch, log: log} } children = { children } />;
}

/**TEST COMPONENTS */
export const GSIndicator: React.FC = () => {
    const { state } = useStateContext()
    const count = state.state.count;
    return (
        <span>
            { count }
        </span>
    )
}
export const GSTestButton: React.FC  = () => {
        const { dispatch } = useStateContext()
        return (
            <div>
                <button onClick={(e) => { dispatch && dispatch({ type: State.ActionType.INCREMENT }); }}>{ActionType.INCREMENT}</button>
                <button onClick={(e) => { dispatch && dispatch({ type: State.ActionType.DECREMENT }); }}>{ActionType.DECREMENT}</button>
                <button onClick={(e) => { dispatch && dispatch({ type: State.ActionType.RESET }); }}>{ActionType.RESET}</button>
            </div>
        )
}