import { STATE_ID } from '../constants/identifiers';

export const saveState = (state) => {
  if(typeof(Storage) !== 'undefined'){
    try{
      localStorage.setItem(
        STATE_ID,
        JSON.stringify(state));
    }
    catch(error){
      // console.log("Cannot save state.");
    }
  }
}

export const loadState = () => {
  if(typeof(Storage) !== 'undefined'){
    try{

      let state = localStorage.getItem(STATE_ID);

      if(state) return JSON.parse(state);

      return  undefined;
    }
    catch(error){
      return undefined;
    }
  }
}