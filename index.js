const redux = require('redux')
const createStore = redux.createStore

// Action intialize
const BUY_CAKE = 'BUY_CAKE'

// Action Type
function buyCake(){
    return{
        type: BUY_CAKE,
        info: 'First redux action'
    }  
}

// state intiallize
const initialState = {
    numOfCake:10
}

// reducer function that take input action + previous state

const reducer = (state = initialState, action) => {

    switch(action.type) {

     case BUY_CAKE: return { 
         ...state,                           // if we want to not update orginal state then we have use spread operator to make of copy of state object
         numOfCake: state.numOfCake - 1
     }

     default: return state;
    }
}



//Implement  store & its responsiblity

// First responsibility is hold Application state & take input reducer function
const store = createStore(reducer)
// Second responsibility Allow to acces the state via "getState()" using syntax store.getState()
console.log("Initial state:",store.getState());
//Fourth responsibilty is Register lisnter via "subscribe(lisnter)"
 const unsubscribe=store.subscribe(()=>console.log("Update state:", store.getState()));     // unsubscribed is fifth step 

// Third responsibilty allow state to be updated via dispatch(action);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
// Fifth & last responsibility is unsubscribed the register lisnter;
store.dispatch(buyCake());
unsubscribe();
  