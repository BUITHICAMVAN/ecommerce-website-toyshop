function Api() {
  this.fetchData = function () {
    const promise = axios({
      url: "https://6576fb1c197926adf62ceea5.mockapi.io/api/project",
      method: "GET",
    });

    return promise;
  };
}
