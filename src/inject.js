import registry from './registry'
import connectWithActions from './connectWithActions';
function takeKeys(obj, keys) {
  let next = {};
  keys.forEach(key => next[key] = obj[key]);
  return next;
}

function selectFromState(state, selectorKeys, selectors) {
  let next = {};
  selectorKeys.forEach(key => {
    try {
      const keys = key.split('.');
      if (keys.length === 1) {
        next[keys[0]] = state[keys[0]];
      } else if (keys.length === 2) {
        next = {
          ...next,
          ...selectors[keys[0]][keys[1]](state)
        }
      }
    } catch(e) {
      console.error(e);
    }
  })
  return next;
}

export default function inject(...keys) {
  return connectWithActions((state, ownProps, actions) => {
    const selectors = registry.get('selectors');
    return {
      ...selectFromState(state, keys, selectors),
      actions
    };
  });
}