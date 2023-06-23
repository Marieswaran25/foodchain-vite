import * as Yup from 'yup'
export const LoginSchema = Yup.object().shape({
    Email: Yup.string().email('Email is not valid').required("Email is required"),

    Password: Yup.string()
      .required("*Password is required")
      .min(8, "*Password must contains 8 characters"),
  });
  export const SignupSchema = Yup.object().shape({
    Email: Yup.string().email('Email is not valid').required("*Email is required"),
    FirstName: Yup.string()
      .min(3, "*Firstname is Too short!")
      .max(20, "*Firstname is Too Long!")
      .required("Firstname is required"),
  
    LastName: Yup.string()
      .min(3, "*LastName is Too Short")
      .max(20, "*LastName is Too Long")
      .required("*Lastname is required"),
  
    phoneNumber: Yup.string()
      .required("*Phone number is required")
      .matches(
        /^\d{10}$/,
        "*Invalid phone number"
      ),

    Password: Yup.string()
      .required("*Password is required")
      .min(8, "*Password must contains 8 characters"),

  ConfirmPassword: Yup.string()
  .required("*Password is required")
  .oneOf([Yup.ref('Password')], '*Passwords doesnt match')
});

export const ForgotpasswordEmailschema= Yup.object().shape({
  Email: Yup.string().email('*Email is not valid').required("*Email is required")
});

export const forgotpasswordOtpschema= Yup.object().shape({
  OTP: Yup.string().max(6,'*OTP criteria doesnt match.').required("*OTP is required")
});

export const forgotpasswordchecker= Yup.object().shape({
  Password: Yup.string()
  .required("*Password is required")
  .min(8, "*Password must contains 8 characters"),

ConfirmPassword: Yup.string()
.required("*Password is required")
.oneOf([Yup.ref('Password')], '*Passwords doesnt match')
})
export const addressSchema=Yup.object().shape({
  Address:Yup.string()
  .required("*Password is required")

})

    