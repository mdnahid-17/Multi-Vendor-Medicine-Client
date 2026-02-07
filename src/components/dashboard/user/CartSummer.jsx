import { Link } from "react-router"


const CartSummer = ({selectTotalPrice,cartItems}) => {
  return (
     <div className="p-4 mt-6 border rounded">
      <h3 className="text-xl font-semibold uppercase">Subtotal</h3>
      <p className='py-4'>Total Items: <b>{cartItems.length}</b></p>
      <p>Total Price: $<b>{Number(selectTotalPrice).toFixed(2)}</b></p>

      <Link 
      to={'/checkout-page'}
        state={{ cartItems,totalPrice:selectTotalPrice }}
        className="w-full mt-4 btn btn-primary"
      >
        Checkout
      </Link>
    </div>
  )
}

export default CartSummer