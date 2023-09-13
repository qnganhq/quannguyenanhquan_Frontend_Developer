import React from 'react'
import { Product } from '../../../../types/product.type'
interface ProductItemType {
    product: Product
}
export default function ProductItem(props: ProductItemType) {
    return (
        <div className="col-lg-3">
            <div className="card text-left mt-3">
                <img style={{ width: "100%" }} className="card-img-top" src={props.product.thumbnail} alt={props.product.title} />
                <div className="card-body">
                    <h4 className="card-title">{props.product.title}</h4>
                    <p className="card-text">{props.product.description}</p>
                    <p className="card-text">{props.product.price}</p>
                </div>
            </div>
        </div>


    )
}
