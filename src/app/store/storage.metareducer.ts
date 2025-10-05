import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppState } from './app.state';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['meals'],
    rehydrate: true,
    storage: localStorage,
    removeOnUndefined: true,
    restoreDates: false,
    checkStorageAvailability: true,
    syncCondition: () => true
  })(reducer);
}

export const metaReducers: Array<MetaReducer<AppState>> = [localStorageSyncReducer];