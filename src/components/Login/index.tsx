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
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import {
  LoginSchema,
  ForgotpasswordEmailschema,
  forgotpasswordOtpschema,
  forgotpasswordchecker,
} from "../../validation/Formvalidation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = Yup.InferType<typeof LoginSchema>;
type EmailData = Yup.InferType<typeof ForgotpasswordEmailschema>;
type OTPData = Yup.InferType<typeof forgotpasswordOtpschema>;
type NewPasswordData = Yup.InferType<typeof forgotpasswordchecker>;

interface LoginProps {
  closeForgotpassword: () => void;
  handleresetpasswordsubmit: (data: EmailData) => void;
  verifyotp: (data: OTPData) => void;
  savePassword: (data: NewPasswordData) => void;
  handleforgetPassword: (e: FormEvent<HTMLAnchorElement>) => void;
  enternewPassword: () => JSX.Element;
  openVerificationTab: () => JSX.Element;
  forgetpasswordCard: () => JSX.Element;
}
const LoginForm = (): JSX.Element => {
  const [resetPassword, setResetPassword] = React.useState(false);
  const [Password, showPassword] = React.useState(false);
  const [resendcodevisiblity, setresendcodevisiblity] = React.useState(false);
  const [otpstate, setotpstate] = React.useState(false);
  const [timerclock, settimer] = React.useState(60);
  const [btn, disablebtn] = React.useState(false);
  const [password, setpassword] = React.useState({
    Password: "Password",
  });
  const [expiremsg, setexpiremgs] = React.useState("");

  const props: LoginProps = {
    closeForgotpassword: () => {
      setResetPassword(false);
      showPassword(false);
      settimer(60);
      setotpstate(false);
      disablebtn(false);
      setnewPasswordValue("ConfirmPassword", "");
      setValue("Email", "");
      setValue("Password", "");
      seEmailValue("Email", "");
      setOtpValue("OTP", "");
      setnewPasswordValue("Password", "");
      setnewPasswordValue("ConfirmPassword", "");
    },
    handleresetpasswordsubmit: (data: EmailData) => {
      console.log(data);
      setOtpValue("OTP", "");
      // seEmailValue('Email','')
      settimer(60);
      setotpstate(true);
      disablebtn(true);
    },
    verifyotp: (data: OTPData) => {
      console.log(data);
      if (timerclock > 0) {
        showPassword(true);
        setOtpValue("OTP", "");
      } else {
        setexpiremgs("*OTP Expires,Try Resend Code");
      }
    },
    enternewPassword: () => {
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
            onSubmit={handlesumbitnewpasword(props.savePassword)}
          >
            <Form.Group className="full-width">
              <Form.Control
                as={"input"}
                type="password"
                style={{ backgroundColor: colors.B2 }}
                id="newpassword"
                onChange={(e) =>
                  setnewPasswordValue("Password", e.currentTarget.value)
                }
                placeholder={FormPlaceholders.EnternewPassword}
              />
              <Form.Text className="text-danger">
                {newpassworderrors.Password?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="full-width">
              <Form.Control
                as={"input"}
                type="password"
                style={{ backgroundColor: colors.B2 }}
                id="retypenewpassword"
                onChange={(e) =>
                  setnewPasswordValue("ConfirmPassword", e.currentTarget.value)
                }
                placeholder={FormPlaceholders.RetypeNewPassword}
              />
              <Form.Text className="text-danger">
                {newpassworderrors.ConfirmPassword?.message}
              </Form.Text>
            </Form.Group>
            <Button className="verify" type="submit">
              {FormCredentials.SavePassword}
            </Button>
          </Form>
        </Card>
      );
    },
    savePassword: (data: NewPasswordData) => {
      console.log(data);

      showPassword(false);
      settimer(60);
      setotpstate(false);
      disablebtn(false);
      setResetPassword(false);
    },
    openVerificationTab: () => {
      return (
        <div>
          <h5 id="verificationemail">
            {FormCredentials.verficationEmail}{" "}
            <FontAwesomeIcon icon={faCircleCheck} />
          </h5>
          <h5
            id="otpclock"
            style={
              timerclock <= 0
                ? { color: colors.ES9 }
                : { color: colors.Black16 }
            }
          >
            <FontAwesomeIcon icon={faClock} />{" "}
            {timerclock <= 0
              ? "Expires"
              : timerclock < 10
              ? `00:0${timerclock}`
              : `00:${timerclock}`}
          </h5>
          <a
            onClick={handlesumbitemail(props.handleresetpasswordsubmit)}
            id="resendcode"
            style={
              !resendcodevisiblity
                ? { visibility: "hidden" }
                : { visibility: "visible" }
            }
          >
            {FormCredentials.ResendCode}
          </a>
          <Form
            className="gap20 flex-row-space"
            onSubmit={handlesumbitotp(props.verifyotp)}
          >
            <Form.Group id="resetotp">
              <Form.Control
                as={"input"}
                type="number"
                inputMode="numeric"
                style={{ backgroundColor: colors.White }}
                id="otp"
                onChange={(e) => setOtpValue("OTP", e.currentTarget.value)}
                placeholder={FormPlaceholders.EnterOTP}
              />
              <Form.Text className="text-danger">
                {expiremsg === "" ? otperrors.OTP?.message : expiremsg}
              </Form.Text>
            </Form.Group>
            <Button className="verify" type="submit">
              {FormCredentials.Verify}
            </Button>
          </Form>
        </div>
      );
    },
    forgetpasswordCard: () => {
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
            onSubmit={handlesumbitemail(props.handleresetpasswordsubmit)}
          >
            <Form.Group id="resetEmail">
              <Form.Control
                as={"input"}
                type="Email"
                style={{ backgroundColor: colors.B }}
                id="resetEmail"
                onChange={(e) => seEmailValue("Email", e.currentTarget.value)}
                placeholder={FormPlaceholders.Email}
                readOnly={btn}
              />
            </Form.Group>
            <Button className="submit" type="submit" disabled={btn}>
              {FormCredentials.Submit}
            </Button>
          </Form>
          <Form.Text className="text-danger">
            {emailerrors.Email?.message}
          </Form.Text>

          <div className="mt-5">
            {otpstate ? props.openVerificationTab() : <></>}
          </div>
        </Card>
      ) : (
        props.enternewPassword()
      );
    },
    handleforgetPassword: (e: FormEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setResetPassword(true);
    },
  };
  function validateform(data: FormData) {
    console.log(data);
  }

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(LoginSchema),
  });
  const {
    handleSubmit: handlesumbitemail,
    setValue: seEmailValue,
    formState: { errors: emailerrors },
  } = useForm<EmailData>({
    resolver: yupResolver(ForgotpasswordEmailschema),
  });
  const {
    handleSubmit: handlesumbitotp,
    setValue: setOtpValue,
    formState: { errors: otperrors },
  } = useForm<OTPData>({
    resolver: yupResolver(forgotpasswordOtpschema),
  });
  const {
    handleSubmit: handlesumbitnewpasword,
    setValue: setnewPasswordValue,
    formState: { errors: newpassworderrors },
  } = useForm<NewPasswordData>({
    resolver: yupResolver(forgotpasswordchecker),
  });
  function PasswordtoText(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    if (e.currentTarget.id === "Password") {
      password.Password === "Password"
        ? setpassword({ ...password, Password: "text" })
        : setpassword({ ...password, Password: "Password" });
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
    timerclock <= 0
      ? setresendcodevisiblity(true)
      : setresendcodevisiblity(false);
  }, [otpstate, timerclock]);

  return (
    <Container>
      <div className="row flex-row-center full">
        <div className="col-md-4 col-12">
          {!resetPassword ? (
            <Form
              className="flex-column gap20"
              onSubmit={handleSubmit(validateform)}
            >
              <Form.Group>
                <Form.Label className="commonlabel">
                  {FormCredentials.Email}
                </Form.Label>
                <Form.Control
                  type="Email"
                  id="Email"
                  onChange={(e) => setValue("Email", e.target.value)}
                />
                <Form.Text className="text-danger">
                  {errors.Email?.message}
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label className="commonlabel">
                  {FormCredentials.Password}
                </Form.Label>
                <div className="flex-row-center">
                  <Form.Control
                    type="Password"
                    id="Password"
                    onChange={(e) => setValue("Password", e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={password.Password === "Password" ? faEyeSlash : faEye}
                    className="text-dark"
                    style={{ marginLeft: "-30px", cursor: "pointer" }}
                    onClick={(e) => PasswordtoText(e)}
                  ></FontAwesomeIcon>
                </div>

                <Form.Text className="text-danger">
                  {errors.Password?.message}
                </Form.Text>
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
