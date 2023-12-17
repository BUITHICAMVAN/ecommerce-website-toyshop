function Api() {
  this.fetchData = function () {
    const promise = axios({
      url: "https://6576fb1c197926adf62ceea5.mockapi.io/api/project",
      method: "GET",
    });

    return promise;
  };

  this.deleteData = function (id) {
    const promise = axios({
      url: `https://6576fb1c197926adf62ceea5.mockapi.io/api/project/${id}`,
      method: "DELETE",
    });
    return promise;
  };

  this.createData = function (product) {
    const promise = axios({
      url: `https://6576fb1c197926adf62ceea5.mockapi.io/api/project`,
      method: "POST",
      data: product,
    });
    return promise;
  };

  this.getProductById = function (id) {
    const promise = axios({
        url: `https://6576fb1c197926adf62ceea5.mockapi.io/api/project/${id}`,
        method: "GET",
      });
      return promise;
  };

}
