var coverSignInBtn = $("#cover-signin-btn");
var coverSignUpBtn = $("#cover-signup-btn");
var authButton = $(".auth-btn");
var initialAuthStatus = "signup";

$(document).ready(function () {
  // Jquery load succesfully
  console.log("Listening Started");

  // Turning off the auto complete of all input fields
  // $("input").attr("autocomplete", "off");
  // For Reseting Password
  //
  //
  //
  //
  //
  //
  $("#form-pass-forgot").click(function () {
    initialAuthStatus = "reset";
    $(".transitionPage").css({
      transform: "translateX(100%)",
    });

    setTimeout(function () {
      $(".details-heading").text("Reset Password");
      $(".form-div-name").css({
        display: "flex",
      });
      $(".details-icon").css({
        display: "none",
      });
      $(".details-or-email").text("Looks like you forgot your password:");
      $("#form-div-password").css({
        display: "none",
      });
      $("#forgot").css({
        display: "none",
      });
      $("#form-btn").text("SEND EMAIL");
    }, 1000);
  });
  //
  //
  //
  //
  //
  //
  //
  //   animation to take place on sign up toggle button pressed
  coverSignInBtn.click(function () {
    initialAuthStatus = "signin";

    $(".logo-txt").css({
      color: "#3a3a3a",
    });

    $(".cover").css({
      transform: "translateX(186.3%)",
      borderRadius: "0em 0.8em 0.8em 0em",
    });

    //                                //
    // For transforming width         //
    $(".cover").css({
      width: "45.2%",
      transformOrigin: "right",
      transition: "2s ease",
    });

    // animation:

    $(".cover-design-btn").css({
      display: "flex",
    });
    setTimeout(function () {
      $(".cover").css({
        width: "26.2%",
        transformOrigin: "center",
      });
    }, 750); //

    setTimeout(function () {
      $(".cover").css({
        transition: "1.5s ease-in-out",
      });
      $(".cover-design-btn").css({
        display: "none",
      });
    }, 1800);

    // animation over

    $(".cover-details-signin").css({
      color: "#e9e9e9",
      transform: "scale(-100%,-100%)",
      transform: "translateX(-200%)",
    });

    $(".cover-details-signin .cover-button").css({
      border: "1px solid #e9e9e9",
    });

    $(".cover-details-signup").css({
      color: "#ffffff",
      transform: "scale(100%,100%)",
      transform: "translateX(-100%)",
    });

    $(".cover-details-signup .cover-button").css({
      border: "1px solid #ffffff",
    });

    $(".details").css({
      borderRadius: "0.8em 0em 0em 0.8em",
      transform: "translateX(-53.8%)",
    });

    setTimeout(function () {
      $("#forgot").css({
        display: "flex",
      });
      $(".details-heading").text("Sign in to Chatty");
      $(".form-div-name").css({
        display: "none",
      });

      $("#name").val("");
      $("#email").val("");
      $("#pass").val("");

      $("#form-btn").text("SIGN IN");
    }, 800);
  });

  //
  //
  //
  //
  //
  //   animation to take place on sign up toggle button pressed
  coverSignUpBtn.click(function () {
    if (initialAuthStatus == "reset") {
      $(".transitionPage").css({
        transform: "translateX(-100%)",
      });
      setTimeout(function () {
        $("#form-div-password").css({
          display: "flex",
        });
        $(".details-icon").css({
          display: "flex",
        });
      }, 1000);
      SignUp();
      initialAuthStatus = "signup";
    } else {
      SignUp();
    }

    function SignUp() {
      initialAuthStatus = "signup";

      $(".logo-txt").css({
        color: "#ffffff",
      });

      $(".cover").css({
        transform: "translateX(-0%)",
        borderRadius: "0.8em 0em 0em 0.8em",
      });

      //                                //
      // For transforming width         //
      $(".cover").css({
        width: "45.2%",
        transformOrigin: "right",
        transition: "2s ease",
      });

      // animation:

      setTimeout(function () {
        $(".cover").css({
          width: "26.2%",
          transformOrigin: "center",
        });
      }, 750); //

      setTimeout(function () {
        $(".cover").css({
          transition: "1.5s ease-in-out",
        });
      }, 1600);

      // animation over

      $(".cover-details-signin").css({
        color: "#ffffff",

        transform: "translateX(0%)",
      });

      $(".cover-details-signin .cover-button").css({
        border: "1px solid #ffffff",
      });

      $(".cover-details-signup").css({
        color: "#e9e9e9",
        transform: "translateX(100%)",
      });

      $(".cover-details-signup .cover-button").css({
        border: "1px solid #e9e9e9",
      });

      $(".details").css({
        borderRadius: "0em 0.8em 0.8em 0em",
        transform: "translateX(0%)",
      });

      setTimeout(function () {
        $("#forgot").css(
          {
            display: "none",
          },
          500
        );
        $(".details-heading").text("Create Account");
        $(".form-div-name").css({
          display: "flex",
        });

        $("#name").val("");
        $("#email").val("");
        $("#pass").val("");

        $("#form-btn").text("SIGN UP");
      }, 800);
    } //of sign up
  }); //on sign up btn clicked
}); //on jquwery load

