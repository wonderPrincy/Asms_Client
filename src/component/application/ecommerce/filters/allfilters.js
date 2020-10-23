import React, { Fragment } from 'react';
import InputRange from 'react-input-range';
import { getBrands,getColors,getMinMaxPrice } from '../../../../redux/service/index';
import {filterBrand,filterColor,filterPrice} from '../../../../redux/filter/action'
import { useDispatch,useSelector } from 'react-redux';
const Allfilters = () =>  {

    const data = useSelector(content => content.data.productItems);
    const brands = getBrands(data);
    const colors = getColors(data);
    const prices = getMinMaxPrice(data);
    const filteredBrand = useSelector(content => content.filters.brand);
    const dispatch = useDispatch()
    
    const value = useSelector(content => content.filters.value);

    const clickBrandHendle = (event, brands) => {    
        var index = brands.indexOf(event.target.value);

        if (event.target.checked === true)
            brands.push(event.target.value); // push in array checked value
        else
            brands.splice(index, 1); // removed in array unchecked value

        dispatch(filterBrand(brands));
    }

    const colorHandle = (event, color) => {        
        var elems = document.querySelectorAll(".color-selector ul li");
        [].forEach.call(elems, function (el) {
            el.classList.remove("active");
        });
        event.target.classList.add('active');
        dispatch(filterColor(color));
    }
    
    return (
        <Fragment>
            {/*get brands */}
            <div className="product-filter">
                <h6 className="f-w-600">Brand</h6>
                <div className="checkbox-animated mt-0">
                    {brands.map((brand, index) => {
                        return (
                            <label className="d-block" key={index}>
                                <input className="checkbox_animated" onClick={(e) => clickBrandHendle(e, filteredBrand)}
                                    value={brand} defaultChecked={filteredBrand.includes(brand) ? true : false}  id={brand} type="checkbox" data-original-title="" title="" />
                                {brand}
                            </label>
                        )
                    })}
                </div>
            </div>

             {/* color */}
            <div className="product-filter slider-product">
                <h6 className="f-w-600">Colors</h6>
                <div className="color-selector">
                    <ul>
                        {colors.map((color, i) => {
                            return (
                                <li className={color} key={i} title={color} onClick={(e) => colorHandle(e, color)}></li>
                            )
                        })}

                    </ul>
                </div>
            </div>

               {/* price filter */}

               <div>
               <div className="product-filter pb-0">
                    <h6 className="f-w-600">Price</h6>
                    <InputRange
                        maxValue={prices.max}
                        minValue={prices.min}
                        value={value}
                        onChange={value => dispatch(filterPrice({ value }))} />
                </div>
            </div>

        </Fragment>
    );
}

export default Allfilters