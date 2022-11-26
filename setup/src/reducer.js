// import CartItem from "./CartItem";

const Reducer = (state , action ) =>{
    if(action.type === "CLEAR_CART"){
      return {...state , cart: []}
    }

    if (action.type === "REMOVE_ITEM"){
         let removeItem = state.cart.filter((eachItem)=>{
            return eachItem.id !== action.payload;
         })
         return {...state , cart : removeItem}
    }


    if(action.type === 'INCREASE') {
        let newQty = state.cart.map((eachItem)=>{
            if(eachItem.id === action.payload){
                return { ...eachItem , amount : eachItem.amount + 1 }
            }
            return eachItem;
        })
        return {...state , cart : newQty}
    }

    if(action.type === 'DECREASE') {
        let newQty = state.cart.map((eachItem)=>{
            if(eachItem.id === action.payload){
                return { ...eachItem , amount : eachItem.amount - 1 }
            }
            return eachItem;
        });
        // deleting item when amount become lower than 1
        let deleteItemAtZero= newQty.filter((eachItem)=>{
            return eachItem.amount > 0;
        })
        return {...state , cart : deleteItemAtZero}
    }

    if(action.type === 'GET_TOTAL'){
        let {amount , total} = state.cart.reduce((cartTotal , cartItem)=>{
            const {amount , price} = cartItem;
            const newTotalCost = amount * price;
            
             cartTotal.amount += amount
             cartTotal.total  += newTotalCost
            return cartTotal
        } ,{amount:0 , total:0})

        total = parseFloat(total.toFixed(2))

        return {...state ,amount ,total}
    }

  if(action.type === 'LOADING'){
    return {...state , loading : true}
  }
  
  if(action.type === 'API_DATA'){
    return {...state ,cart:action.payload, loading : false }
  }
  
    throw new Error ('No matching action');
}

export default Reducer