$(document).ready(function () {
  const apiUrl = "https://fakestoreapi.com/products";

  fetchProducts();

  function fetchProducts() {
    $("#loading").show();
    $("#product-cards").hide();
    $.get(apiUrl, function (products) {
      $("#loading").hide();
      $("#product-cards").empty().show();
      products.forEach(renderProductCard);
    }).fail(() => {
      $("#loading").hide();
      showToast("Error fetching products.", "danger");
    });
  }

  function renderProductCard(product) {
    const cardHtml = `
            <div class="col-md-4 col-lg-3 mb-4" id="product-${product.id}">
                <div class="card">
                    <div class="card-img-container">
                        <img src="${product.image}" class="card-img-top" alt="${
      product.title
    }">
                    </div>
                    <div class="card-body p-4">
                        <h5 class="card-title text-truncate">${
                          product.title
                        }</h5>
                        <p class="card-price">$${product.price.toFixed(2)}</p>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-sm text-dark edit-btn" data-id="${
                          product.id
                        }" data-bs-toggle="modal" data-bs-target="#product-modal"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm text-danger delete-btn" data-id="${
                          product.id
                        }"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    $("#product-cards").append(cardHtml);
  }

  $("#add-product-btn").on("click", () => {
    $("#modal-title").text("Add New Product");
    $("#product-form")[0].reset();
    $("#product-id").val("");
  });

  $("#product-form").on("submit", function (e) {
    e.preventDefault();
    const productId = $("#product-id").val();
    const productData = {
      title: $("#title").val(),
      price: parseFloat($("#price").val()),
      description: $("#description").val(),
      image: $("#image").val(),
      category: $("#category").val(),
    };

    const method = productId ? "PUT" : "POST";
    const url = productId ? `${apiUrl}/${productId}` : apiUrl;

    $.ajax({
      url,
      method,
      contentType: "application/json",
      data: JSON.stringify(productData),
    })
      .done(function (product) {
        $("#product-modal").modal("hide");
        showToast(
          `Product ${productId ? "updated" : "created"} successfully!`,
          "success"
        );

        const finalId = productId || new Date().getTime();
        product.id = finalId;

        $(`#product-${finalId}`).remove();
        renderProductCard(product);
      })
      .fail(() => {
        $("#product-modal").modal("hide");
        showToast("Error saving product.", "danger");
      });
  });

  $("#product-cards").on("click", ".edit-btn", function () {
    const productId = $(this).data("id");
    $.get(`${apiUrl}/${productId}`, function (product) {
      $("#modal-title").text("Edit Product");
      $("#product-id").val(product.id);
      $("#title").val(product.title);
      $("#price").val(product.price);
      $("#description").val(product.description);
      $("#image").val(product.image);
      $("#category").val(product.category);
    }).fail(() => showToast("Error fetching product details.", "danger"));
  });

  $("#product-cards").on("click", ".delete-btn", function () {
    const productId = $(this).data("id");
    if (confirm("Are you sure you want to delete this product?")) {
      $.ajax({ url: `${apiUrl}/${productId}`, method: "DELETE" })
        .done(() => {
          $(`#product-${productId}`).fadeOut(400, function () {
            $(this).remove();
          });
          showToast("Product deleted.", "dark");
        })
        .fail(() => showToast("Error deleting product.", "danger"));
    }
  });

  function showToast(message, type) {
    const toastHtml = `
            <div class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex"><div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>
            </div>`;
    const toastEl = $(toastHtml);
    $(".toast-container").append(toastEl);
    const toast = new bootstrap.Toast(toastEl[0]);
    toast.show();
  }
});
