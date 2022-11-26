import React, { useContext, useReducer, useEffect } from 'react'
// import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  amount: 0,
  cart: [],
  total: 0,
loading : false
}

const AppProvider = ({ children }) => {
  const [state , dispatch] = useReducer(reducer , initialState)

  const clearCart = () =>{
    dispatch({type: 'CLEAR_CART'})
  }

  const removeItem = (id) =>{
    dispatch ({type : 'REMOVE_ITEM' , payload : id})
  }

  const increase = (id) =>{
    dispatch({type : 'INCREASE', payload : id })
  }
  const decrease = (id) =>{
    dispatch({type : 'DECREASE' , payload : id  })
  }

  const updateAmount = (id)=> {
      dispatch({type : "NEW_AMOUNT"})
  }

  const fetchApiData = async ()=>{
    dispatch({type : 'LOADING'})
    const res = await fetch(url);
    const ApiData = await res.json()
    dispatch({type:'API_DATA' , payload:ApiData})
  }

  useEffect(()=>{
    fetchApiData()
  }, [])

  useEffect(()=>{
     dispatch({type : 'GET_TOTAL'});
  },[state.cart])

  return (
    <AppContext.Provider
      value={
        {...state, clearCart , increase , decrease , removeItem , updateAmount}
      }
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
