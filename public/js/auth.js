const firebaseConfig = {
  apiKey: "AIzaSyCo9kls2bpTbv7nrcfElO1pcp1Q73RNKyU",
  authDomain: "chatty-34.firebaseapp.com",
  databaseURL: "https://chatty-34.firebaseio.com",
  projectId: "chatty-34",
  storageBucket: "chatty-34.appspot.com",
  messagingSenderId: "313649534380",
  appId: "1:313649534380:web:56df1ff17ac1461940d609",
  measurementId: "G-T38CS0DLFX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var emailVerified = false;
var progressVar = null;
var nullVariable = null; //Used to specify null
let x2o4tp; //random variable
var localSpace = "progressTrack";

// progressTrack is var (localStorage)
// SiUp + SdVfEm + VfEm + SdOTP + VfOTP
// SiUpSdVfEmVfEmSdOTPVfOTP
// Totol Instances = 5

// GEtting Auth Status
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // Navigate user to chat section
    if (localStorage.getItem(localSpace) == "SiUpSdVfEmVfEmSdOTPVfOTP") {
      // User has completed all the procesess and is being redirect
      document.write("User loged in "); //USe this for searching redirects to chat page
    } else {
      if (localStorage.getItem(localSpace) == null) {
        // User is left for all auth
      } else {
        // User is left completing sign up
        // Get is email verified
        emailVerified = user.emailVerified;
        userEmail = user.email;
        localStorage.setItem("userEmail", userEmail);

        if (localStorage.getItem(localSpace) == "SiUp") {
          // User has success the Sign Up
          // Verification Email triggered
        } else {
          if (localStorage.getItem(localSpace) == "SiUpSdVfEm") {
            // Verification email sent
            // email verification GUI triggered
            verifyEmailGUI();
            if (emailVerified) {
              progressVar = localStorage.getItem(localSpace) + "VfEm";
              localStorage.setItem(localSpace, progressVar);
              successShow("em-verif-sucs", "Email verified");
              emailToMobileGUI();
            } else {
              errorShow("err-em-nt-verif-wrn", "Email not verified!");
              errorShow(
                "err-em-nt-verif",
                "Check your inbox for email verification!"
              );
            }
          } else {
            if (localStorage.getItem(localSpace) == "SiUpSdVfEmVfEm") {
              emailToMobileGUI(); //Email verified, navigating to number verification
            } else {
              if (localStorage.getItem(localSpace) == "SiUpSdVfEmVfEmSdOTP") {
                otpEnter(); //OTP is sent, verification is left
              } else {
                if (
                  localStorage.getItem(localSpace) == "SiUpSdVfEmVfEmSdOTPVfOTP"
                ) {
                  // OTP is verified
                  // Full process completed
                  // Redirect User
                  document.write("User loged in ");
                } else {
                  // All the things are left
                  // And is same as above
                }
              }
            }
          }
        }
      }
    }
  } else {
    localStorage.setItem(localSpace, nullVariable);
    // No user is signed in.
    // Ask for sign in  or sign up
    // All things are left:

    // declaring variables used in it!
    var appended = false;
    var formStatus = false;
    var resetFormStatus = false;

    // // Checks wether the buttin #form-btn clicked
    // // is for SignUp , SignIN, Verify Email or Password Reset

    $("#form-btn").click(function (e) {
      e.preventDefault();
      if (initialAuthStatus == "verifyEmail") {
        location.reload();
      }
    });

    // Create User with Email and Password
    $("#form-btn").click(function signUpWithEmail() {
      if (initialAuthStatus == "signup") {
        var name = $("#name").val();
        var email = $("#email").val();
        var password = "Shekh2212a."; //$("#pass").val();

        ValidateEmail(email, password);
        if (formStatus) {
          formStatus = false;

          if (initialAuthStatus == "signup") {
            //Create User with Email and Password
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(function (result) {
                console.log(result);

                localStorage.setItem("userEmail", result.user.email);
                if (result.user.displayName != null) {
                  localStorage.setItem("name", result.user.displayName);
                } else {
                  localStorage.setItem("name", name);
                }

                progressVar = "SiUp";
                localStorage.setItem(localSpace, progressVar);
                console.log(localStorage.getItem(localSpace));

                // Sends verification email
                sendVerificationEmail();
              })
              .catch(function (err) {
                // Handle Errors here.
                var errCode = err.code;
                var errMsg = err.Message;
                console.log(err);
                firebaseError(errCode);
                $(".auth").css({
                  cursor: "auto",
                });
              });
          }
        }
      }
    });

    // SignIn User with Email and Password
    $("#form-btn").click(function signInWithEmail() {
      if (initialAuthStatus == "signin") {
        var email = $("#email").val();
        var password = $("#pass").val();

        ValidateEmail(email, password);
        if (formStatus) {
          formStatus = false;
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function (result) {
              if (isEmailVerified == true) {
                isEmailVerified = false;

                return true;
              } else {
                errorShow("ve-em-in-va", "Verify your email to login");
                return false;
              }
            })
            .catch(function (err) {
              // Handle Errors here.
              var errCode = err.code;
              var errMsg = err.Message;
              console.log(err);
              firebaseError(errCode);
              $(".auth").css({
                cursor: "auto",
              });
            });
        }
      }
    });

    // Create user with Google Account on GoogleLogin clicked
    $("#GoogleLogin").click(function googleSignIn() {
      $(".auth").css({
        cursor: "progress",
      });

      base_provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(base_provider)
        .then(function (result) {
          console.log("Account created/loged with Goggle");
          console.log(result);
          localStorage.setItem("userEmail", result.user.email);
          if (result.user.displayName != null) {
            localStorage.setItem("name", result.user.displayName);
          } else {
            localStorage.setItem("name", name);
          }

          $(".auth").css({
            cursor: "auto",
          });
        })
        .catch(function (err) {
          var errCode = err.code;
          var errMsg = err.Message;
          console.log(err);
          alert("Error: " + errCode + " " + errMsg);
          $(".auth").css({
            cursor: "auto",
          });
        });
    });

    // Facebook Login on FacebookLogin clicked
    $("#FacebookLogin").click(function facebookLogin() {
      $(".auth").css({
        cursor: "progress",
      });
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope("user_birthday,email");
      firebase.auth().useDeviceLanguage();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          console.log(result);
          localStorage.setItem("userEmail", result.user.email);
          if (result.user.displayName != null) {
            localStorage.setItem("name", result.user.displayName);
          } else {
            localStorage.setItem("name", name);
          }

          $(".auth").css({
            cursor: "auto",
          });
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
          console.log(user.email);
          var FBemail = err.email;
          var FBcredential = err.credential;
          console.log(FBemail + FBcredential);
        })
        .catch(function (err) {
          // Handle Errors here.
          var errCode = err.code;
          var errMsg = err.Message;
          console.log(errCode + errMsg);
          alert("Error: " + errCode + " " + errMsg);

          $(".auth").css({
            cursor: "auto",
          });
          // ...
        });
    });

    // Validating users email and password
    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    function ValidateEmail(email, password) {
      email = email;
      password = password;

      if (validateEmail(email)) {
        // Email validate success
        // validating password
        const PASSW = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (password.match(PASSW)) {
          formStatus = true;
        } else {
          // password failed the imout validation
          // show error message
          errorShow("pa-nt-strng", "Enter strong password");
          formStatus = false;
        }
      } else {
        errorShow("va-em", "Enter valid email");
      }
    }
  }
});

