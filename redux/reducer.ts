enum Action {
  INCREMENT = 'INCREMENT',
  ADD_NODE = 'ADD_NODE',
  COUNTER = 'COUNTER',
}

export interface ITree {
  [key: string]: INode;
}
export interface INode {
  id: string;
  counter: number;
  kids: string[];
}

const rootNode: INode = {
  id: '0',
  counter: 0,
  kids: [],
};

type State = {
  nodesCounter: number;
  tree: ITree;
};

const initialState = {
  nodesCounter: 1,
  tree: {
    ['0']: rootNode,
  },
};

export default (
  state = initialState,
  action: {type: Action; payload: string},
): State => {
  switch (action.type) {
    case Action.INCREMENT: {
      let temp = {...state.tree};
      temp[action.payload].counter += 1;
      return {
        ...state,
        tree: temp,
      };
    }
    case Action.ADD_NODE: {
      let temp = {
        ...state.tree,
        [state.nodesCounter.toString()]: {
          id: state.nodesCounter.toString(),
          counter: 0,
          kids: [],
        },
      };
      let tempKids = temp[action.payload].kids;
      temp[action.payload].kids = [...tempKids, state.nodesCounter.toString()];
      return {
        nodesCounter: state.nodesCounter + 1,
        tree: temp,
      };
    }
    default:
      return state;
  }
};

export const addNode = (payload: string) => {
  return {
    type: Action.ADD_NODE,
    payload,
  };
};

export const increment = (payload: string) => {
  return {
    type: Action.INCREMENT,
    payload,
  };
};