//Focuses to next input field on enter
let inputType;
if (sessionStorage.getItem("inputIndex") != null) {
  inputType = sessionStorage.getItem("inputIndex");
} else {
  inputType = "number";
}
$("input").keypress(function (e) {
  if (e.which == 13) {
    var indeX = $(`input[type='${inputType}']`).index(this);
    if (indeX == -1) {
      inputType = "email";
      sessionStorage.setItem("inputIndex", inputType);
    } else {
      inputType = "password";
      sessionStorage.setItem("inputIndex", inputType);
    }
    console.log(indeX);

    $(`input[type='${inputType}']`)
      .eq(indeX + 1)
      .focus();
  }
});

function verifyEmailGUI() {
  initialAuthStatus = "verifyEmail";

  $(".verifEmailPage").css({
    transform: "translateX(-100%)",
  });

  setTimeout(function () {
    $("#heading").text("Verify Email");
    $(".details-or-email").text(
      "Check " + localStorage.getItem("userEmail") + "'s  inbox forf email!"
    );

    $("#form-div-name").css({
      display: "none",
    });
    $("#form-div-email").css({
      display: "none",
    });
    $("#form-div-password").css({
      display: "none",
    });
    $("#forgot").css({
      display: "none",
    });
    $("#form-btn").text("REFRESH PAGE");
  }, 800);

  // after 30 seconds resnd button will pop up
  setTimeout(function () {
    $(".resendEmailDiv").css({
      display: "flex",
    });
  }, 30000);
}

// function for stuff after email is succesfully verified
function emailToMobileGUI() {
  initialAuthStatus = "verifyMobile";

  $(".mobilePage").css({
    transform: "translateX(-100%)",
  });

  setTimeout(function () {
    $("#heading").text("Verify Mobile");
    $(".details-or-email").text("verify your mobile to proceed furthur!");
    $("#email_label").text("Mobile Number");
    $("#form-div-name").css({
      display: "none",
    });
    $("#form-div-email").css({
      display: "flex",
    });

    $("#email").attr("type", "number");
    $("#emailIcon").attr("class", "far fa-comments");

    $("#form-div-password").css({
      display: "none",
    });
    $("#forgot").css({
      display: "none",
    });
    $(".resendEmailDiv").css({
      display: "none",
    });
    $("#form-btn").text("SEND OTP");
  }, 800);
}

function otpEnter() {
  initialAuthStatus = "verifyOTP";

  $(".mobilePage").css({
    transform: "translateX(100%)",
  });

  inputType = "number";

  $("#email").text("");

  setTimeout(function () {
    $("#heading").text("Verify OTP");
    $(".details-or-email").text("verify your OTP to proceed furthur!");

    $("#form-div-name").css({
      display: "none",
    });
    $("#form-div-email").css({
      display: "flex",
    });

    $("#email").attr("type", "number");
    $("#email_label").text("Enter OTP");
    $("#email").attr("min", "6");
    $("#email").attr("max", "6");
    $("#emailIcon").attr("class", "far fa-comments");

    $("#form-div-password").css({
      display: "none",
    });
    $("#forgot").css({
      display: "none",
    });
    $("#form-btn").text("VERIFY OTP");
  }, 800);
}
