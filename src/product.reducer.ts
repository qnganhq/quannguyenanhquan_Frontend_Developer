import {createAction, createReducer} from '@reduxjs/toolkit'
import { Product } from './types/product.type'
import { initalProductList } from './constants/product'
interface ProductState{
    productList:Product[],

}
const inittalState:ProductState ={
    productList:initalProductList,

}
export const getProductList = createAction<Product[]>('getProductList')

export const getProductListSearchDebounce = createAction<Product[]>('getProductListSearch')
const productReducer = createReducer(inittalState,(builder)=>{
    builder.addCase(getProductList,(state,action)=>{
        const product = action.payload
        state.productList = [...state.productList,...product];
    });

    builder.addCase(getProductListSearchDebounce,(state,action)=>{
        const productSearch = action.payload
        state.productList = productSearch
     
    });
})
export default productReducer