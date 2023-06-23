enum FormCredentials {
    Email = "*Email",
    Firstname = "*Firstname",
    Lastname = "*Lastname",
    Mobile = "*Mobile Number",
    Password = "*Password",
    ConfirmPassword = "*Confirm Password",
    CreateAnAccount = "Create an Account",
    Login = "Login",
    WelcomeBack = "Welcome back",
    CreateNewAccount = "Create new Account?",
    ForgetPassword = "Forgot Password",
    Submit = "Submit",
    Forgotcheck = "Please find your verification code in your inbox",
    Verify = "Verify",
    verficationEmail = "Verification Email sent successfully",
    ResendCode = "Resend Code",
    SavePassword = "Save Password",
    Alreadyhaveanaccount = "Already have an account?"
}
enum FormPlaceholders {
    Email = "Enter your Email",
    Firstname = "Enter your Firstname",
    Lastname = "Enter your Lastname",
    Mobile = "Enter your Mobile Number",
    Password = "Enter your Password",
    ConfirmPassword = "Confirm your Password",
    EnterOTP = "Enter OTP",
    EnternewPassword = "Enter New Password",
    RetypeNewPassword = "Retype New Password"
}
enum FormErrors {
    EmailError = "Please Enter a valid Email address",
    FirstnameError = "Please Enter a valid Firstname",
    LastnameError = "Please Enter a valid Lastname",
    MobileError = "Please Enter a valid Mobile Number",
    PasswordError = "Password contains Eight Characters",
    ConfirmpasswordError = "Password doesn't match"
}
enum UserDetails {
    Myorders = "My Orders",
    MyAccount = "My Account",
    MyCart = "My Cart",
    Myfavourites = "My favourites",
    Signout = "Sign Out"
}
enum LandingPageInfo {
    whereyourfood = "Where are you taking your",
    VisitHotel = "Take Your Dine"
}
enum HotelCard {
    visitMyHote = "Visit My Hotel"
}
enum checkoutPage {
    back = "back",
    orderYourFavouritefood = "Order and Enjoy your ",
    addtocart = "Add to Cart",
    cartsuccess = "Added to Cart !",
    proceedtoPayent = "Checkout to cart",
    makePayment = "Make Payment"
}
enum cart {
    emptycart = "Your cart is Empty"
}
enum Address {
    enteryouraddress = "Enter your address"
}
enum Paymentinfo{
  totalsummay="Total Summary",
  totalitems="Total items",
  totalcost="Total Cost",
  Paymentmethods="Payment Methods"

}
export { 
   FormCredentials, 
   FormErrors,
   FormPlaceholders,
   UserDetails,
   LandingPageInfo, 
   HotelCard, 
   checkoutPage, 
   cart,
   Address,
   Paymentinfo 
};
