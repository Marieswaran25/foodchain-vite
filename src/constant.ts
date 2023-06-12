 enum FormCredentials{
   Email="*Email",
   Firstname="*Firstname",
   Lastname="*Lastname",
   Mobile="*Mobile Number",
   Password="*Password",
   ConfirmPassword="*Confirm Password",
   CreateAnAccount="Create an Account"
}
enum FormPlaceholders{
   Email="Enter your Email",
   Firstname="Enter your Firstname",
   Lastname="Enter your Lastname",
   Mobile="Enter your Mobile Number",
   Password="Enter your Password",
   ConfirmPassword="Confirm your Password",
}
enum FormErrors{
  EmailError="Please Enter a valid Email address",
  FirstnameError="Please Enter a valid Firstname",
  LastnameError="Please Enter a valid Lastname",
  MobileError="Please Enter a valid Mobile Number",
  PasswordError="Password contains Eight Characters",
  ConfirmpasswordError="Password doesn't match",
}
export {FormCredentials,FormErrors,FormPlaceholders}