import { products as prods, pricingInfo as pInfo } from "../MockData";
 
/**
 * Constants
 */

export const GET_PRODUCTS = "products/GET_PRODUCTS";
export const GET_PRICINGINFO = "products/GET_PRICINGINFO";
export const EDIT_PRODUCT = "products/EDIT_PRODUCT";
export const UPDATE_PRODUCT = "products/UPDATE_PRODUCT";

/**
 * Action Creators
 */
export function getProducts() {
  return async (dispatch, getState) => {
    try {
      const productsInMem = JSON.parse(localStorage.getItem("products"));
      if(!!productsInMem) {
        dispatch({
          type: GET_PRODUCTS,
          data: productsInMem
        });
      } else {
        localStorage.setItem("products", JSON.stringify(prods));
        dispatch({
          type: GET_PRODUCTS,
          data: prods
        });
      }

      dispatch({
        type: GET_PRICINGINFO,
        data: pInfo
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPricingInfo() {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_PRICINGINFO,
        data: pInfo
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editProduct(name) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_PRODUCT,
        data: name
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateProduct(name, product) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_PRODUCT,
        data: { name, product }
      });
    } catch (error) {
      console.log(error);
    }
  };
}



/**
 * Reducer
 */

const initialState = {
  products: [],
  product: null,
  pricingInfo: null
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      return { ...state, products: action.data };
    }

    case EDIT_PRODUCT: {
      const products = JSON.parse(localStorage.getItem("products"));
      const productToEdit = products.find(p => p.name === action.data);
      return { ...state, product: productToEdit };
    }

    case GET_PRICINGINFO: 
    return { ...state, pricingInfo: action.data };

    case UPDATE_PRODUCT: {
      const products = state.products;
      const index = products.findIndex(product => product.name === action.data.name);

      if(index !== -1) {
        products[index] = action.data.product;
      }

      localStorage.setItem("products", JSON.stringify(products));
      return { ...state, products };
    }

    default:
      return state;
  }
}
