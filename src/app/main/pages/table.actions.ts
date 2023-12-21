import { createAction, props } from '@ngrx/store';
import { createReducer, Action, on } from '@ngrx/store';
import { addData, loadTableDataSuccess } from './table.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { loadTableData, loadTableDataSuccess } from './table.actions';


export const addData = createAction(
  '[Table] Add Data',
  props<{ newData: any }>()
);

export const loadTableData = createAction('[Table] Load Data');
export const loadTableDataSuccess = createAction(
  '[Table] Load Data Success',
  props<{ tableData: any[] }>()
);
export interface TableState {
    data: any[];
    loading: boolean;
  }
  
  export const initialState: TableState = {
    data: [],
    loading: false
  };
  
@Injectable()
export class TableEffects {
  loadTableData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTableData),
      switchMap(() => this.tableDataService.getTableData()),
      map((tableData) => loadTableDataSuccess({ tableData }))
    )
  );

  constructor(
    private actions$: Actions,
    private tableDataService: TableDataService
  ) {}
}

  const tableReducer = createReducer(
    initialState,
    on(addData, (state, { newData }) => ({
      ...state,
      data: [...state.data, newData]
    })),
    on(loadTableDataSuccess, (state, { tableData }) => ({
      ...state,
      data: tableData,
      loading: false
    }))
  );
  
  export function reducer(state: TableState | undefined, action: Action) {
    return tableReducer(state, action);
  }
  
function createReducer(initialState: TableState, arg1: any, arg2: any) {
    throw new Error('Function not implemented.');
}

