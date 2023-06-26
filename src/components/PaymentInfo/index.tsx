import { Card } from "react-bootstrap"
import { Paymentinfo } from "../../constant"
import gpay from '../../assets/images/gpay.png'
import phonepay from '../../assets/images/phonepay.png'
import { useNavigate } from "react-router-dom"
import { generateOrderno } from "../../functions/generateOrderno"


interface paymentprops{
      totalcost:number,
      totalitems:number
}

function PaymentInfo(props:paymentprops) {
      const navigate=useNavigate()
      
  return (
      <Card className="flex-column gap20">
            <Card.Text >{Paymentinfo.totalsummay}</Card.Text>
           <div className="flex-column-center gap10">
           <Card.Text >{`${Paymentinfo.totalcost}:${props.totalcost}`}</Card.Text>
            <Card.Text >{`${Paymentinfo.totalitems}: ${props.totalitems}`}</Card.Text>
            <Card.Text >{Paymentinfo.Paymentmethods}</Card.Text>
            <div className="gap20 flex-row-center mb-5">
             <Card.Img src={gpay} className="paymentmode" onClick={()=>{localStorage.setItem('orderno',generateOrderno())
navigate('/order-success')}}/>
             <Card.Img src={phonepay} className="paymentmode" onClick={()=>{
                  localStorage.setItem('orderno',generateOrderno())
                  navigate('/order-success')}}/>
            </div>
           </div>
      </Card>
  )
}

export default PaymentInfo