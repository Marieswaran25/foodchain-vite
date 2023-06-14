import { Form, Button, Container } from "react-bootstrap";
import {FormCredentials} from '../../constant'
import homepage from '../../assets/images/homepageimg.jpg'
import { SignupSchema } from "../../validation/Formvalidation";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React from "react";

type FormData = Yup.InferType<typeof SignupSchema  >;
 
const SignupForm = () => {

  const onsubmit=(data:FormData)=>{
    console.log(data)
  }
  const [password,setpassword]=React.useState({
    Password:"Password",
    ConfirmPassword:"Password"
  })
  const {  handleSubmit,setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(SignupSchema)
  });  
  function PasswordtoText(e: React.MouseEvent<SVGSVGElement,MouseEvent>){
    if (e.currentTarget.id === "Password") {
      password.Password === "Password"
        ? setpassword({ ...password, Password: "text" })
        : setpassword({ ...password, Password: "Password" });
    }
    if (e.currentTarget.id === "ConfirmPassword") {
      password.ConfirmPassword === "Password"
        ? setpassword({ ...password, ConfirmPassword: "text" })
        : setpassword({ ...password, ConfirmPassword: "Password" });
    }
  }
  return (
   <Container>
     <div className="row flex-row-center full gap20">
      <div className="col-md-4 col-12">
      <Form className="flex-column gap20" onSubmit={handleSubmit(onsubmit)}>
        <Form.Group >
          <Form.Label className="commonlabel">{FormCredentials.Email}</Form.Label>
          <Form.Control type="Email"  onChange={e=>setValue('Email',e.currentTarget.value)} />
          <Form.Text className="text-danger">{errors.Email?.message}</Form.Text>
        </Form.Group>
        <Form.Group className="gap20" >
          <Form.Label className="commonlabel">{FormCredentials.Firstname}</Form.Label>
          <Form.Control type="text" onChange={e=>setValue('FirstName',e.currentTarget.value)}  />
          <Form.Text className="text-danger">{errors.FirstName?.message}</Form.Text>

        </Form.Group>
        <Form.Group>
          <Form.Label className="commonlabel">{FormCredentials.Lastname}</Form.Label>
          <Form.Control type="text" onChange={e=>setValue('LastName',e.currentTarget.value)}  />
          <Form.Text className="text-danger">{errors.LastName?.message}</Form.Text>

        </Form.Group>
        <Form.Group>
          <Form.Label className="commonlabel">{FormCredentials.Mobile}</Form.Label>
          <Form.Control type="number" inputMode="numeric" onChange={e=>setValue('phoneNumber',e.currentTarget.value)} />
          <Form.Text className="text-danger">{errors.phoneNumber?.message}</Form.Text>

        </Form.Group>
        <Form.Group>
          <Form.Label className="commonlabel">{FormCredentials.Password}</Form.Label>
          <div className="flex-row-center">
          <Form.Control type={password.Password} onChange={e=>setValue('Password',e.currentTarget.value)} />
          <FontAwesomeIcon icon={password.Password==='Password'?faEyeSlash:faEye} className="text-dark" id="Password" style={{marginLeft:"-30px" , cursor: "pointer"}} onClick={e=>PasswordtoText(e)}></FontAwesomeIcon>
          </div>

          <Form.Text className="text-danger">{errors.Password?.message}</Form.Text>

        </Form.Group>
        <Form.Group>
          <Form.Label className="commonlabel">{FormCredentials.ConfirmPassword}</Form.Label>
          <div className="flex-row-center">
          <Form.Control type={password.ConfirmPassword} onChange={e=>setValue('ConfirmPassword',e.currentTarget.value)}  />
          <FontAwesomeIcon icon={password.ConfirmPassword==='Password'?faEyeSlash:faEye} className="text-dark" id="ConfirmPassword" style={{marginLeft:"-30px" , cursor: "pointer"}} onClick={e=>PasswordtoText(e)}></FontAwesomeIcon>
          </div>

           <Form.Text className="text-danger">{errors.ConfirmPassword?.message}</Form.Text>

        </Form.Group>
        <a href="/login" style={{textAlign:"center"}}>{FormCredentials.Alreadyhaveanaccount}</a>
        <Button className="registration-btn"type="submit">{FormCredentials.CreateAnAccount}</Button>
      </Form>
      </div>
      <div className="col-md-1 col-12"></div>
      <div className="col-md-6 col-12 flex-column-center">
      <img src={homepage} alt="" className="img-fluid" id="homepageimg" />
      </div>
    </div>
   </Container>
  );
};

export default SignupForm;
