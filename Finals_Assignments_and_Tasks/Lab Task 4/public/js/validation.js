$(document).ready(function () {
  function validateField(selector, condition, errorMessage) {
    const field = $(selector);
    const feedback = field.siblings(".invalid-feedback");
    if (condition) {
      field.removeClass("is-invalid").addClass("is-valid");
      return true;
    } else {
      field.removeClass("is-valid").addClass("is-invalid");
      if (feedback.length) {
        feedback.text(errorMessage);
      }
      return false;
    }
  }

  const validators = {
    fullName: () =>
      validateField(
        "#fullName",
        $("#fullName").val().trim().length >= 3,
        "Required, must be at least 3 characters."
      ),
    email: () =>
      validateField(
        "#email",
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#email").val().trim()),
        "Please enter a valid email address."
      ),
    phone: () =>
      validateField(
        "#phone",
        /^\d{10,}$/.test($("#phone").val().trim().replace(/\s/g, "")),
        "Required, must be digits only, at least 10 digits."
      ),
    address: () =>
      validateField(
        "#address",
        $("#address").val().trim() !== "",
        "Please enter your shipping address."
      ),
    city: () =>
      validateField(
        "#city",
        $("#city").val().trim() !== "",
        "City is required."
      ),
    zip: () =>
      validateField(
        "#zip",
        /^\d{4,6}$/.test($("#zip").val().trim()),
        "Must be a numeric code, 4-6 digits long."
      ),
    country: () =>
      validateField(
        "#country",
        $("#country").val() !== "",
        "Please select a valid country."
      ),
    terms: () => {
      const field = $("#terms-check");
      const isValid = field.is(":checked");
      isValid ? field.removeClass("is-invalid") : field.addClass("is-invalid");
      return isValid;
    },

    paymentMethod: () => {
      const isChecked = $('input[name="paymentMethod"]:checked').length > 0;
      const feedback = $("#payment-method-feedback");
      if (isChecked) {
        feedback.text("");
        return true;
      } else {
        feedback.text("Please select a payment method.");
        return false;
      }
    },
    creditCard: () => {
      if ($("#credit").is(":checked")) {
        const nameValid = validateField(
          "#cc-name",
          $("#cc-name").val().trim() !== "",
          "Name on card is required."
        );
        const numValid = validateField(
          "#cc-number",
          /^\d{13,16}$/.test($("#cc-number").val().trim().replace(/\s/g, "")),
          "Enter a valid card number."
        );
        const expValid = validateField(
          "#cc-expiration",
          /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(
            $("#cc-expiration").val().trim()
          ),
          "Use MM/YY format."
        );
        const cvvValid = validateField(
          "#cc-cvv",
          /^\d{3,4}$/.test($("#cc-cvv").val().trim()),
          "Enter a valid CVV."
        );
        return nameValid && numValid && expValid && cvvValid;
      }
      return true;
    },
  };

  $("#fullName, #email, #phone, #address, #city, #zip").on("blur", function () {
    validators[this.id]();
  });

  $("#country").on("change", validators.country);

  $('#terms-check, input[name="paymentMethod"]').on("change", function () {
    validators.terms();
    validators.paymentMethod();
  });

  $("#credit-card-fields input").on("blur", validators.creditCard);

  $("#terms-check").on("change", function () {
    $("#place-order-btn").prop("disabled", !this.checked);
  });

  $('input[name="paymentMethod"]').on("change", function () {
    if ($("#credit").is(":checked")) {
      $("#credit-card-fields").slideDown();
    } else {
      $("#credit-card-fields").slideUp();
      $("#credit-card-fields input").removeClass("is-invalid is-valid");
    }
  });

  $("#checkout-form").on("submit", function (event) {
    event.preventDefault();

    const isFormValid = Object.values(validators).reduce(
      (isValid, validator) => {
        return validator() && isValid;
      },
      true
    );

    if (isFormValid) {
      alert("Form submitted successfully!");
    } else {
      const firstError = $(".is-invalid:visible").first();
      if (firstError.length) {
        $("html, body").animate(
          {
            scrollTop: firstError.offset().top - 120,
          },
          500
        );
      }
    }
  });
});
