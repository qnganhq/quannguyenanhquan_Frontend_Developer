import React, { useEffect, useState } from 'react'
import ProductItem from '../ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { Product } from '../../../../types/product.type'
import axios from 'axios'
import { getProductList, getProductListSearchDebounce,  } from '../../../../product.reducer'
import $ from 'jquery'
import useDebounce from '../Debounce/useDebounce'


export default function ProductList() {
    const dispatch = useDispatch();
    const [search,setSearch] =useState <string|null>('')
    const [loading,setLoading] = useState(false);
    const [page, setPage] = useState<number>(1)
    const { productList } = useSelector((state: RootState) => state.productReducer);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearch = useDebounce(search,500);
    const getProductionList = async () => {
        setIsLoading(true);
        try {
            const offset = (page - 1) * 20;
            const res = await axios.get(`https://dummyjson.com/products?limit=20&skip=${offset}`)
            setIsLoading(false);
            if (res.status === 200) {
                setPage(page + 1)
                dispatch(getProductList(res.data.products))
            }
        } catch (error) {
            setIsLoading(false);
        }
    }

    const handleScroll = () => {
        const a: any = window.innerHeight;
        const b: any = document.documentElement.scrollTop;
        const c: any = document.documentElement.offsetHeight;

        if (a + b !== c || isLoading || page > 5) {
            return;
        }
        getProductionList();
    };

    useEffect(() => {
        getProductionList();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);
   

    useEffect(()=>{
        async function getProductListSearch() {
            setLoading(true);
            const res = await axios.get(`https://dummyjson.com/products/search?q=${debouncedSearch}`)
            dispatch(getProductListSearchDebounce(res.data.products))
        }

        getProductListSearch()
    },[debouncedSearch])
    return (
        <div className='container' style={{ overflow: 'hidden' }}>
           <input type="search" onChange={(e)=>setSearch(e.target.value)} />
            <div className="row text-center">
                {
                 productList.map((item, index) => {
                    return <ProductItem product={item} key={index} />
                })
                }
            </div>

        </div>
    )
}
