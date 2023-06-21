import React from 'react'
import { Container } from 'react-bootstrap'
import Navheader from '../Navbar'
import CartElement from '../CartElement'
import { Hotelcardprops } from '../FoodCards'


function Cart() {
    const [cartitems,setcartItems]=React.useState<Hotelcardprops[]>()
    React.useEffect(() => {
        const items = localStorage.getItem('cartItems');
        if (items) {
          setcartItems(JSON.parse(items));
        }
      }, [cartitems]);
    
  return (
    <Container>
        <Navheader/>
        
        <div className="main-content">
            {
                cartitems?.map((cartitems)=>{
                    return(<CartElement  name={cartitems.name} costperItem={cartitems.costperItem} quantity={cartitems.quantity} totalcost={Number(cartitems.costperItem)*cartitems.quantity} sold={false}  />)
                })
            }

        </div>
    </Container>
  )
}

export default Cart