enum Action {
  INCREMENT = 'INCREMENT',
  ADD_NODE = 'ADD_NODE',
}

type State = {
  nodes: any[];
};

const initialState = {
  nodes: [],
};

export default (state = initialState, action: any): State => {
  switch (action.type) {
    case Action.ADD_NODE:
      return {
        nodes: action.payload,
      };
    case Action.INCREMENT:
      return {
        nodes: action.payload,
      };
    default:
      return state;
  }
};

export const addNode = (payload: any) => {
  return {
    type: Action.ADD_NODE,
    payload,
  };
};

export const increment = (payload: any) => {
  return {
    type: Action.INCREMENT,
    payload,
  };
};
