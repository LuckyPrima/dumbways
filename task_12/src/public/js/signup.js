const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");

const confirmPasswordInput = document.getElementById("confirmPassword");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// ================= EMAIL VALIDATION =================
if (emailInput && emailError) {
  emailInput.addEventListener("input", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value)) {
      emailError.classList.remove("hidden");
    } else {
      emailError.classList.add("hidden");
    }
  });
}

// ================= PASSWORD LENGTH =================
if (passwordInput && passwordError) {
  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length < 8) {
      passwordError.classList.remove("hidden");
    } else {
      passwordError.classList.add("hidden");
    }

    // re-check confirm password when password changes
    checkPasswordMatch();
  });
}

// ================= PASSWORD MATCH =================
if (confirmPasswordInput && confirmPasswordError) {
  confirmPasswordInput.addEventListener("input", checkPasswordMatch);
}

function checkPasswordMatch() {
  if (
    confirmPasswordInput.value &&
    passwordInput.value !== confirmPasswordInput.value
  ) {
    confirmPasswordError.classList.remove("hidden");
  } else {
    confirmPasswordError.classList.add("hidden");
  }
}
