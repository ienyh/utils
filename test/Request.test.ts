import Request from "../package/Request";

describe("Request", () => {
  const o = new Request();

  test("o.request", () => {
    o.request({
      url: "https://www.bing.com",
      method: "GET",
    }).then(res => expect(res).toBeTruthy());
  })

})
