import  { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FormCredentials, Address as address } from '../../constant';
import colors from '../../assets/theme/colors.module.scss';
import { addressSchema } from '../../validation/Formvalidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
type AddressData={
Address:string
}
function Address() {
  const [input, setInput] = useState(false);
  const [addressMsg, setAddressMsg] = useState('Enter your Address');


  function Addresssubmit(data:AddressData) {
    setInput(false);
    setAddressMsg(data.Address);
    localStorage.setItem('Address',data.Address)
  }
  const {
    handleSubmit: HandleSubmit,
    setValue: setAddress,
    formState: { errors: AddressError }
} = useForm<AddressData>({
    resolver: yupResolver(addressSchema)
});

  return (
    <div>
      <Card
        className="flex-row-between gap20 mt-5 dropdown-toggle"
        style={{ height: '120px', borderRadius: '10px' }}
        onClick={() => setInput(!input)}
      >
        <h5 className="gilroy text-secondary">{addressMsg}</h5>
      </Card>
      {input ? (
        <Card
          className="mt-5 flex-row-center mb-5"
          style={{ height: '120px', borderRadius: '10px' }}
        >
          <Form onSubmit={HandleSubmit(Addresssubmit)}>
            <Form.Group className="flex-row-center gap20">
              <Form.Control
                type="text"
                placeholder={address.enteryouraddress}
                style={{ backgroundColor: colors.B1, border: 'none',width:'40vh'}}
                // value={addressInfo==='Enter your Address'?'':addressInfo}
                onChange={(e) => setAddress("Address", e.target.value)}/>
              <Button
                className="gilroy padding15"
                style={{ borderRadius: '100px' }}
                type="submit"
              >
                {FormCredentials.Submit}
              </Button>
            </Form.Group>
            <Form.Text className='text-danger'>{AddressError.Address?.message}</Form.Text>

          </Form>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Address;
