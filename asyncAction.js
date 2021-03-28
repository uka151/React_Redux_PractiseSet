const redux =require('redux');
const axios = require('axios')
const createStore=redux.createStore;
const applyMiddleware= redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const initialState = {
    loading:true,
    users:[],
    error:''
}

// Action type
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURS = 'FETCH_USERS_FAILURS'

// Action

const fetchUsersRequest=()=>{
    return {
        type:FETCH_USERS_REQUEST,
    }
}

const fetchUsersSuccess=users=>{
    return {
        type:FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailurs=error=>{
    return {
        type: FETCH_USERS_FAILURS,
        payload: error
    }
}

// Reducer

const reducer =(state =initialState, action)=>{
     switch(action.type){
         case FETCH_USERS_REQUEST : return{
             ...state,
             loading:true
         }

         case FETCH_USERS_SUCCESS: return {
             ...state,
             loading:false,
             users:action.payload,
             error:''

         }

         case FETCH_USERS_FAILURS: return {
             ...state,
             loading:false,
             users:[],
             error:action.payload
         }

         default: return state
     }
}  
// Main Action acreator
    fetchusers=()=>{
        return function(dispatch){
            dispatch(fetchUsersRequest());
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response=>{
                //if success then recieve response.data
                  const users=response.data
                   dispatch(fetchUsersSuccess(users));
            })
            .catch(error=>{
               const errors=error.message
               dispatch(fetchUsersFailurs(errors));
            })
        }
    }


const store =createStore(reducer,applyMiddleware(thunkMiddleware));

store.subscribe(()=>console.log(store.getState()));

store.dispatch(fetchusers());