// declaring global functions

// Send verification email
function sendVerificationEmail() {
  firebase.auth().onAuthStateChanged(function (user) {
    user
      .sendEmailVerification()
      .then(function () {
        // Email sent.
        // Email send success
        successShow(
          "show-em-verify-request",
          "Check your email for account verification"
        );

        successShow(
          "em-verify-sent-success",
          "Account verification has been sent to your email"
        );

        setTimeout(function () {
          verifyEmailGUI();
        }, 1500);

        progressVar = localStorage.getItem(localSpace) + "SdVfEm";
        localStorage.setItem(localSpace, progressVar);
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
        errorShow("en-err-occr", "Failed to reach the server, try later!");
      });
  });
}

// Re-send email verification email on resend clicked
$("#resend-btn").click(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    user
      .sendEmailVerification()
      .then(function () {
        // Email sent.
        // Email send success
        successShow(
          "show-em-verify-request",
          "Check your email for account verification"
        );

        successShow(
          "em-verify-sent-success",
          "Account verification has been sent to your email"
        );
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
        errorShow("en-err-occr", "Failed to reach the server, try later!");
      });
  });
});

//Password Reset Email
function resetPassword() {
  var emailAddress = document.getElementById("email").value;

  ValidateReset(emailAddress);

  if (resetFormStatus) {
    resetFormStatus = false;
    var auth = firebase.auth();

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        // Email sent.
        successShow("reset-em-success", "Password reset email sent!");
        console.log("Password Reset Email Sent");
      })
      .catch(function (err) {
        // An error happened.
        var errCode = err.code;
        var errMsg = err.Message;
        console.log(err);
        firebaseError(errCode);

        $(".auth").css({
          cursor: "auto",
        });
      });
  }
}

