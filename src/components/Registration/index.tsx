import { Form, Button, Container } from "react-bootstrap";
import {FormCredentials} from '../../constant'
import homepage from '../../assets/images/homepageimg.jpg'
const SignupForm = () => {
  function handleInput(e:unknown){
    return e
  }
  return (
   <Container>
     <div className="row flex-row-center full gap20">
      <div className="col-md-4 col-12">
      <Form className="flex-column gap20">
        <Form.Group >
          <Form.Label>{FormCredentials.Email}</Form.Label>
          <Form.Control type="Email"  onChange={e=>handleInput(e)} />
        </Form.Group>
        <Form.Group className="gap20" >
          <Form.Label>{FormCredentials.Firstname}</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>{FormCredentials.Lastname}</Form.Label>
          <Form.Control type="text"  />
        </Form.Group>
        <Form.Group>
          <Form.Label>{FormCredentials.Mobile}</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>{FormCredentials.Password}</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>{FormCredentials.ConfirmPassword}</Form.Label>
          <Form.Control type="text"  />
        </Form.Group>
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
