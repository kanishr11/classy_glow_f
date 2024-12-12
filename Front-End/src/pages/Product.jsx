import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  // console.log(productId);
  const {products,currency,addToCart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');

  const fetchProductData = async() =>{
      products.map((item)=>{
        if(item._id === productId){
          setProductData(item)
          //console.log(item)
          setImage(item.image[0])
          return null;
        }
      })
  }

  useEffect(()=>{
    fetchProductData();
  },[productId]) //correct it 

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm;gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item,index)=>(
              <img onClick={()=>setImage(item)} src={item} key={index} alt="item_images" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
            ))}
          </div>
          <div className='w-full sm:w-[80%'>
              <img src={image} className='w-full h-auto' alt="product_image" />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-4 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-4 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-600' : 'border-gray-300'}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
            <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
            <hr  className='mt-8 sm:w-4/5 border-gray-300'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p className=''>100% Original product.</p>
                <p className=''>Cash on delivery is available on this product.</p>
                <p className=''>Easy return and exchange policy within 7 days.</p>
            </div>
        </div>
      </div>
      {/* Description & review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Review (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed earum saepe dolor corrupti explicabo voluptatem voluptates distinctio sint rerum inventore ratione aperiam delectus hic numquam, temporibus deserunt nam pariatur sunt.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia minima temporibus non neque sint minus nostrum error repellendus quibusdam provident, eligendi quo! Praesentium dolores similique perspiciatis. Odio molestiae dolores iure?</p>   
        </div>
      </div>
      {/* display related product */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product