// Validate email for password reset
function validateReset(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function ValidateReset(email) {
  email = email;

  if (validateReset(email)) {
    resetFormStatus = true;
  } else {
    resetFormStatus = false;
    errorShow("va-re-em", "Enter valid email");
  }
  return false;
}

// Firebase error handling using code
function firebaseError(code) {
  if (code == "auth/email-already-in-use") {
    errorShow("fb-er-cd", "Account already exists, please SIGN IN");
  } else {
    if (code == "auth/user-not-found") {
      errorShow("no-urs-fd", "No user found, re-check the email!");
    } else {
      if (code == "auth/wrong-password") {
        errorShow("pas-wrng", "Wrong password, please re-check it!");
      } else {
        if (code == "auth/network-request-failed") {
          errorShow("fald-netwrk-reqest", "Check your Internet connection!");
        } else {
          errorShow("sr-re-err", "Failed to reach server, please try later!");
        }
      }
    }
  }
}

// function to show error message
function errorShow(id, message) {
  $(".authProblem").append(
    "<p class='please' id='" + id + "' >" + message + "</p>"
  );
  setTimeout(function () {
    id = "#" + id;
    $(id).remove();
  }, 5500);
}

// functon to show success messsage
function successShow(id, message) {
  $(".authProblem").append(
    "<p class='yas' id='" + id + "' >" + message + "</p>"
  );
  setTimeout(function () {
    id = "#" + id;
    $(id).remove();
  }, 5500);
}

// temp-{G5}
function signOUT() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      console.log("Log Out Success");
    })
    .catch(function (error) {
      // An error happened.
      console.log("Log Out Failed");
      console.log(error);
    });
}
function deleteUser() {
  var user = firebase.auth().currentUser;

  user
    .delete()
    .then(function () {
      // User deleted.
      console.log("Success");
    })
    .catch(function (error) {
      // An error happened.
      console.log("Failed");
      console.log(error);
    });
}

function lcs() {
  return localStorage.getItem("progressTrack");
}

