const api = new Api();

function getEle(id) {
  return document.getElementById(id);
}

function getListProduct() {
  // pending => show loader
  getEle("loader").style.display = "block";
  const promise = api.fetchData();

  promise
    .then(function (result) {
      console.log("result", result.data);
      renderUI(result.data);
      //hide loader
      getEle("loader").style.display = "none";
    })
    .catch(function (error) {
      console.log("error", error);
      getEle("loader").style.display = "none";
    });
}

getListProduct();

function renderUI(data) {
  console.log(data);
  var content = "";
  for (var i = 0; i < data.length; i++) {
    const product = data[i];
    content += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card cardPhone">
              <img src="./../assets/img/${product.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h3 class="cardPhone__title">${product.name}</h3>
                    <p class="cardPhone__text">${product.description}</p>
                  </div>
                  <div>
                    <h3 class="cardPhone__title">${product.price}</h3>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="cardPhone__rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                  <div>
                    <button class="btnPhone-shadow">
                      <i class="fa fa-shopping-cart"></i> Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
  }

  document.getElementById("productList").innerHTML = content;
}
