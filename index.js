const redux = require('redux')
const reduxlogger=require('redux-logger')
const createStore = redux.createStore
const logger = reduxlogger.createLogger()
const applyMiddleware = redux.applyMiddleware

// redux provide feature to combine multiple reducer in single root

const combineReducer =redux.combineReducers

// Action intialize
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

// Action Type
function buyCake(){
    return{
        type: BUY_CAKE,
        info: 'First redux action'
    }  
}

function buyIceCream(){
    return{
        type: BUY_ICECREAM,
        info: 'Second redux action'
    }
}
// state intiallize
//const initialState = {
//    numOfCake:10,
//    numOfIceCream:20
//}
 
// split the initialstate

const initialCakeState={
    numOfCake:10
}

const initialIceCream ={
    numOfIceCream:20
}

// reducer function that take input action + previous state

//const reducer = (state = initialState, action) => {
//
//    switch(action.type) {
//
//     case BUY_CAKE: return { 
//         ...state,                           // if we want to not update orginal state then we have use spread operator to make of copy of state object
//         numOfCake: state.numOfCake - 1
//     }
//
//     case BUY_ICECREAM: return{
//         ...state,
//         numOfIceCream: state.numOfIceCream-1
//     }
//
//     default: return state;
//    }
//}
//
// Split the the reducer in multiple reducer

const cakeReducer =(state=initialCakeState,action)=>{
      
    switch(action.type){
        case BUY_CAKE : return{
            ...state,
            numOfCake: state.numOfCake-1
        }
        default: return state
    }
}

const iceCreamReducer =(state = initialIceCream, action)=>{
    switch(action.type){
        case BUY_ICECREAM: return{
            ...state,
            numOfIceCream:state.numOfIceCream-1
        }

        default: return state;
    }
}

// Define rootReducer that has key value pair of multiple reducer

const rootReducer=combineReducer({
    cake:cakeReducer,
    ice: iceCreamReducer
})
//Implement  store & its responsiblity

// First responsibility is hold Application state & take input reducer function
//const store = createStore(reducer)

// Now pass the root reducer to createStore  method
const store = createStore(rootReducer,applyMiddleware(logger))

// Second responsibility Allow to acces the state via "getState()" using syntax store.getState()
console.log("Initial state:",store.getState());
//Fourth responsibilty is Register lisnter via "subscribe(lisnter)"
 //const unsubscribe=store.subscribe(()=>console.log("Update state:", store.getState()));     // unsubscribed is fifth step 
// using middleware to log the status
 const unsubscribe=store.subscribe(()=>{});     // unsubscribed is fifth step 

// Third responsibilty allow state to be updated via dispatch(action);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
// Fifth & last responsibility is unsubscribed the register lisnter;

unsubscribe();


