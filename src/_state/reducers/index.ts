import stateReducer from './stateReducer'
import userReducer from './userReducer'
import messageReducer from './messageReducer'

const reducers = {
    state: stateReducer,
    events: userReducer,
    messags: messageReducer,
}

export default reducers