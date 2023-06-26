import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FormCredentials, Address as address } from "../../constant";
import colors from "../../assets/theme/colors.module.scss";
import { addressSchema } from "../../validation/Formvalidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React from "react";
type AddressData = {
    Address: string;
};
function Address() {
    const [input, setInput] = useState(false);
    const [addressMsg, setAddressMsg] = useState("Enter your Address");

    function Addresssubmit(data: AddressData) {
        setInput(false);
        setAddressMsg(data.Address)
        localStorage.setItem("Address", data.Address);
    }
    const {
        handleSubmit: HandleSubmit,
        setValue: setAddress,
        formState: { errors: AddressError }
    } = useForm<AddressData>({
        resolver: yupResolver(addressSchema)
    });
    React.useEffect(()=>{
      const items = localStorage.getItem("Address");
        if (items) {
          setAddressMsg(items)
        }
        
    })

    return (
        <div>
            <Card className="flex-row-between gap20 mt-5 dropdown-toggle" style={{ height: "120px", borderRadius: "10px" }} onClick={() => setInput(!input)}>
                <h5 className="gilroy text-secondary">{addressMsg}</h5>
            </Card>
            {input ? (
                <Card className="" style={{ height: "120px", borderRadius: "10px" }}>
                    <Form onSubmit={HandleSubmit(Addresssubmit)}>
                        <Form.Group className="gap30 ">
                            <div className="row ">
                              <div className="col-1"></div>
                              <div className="col-8 flex-row-center ">
                              <Form.Control
                                type="text"
                                placeholder={address.enteryouraddress}
                                style={{ backgroundColor: colors.B1, border: "none"}}
                                onChange={(e) => setAddress("Address", e.target.value)}
                            />
                              </div>
                              <div className="col-2 flex-column-center">
                              <Button className="gilroy padding10" style={{ borderRadius: "100px" }} type="submit">
                                {FormCredentials.Submit}
                            </Button>
                              </div>
                            </div>
                           
                        </Form.Group>
                        <Form.Text className="text-danger">{AddressError.Address?.message}</Form.Text>
                    </Form>
                </Card>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Address;