$("#form-btn").click(function verifyMobileNumber() {
  if (initialAuthStatus == "verifyMobile") {
    if (emailVerified) {
      // Declaring local variables!
      let usage;
      let mstAPIkey; //Master Api key
      let mstAPItem; //Master Api  template id
      let newOtp = generateOTP(); //Generate new otp
      x2o4tp = newOtp;
      let moNumber = $("#email").val(); //Mobile number

      let name = localStorage.getItem("name"); //Getting name of user

      if (localStorage.getItem("usage") != null) {
        usage = localStorage.getItem("usage");
      } else {
        usage = "all";
      }

      // Check if number validates
      if (phonenumber(moNumber)) {
        // Api template id's
        const API_TEMP_1 = "26788"; //Api tem 1
        const API_TEMP_2 = "27056"; //Api tem 2
        // Api keys
        const API_KEY_1 =
          "GbD5Q8GhoawR3Vpm16VRjnCAVo1DGHKbh3BmEUSyFxor5CaJOZKbZqvHqWIF"; //Api key 1
        const API_KEY_2 =
          "5lBTKoD2pyaVRIvjEzfSxLOXJ6hm7YAsU4nrbcGeuF3gWk10NdAVfdbTcpn1Czg0EUF8aYXeSG2KwDr4"; //Api key 2

        if (usage == "all") {
          if (randomiseAPI) {
            mstAPIkey = API_KEY_1;
            mstAPItem = API_TEMP_1;
          } else {
            mstAPIkey = API_KEY_2;
            mstAPItem = API_TEMP_2;
          }
        } else {
          if (usage == "1") {
            mstAPIkey = API_KEY_1;
            mstAPItem = API_TEMP_1;
          } else {
            mstAPIkey = API_KEY_2;
            mstAPItem = API_TEMP_2;
          }
        }

        const API_LOCATION_URL = `https://www.fast2sms.com/dev/bulk?authorization=${mstAPIkey}&sender_id=FSTSMS&language=english&route=qt&numbers=${moNumber}&message=${mstAPItem}&variables={CC}|{BB}&variables_values=${name}|${newOtp}`;

        fetch(API_LOCATION_URL)
          .then(function (response) {
            //Success

            successShow("api-ftch-succ", "OTP is sent to your mobile number!");
            console.log(response);
            progressVar = localStorage.getItem(localSpace) + "SdOTP";
            localStorage.setItem(localSpace, progressVar);
            initialAuthStatus = "verifyOTP";
            otpEnter();
          })
          .catch(function (error) {
            // Error
            console.log(error);
            if (error.status_code == 416) {
              //Error 416 is In sufficient balance
              if (randomiseAPI()) {
                //It is API 1
                localStorage.setItem("usage", "2");
              } else {
                localStorage.setItem("usage", "2");
              }
              errorShow(
                "please-try-again",
                "Something went wrong, please try again!"
              );
            } else {
              errorShow("err-otp-sent-fld", "An  error occured!");
            }
          });
      } else {
        errorShow(
          "err-entr-valid-mo-num",
          "Enter valid 10 digit mobile number!"
        );
      }
    }
  }
}); //function ending

// Checks the OTP
$("#form-btn").click(function checkOTP() {
  if (initialAuthStatus == "verifyOTP") {
    var enteredOTP = $("#email").val(); //getting the otp from input with id email
    if (x2o4tp == enteredOTP) {
      successShow("otp-sucss-verif", "OTP verified!");

      progressVar = localStorage.getItem(localSpace) + "VfOTP";
      localStorage.setItem(localSpace, progressVar);
      // Redirect to chat page
      console.log("Success");
      document.write("User loged in ");
    } else {
      errorShow("otp-err-verif", "Enter correct OTP");
      errorShow("otp-veri-failed", "OTP verification failed!");
    }
  }
});

// Function to generate OTP
function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

function randomiseAPI() {
  let randomNumber = Math.random(); //Makes random number between 0 and 1
  if (randomNumber >= 0.5) {
    return true; //It is 1
  } else {
    return false; //It is 2
  }
}

// Mobile Validation
function phonenumber(inputNumber) {
  var phoneno = /^\d{10}$/;
  if (inputNumber.match(phoneno)) {
    return true;
  } else {
    return false;
  }
}
