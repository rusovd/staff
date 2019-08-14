import {ADD_LINE, DELETE_LINE, UPDATE_LINE, SORT_LINES, FETCH_LINES} from "../constants";

const addLine = (action) => {
  return {
    id: (+ new Date()) + Math.random(),
    name: action.name,
    role: action.role,
    status: action.status,
    conOn: new Date(action.conOn).toISOString().slice(0,10)
  }
}

const removeById = (state =[], id) => {
  return state.filter(line => line.id !== id);
}

const sortByField = (state =[], field, order) => {
  const lines = state.slice();

  lines.sort((a, b) => {

    if(a[field] < b[field]) {
      return (order === 'asc') ? -1 : 1;
    }
    if(a[field] > b[field]) {
      return (order === 'asc') ? 1 : -1;
    }
    return 0;
  });

  return lines;
}

const updateById = (state, action) => {
  return state.map(
    line => line.id===action.id ? {...line, status: action.status} : line
  );
}

const lines = (state = [], action) => {
  switch (action.type) {

    case FETCH_LINES:
      return action.lines;

    case ADD_LINE:
      return [addLine(action), ...state];

    case DELETE_LINE:
      return removeById(state, action.id);

    case UPDATE_LINE:
      return updateById(state, action);

    case SORT_LINES:
      return sortByField(state, action.field, action.order);

    default:
      return state;
  }
}

export default lines;
