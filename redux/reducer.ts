enum Action {
  INCREMENT = 'INCREMENT',
  ADD_NODE = 'ADD_NODE',
  COUNTER = 'COUNTER',
}

type State = {
  nodesCounter: number;
};

const initialState = {
  nodesCounter: 1,
};

export default (state = initialState, action: any): State => {
  switch (action.type) {
    case Action.COUNTER:
      return {
        ...state,
        nodesCounter: state.nodesCounter + 1,
      };
    default:
      return state;
  }
};

// export const addNode = (payload: any) => {
//   return {
//     type: Action.ADD_NODE,
//     payload,
//   };
// };

// export const increment = (payload: any) => {
//   return {
//     type: Action.INCREMENT,
//     payload,
//   };
// };

export const counter = () => {
  console.log('counter ');
  return {
    type: Action.COUNTER,
  };
};
