const api = new Api();

function getEle(id) {
  return document.getElementById(id);
}

function renderUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    const product = data[i];
    content += `
        <tr>
            <td>${i + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <img src="./../../assets/img/${product.image}" width="50" />
            </td>
            <td>${product.description}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct(${
                  product.id
                })">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${
                  product.id
                })">Delete</button>
            </td>
        </tr>
    `;
  }
  getEle("tblDanhSachSP").innerHTML = content;
}

function getListProduct() {
  const promise = api.fetchData();

  promise
    .then(function (result) {
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProduct();

/**
 * Delete Product
 */
function deleteProduct(id) {
  const promise = api.deleteData(id);
  promise
    .then(function () {
      //show info
      alert("Delete Success!");
      //re-fetch data
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemSP").onclick = function () {
  // Update title => header model
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";
  // Create button "Add Product" => footer modal
  const btnAdd = `<button class="btn btn-primary" onclick="addProduct()">Add Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
};

/**
 * Add Product
 */
function addProduct() {
  const name = getEle("TenSP").value;
  const price = getEle("GiaSP").value;
  const des = getEle("MoTa").value;

  var imageName = "";
  const image = getEle("HinhSP");
  if (image && image.files.length > 0) {
    imageName = image.files[0].name;
  }

  // tạo đối tượng từ lớp đối tượng Product
  const product = new Product("", name, price, imageName, des);

  const promise = api.createData(product);

  promise
    .then(function () {
      alert("Add Success!");
      //re-fetch data
      getListProduct();
      //close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Edit Product
 */
function editProduct(id) {
  // Update title => header model
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Update Product";
  // Create button "Update Product" => footer modal
  const btnUpdate = `<button class="btn btn-primary" onclick="updateProduct(${id})">Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  //lấy thông tin chi tiết product => hiển thị ra các thẻ input
  const promise = api.getProductById(id);
  promise
    .then(function (result) {
      const product = result.data;
      getEle("TenSP").value = product.name;
      getEle("GiaSP").value = product.price;
      getEle("MoTa").value = product.description;
    })
    .catch(function (error) {
      console.log(error);
    });
}


