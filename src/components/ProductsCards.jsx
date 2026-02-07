import { useParams } from "react-router"

const ProductsCards = ({product}) => {
    
    const {category} =useParams()

    console.log(product);
    
  return (
    <div>ProductsCards
           <Link to={`/subCategory/${category}`}>
          <div className="w-2/3 mx-4 border border-gray-400 rounded-lg cursor-pointer hover:btn-info">
            <img className="object-cover py-8 mx-auto lg:py-12" src={product.image} alt="" />
            <div className="text-center">
                <h3>{product.price_per_unit}</h3>
              <h4 className="pb-2 text-base lg:text-xl">Category: {product.category}</h4>
              <button className="w-full text-base btn lg:text-lg hover:text-white">See Details</button>
            </div>
          </div>
        </Link> 
    </div>
  )
}

export default ProductsCards