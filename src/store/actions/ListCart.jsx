// const ADD_TO_CART = 'ADD_TO_CART';
// const UPDATE_CART = 'UPDATE_CART';
// const DELETE_FROM_CART = 'DELETE_FROM_CART';



// export const AddToCart = (productId) => {

//    return {
//       type: 'ADD_TO_CART',
//       payload: productId
//    };

// }

// export const UpdateCart = (productId, quantity) => {
//    return {
//       type: 'UPDATE_CART',
//       payload: {
//          productId,
//          quantity
//       }
//    };
// };

// export const DeleteCart = (productId) => {
//    return {
//       type: 'DELETE_FROM_CART',
//       payload: productId
//    };
// };



// productReducer.js
// const initialState = {
//    products: [],
//  };
 
//  const productReducer = (state = initialState, action) => {
//    switch(action.type) {
//      case 'ADD_PRODUCT':
//        return {
//          ...state,
//          products: [...state.products, action.payload],
//        };
//      case 'DELETE_PRODUCT':
//        return {
//          ...state,
//          products: state.products.filter(product => product.id !== action.payload),
//        };
//      // Các cases khác...
//      default:
//        return state;
//    }
//  };
 
//  export default productReducer;


// productActions.js
// export const addProduct = (product) => {
//    return {
//      type: 'ADD_PRODUCT',
//      payload: product,
//    };
//  };
 
//  export const deleteProduct = (productId) => {
//    return {
//      type: 'DELETE_PRODUCT',
//      payload: productId,
//    };
//  };