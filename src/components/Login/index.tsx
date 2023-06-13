import { Form, Button, Container, Card } from "react-bootstrap";
import { FormCredentials, FormPlaceholders } from "../../constant";
import homepage from "../../assets/images/homepageimg.jpg";
import { FormEvent } from "react";
import React from "react";
import colors from "../../assets/theme/colors.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

interface LoginProps{
    handleInput:(e:unknown) => void,
    HandleForgetEmail:(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    closeForgotpassword:() => void,
    handleresetpasswordsubmit:(e: FormEvent<HTMLFormElement> | FormEvent<HTMLAnchorElement>) => void,
    verifyotp:(e: FormEvent<HTMLFormElement>) => void,
    savePassword:(e: FormEvent<HTMLFormElement>) => void,
    handleforgetPassword:(e: FormEvent<HTMLAnchorElement>) => void
    enternewPassword:()=>JSX.Element,
    openVerificationTab:()=>JSX.Element,
    forgetpasswordCard:()=>JSX.Element

}
const LoginForm= ():JSX.Element => {
  const [resetPassword, setResetPassword] = React.useState(false);
  const [Password, showPassword] = React.useState(false);
  const [resendcodevisiblity, setresendcodevisiblity]= React.useState(false);
  const [otpstate, setotpstate] = React.useState(false);
  const [timerclock, settimer] = React.useState(60);
  const [btn, disablebtn] = React.useState(false);
  const [resetinfo, setResetinfo] = React.useState({
    resetEmail: "",
    otp: "",
    newpassword: "",
    retypenewpassword: "",
  });
  const props:LoginProps={
    handleInput:(e:unknown)=>{ console.log(e);},
    HandleForgetEmail:(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        setResetinfo({ ...resetinfo, [e.currentTarget.id]: e.currentTarget.value });
    },
    closeForgotpassword:()=> {
        setResetPassword(false);
        showPassword(false);
        settimer(60);
        setotpstate(false);
        disablebtn(false);
        setResetinfo({...resetinfo,otp:'',newpassword:'',retypenewpassword:''})
    },
    handleresetpasswordsubmit:(
        e: FormEvent<HTMLFormElement> | FormEvent<HTMLAnchorElement>)=> {
        e.preventDefault();
        settimer(60);
        setotpstate(true);
        disablebtn(true);
    },
     verifyotp:(e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        alert(resetinfo.otp);
        if (resetinfo.otp == "123456") {
          alert("OTP verified");
          showPassword(true);
        }
    },
    enternewPassword:()=> {
        return (
          <Card
            style={{ backgroundColor: "white", height: "100%", padding: "30px" }}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={props.closeForgotpassword}
              style={{ color: colors.B2 }}
              className="closemark"
            />
    
            <Form
              className="gap20 flex-column-center"
              onSubmit={(e) => props.savePassword(e)}
            >
              <Form.Group className="full-width">
                <Form.Control
                  as={"input"}
                  type="password"
                  style={{ backgroundColor: colors.B2 }}
                  id="newpassword"
                  onChange={(e) => props.HandleForgetEmail(e)}
                  placeholder={FormPlaceholders.EnternewPassword}
                />
              </Form.Group>
              <Form.Group className="full-width">
                <Form.Control
                  as={"input"}
                  type="password"
                  style={{ backgroundColor: colors.B2 }}
                  id="retypenewpassword"
                  onChange={(e) => props.HandleForgetEmail(e)}
                  placeholder={FormPlaceholders.RetypeNewPassword}
                />
              </Form.Group>
              <Button className="verify" type="submit">
                {FormCredentials.SavePassword}
              </Button>
            </Form>
          </Card>
        );
    },
    savePassword:(e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        if (resetinfo.newpassword === resetinfo.retypenewpassword) {
          alert(resetinfo.newpassword);
          showPassword(false);
          settimer(60);
          setotpstate(false);
          disablebtn(false);
          setResetPassword(false);
        }
    },
    openVerificationTab:()=> {
        return (
          <div>
            <h5 id="verificationemail">
              {FormCredentials.verficationEmail} <FontAwesomeIcon icon={faCircleCheck} />
            </h5>
            <h5 id="otpclock"  style={timerclock<=0?{color:colors.ES9}:{color:colors.Black16}}>
              <FontAwesomeIcon icon={faClock} />{" "}
              {timerclock<=0?'Expires':timerclock < 10  ? `00:0${timerclock}` : `00:${timerclock}` }
            </h5>
            <a onClick={(e) => props.handleresetpasswordsubmit(e)} id="resendcode" style={!resendcodevisiblity?{visibility:'hidden'}:{visibility:'visible'}} >
              {FormCredentials.ResendCode}
            </a>
            <Form className="gap20 flex-row-space" onSubmit={(e) => props.verifyotp(e)}>
              <Form.Group id="resetotp">
                <Form.Control
                  as={"input"}
                  type="number"
                  inputMode="numeric"
                  style={{ backgroundColor: colors.White }}
                  id="otp"
                  onChange={(e) => props.HandleForgetEmail(e)}
                  placeholder={FormPlaceholders.EnterOTP}
                />
              </Form.Group>
              <Button className="verify" type="submit">
                {FormCredentials.Verify}
              </Button>
            </Form>
          </div>
        );
    },
    forgetpasswordCard:()=> {
        return !Password ? (
          <Card
            style={{ backgroundColor: "white", height: "100%", padding: "30px" }}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={props.closeForgotpassword}
              style={{ color: colors.B2 }}
              className="closemark"
            />
            <Form.Label className="text-muted" id="forgotemail">
              {FormCredentials.Forgotcheck}
            </Form.Label>
    
            <Form
              className="gap20 flex-row-space"
              onSubmit={(e) => props.handleresetpasswordsubmit(e)}
            >
              <Form.Group id="resetEmail">
                <Form.Control
                  as={"input"}
                  type="Email"
                  style={{ backgroundColor: colors.B }}
                  id="resetEmail"
                  onChange={(e) =>props. HandleForgetEmail(e)}
                  placeholder={FormPlaceholders.Email}
                />
              </Form.Group>
              <Button className="submit" type="submit" disabled={btn}>
                {FormCredentials.Submit}
              </Button>
            </Form>
            <div className="mt-5">{otpstate ?props. openVerificationTab() : <></>}</div>
          </Card>
        ) : (
            props.enternewPassword()
        );
    },
    handleforgetPassword:(e: FormEvent<HTMLAnchorElement>)=> {
        e.preventDefault();
        setResetPassword(true);
    }
}

React.useEffect(() => {
    if (otpstate && timerclock >= 0) {
      setTimeout(async () => {
        settimer((count: number) => {
          return (count = count - 1);
        });
      }, 1000);
    }
    if (timerclock <= 0) {
      setresendcodevisiblity(true)
    }
  }, [otpstate, timerclock]);
 
return (
    <Container>
      <div className="row flex-row-center full">
        <div className="col-md-4 col-12">
          {!resetPassword ? (
            <Form className="flex-column gap20">
              <Form.Group>
                <Form.Label className="commonlabel">
                  {FormCredentials.Email}
                </Form.Label>
                <Form.Control type="Email" onChange={(e) =>props.handleInput(e)} />
              </Form.Group>
              <Form.Group>
                <Form.Label className="commonlabel">
                  {FormCredentials.Password}
                </Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Button className="registration-btn" type="submit">
                {FormCredentials.Login}
              </Button>
              <Form.Group className="flex-row-space">
                <a
                  onClick={(e) => props.handleforgetPassword(e)}
                  style={{ color: colors.C3 }}
                >
                  {FormCredentials.ForgetPassword}
                </a>
                <a href="/">{FormCredentials.CreateNewAccount}</a>
              </Form.Group>
            </Form>
          ) : (
            props.forgetpasswordCard()
          )}
        </div>
        <div className="col-md-1 col-12"></div>
        <div className="col-md-6 col-12 flex-column-space gap20">
          <h1>{FormCredentials.WelcomeBack}</h1>
          <img src={homepage} alt="" className="img-fluid" id="homepageimg" />
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;