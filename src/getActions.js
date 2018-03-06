import bindActionCreators from './bindActionCreators';
import generateActionCreators from './generateActionCreators';
import { registerActions } from './connectWithActions';
const getActions = (defs, store, additionalParams = {}) => {
  const actions = {};
  
  Object.keys(defs).forEach(key => {
    const def = defs[key];
    actions[key] = bindActionCreators({
      actionCreators: generateActionCreators(def),
      def,
      dispatch: store.dispatch,
      store,
      key,
      ...additionalParams
    });
  });
  
  registerActions(actions);
  return actions;
}

export default getActions;