import {ADD_LINE, DELETE_LINE, UPDATE_LINE, SORT_LINES, FETCH_LINES} from '../constants';

export const addLine = (line) => ({type: ADD_LINE, name: line.name, role: line.role, conOn: line.conOn, status: line.status})

export const deleteLine = (id) => ({type: DELETE_LINE, id})

export const updateLine = (line) => ({type: UPDATE_LINE, id:line.id, name: line.name, role: line.role, conOn: line.conOn, status: line.status})

export const sortLines = (field, order) => ({type: SORT_LINES, field, order})

export const fetchLines = (lines) => ({type: FETCH_LINES, lines})
