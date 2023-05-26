import { legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = compose;

export default createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
)