import { Card } from "react-bootstrap"
import { Paymentinfo } from "../../constant"

interface paymentprops{
      totalcost:number,
      totalitems:number
}

function PaymentInfo(props:paymentprops) {
      
  return (
      <Card className="flex-column-center gap20">
            <Card.Text>{Paymentinfo.totalsummay}</Card.Text>
            <Card.Text>{`${Paymentinfo.totalcost}:${props.totalcost}`}</Card.Text>
            <Card.Text>{`${Paymentinfo.totalitems}:${props.totalitems}`}</Card.Text>
      </Card>
  )
}

export default PaymentInfo