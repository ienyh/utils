import RequestManager from "../src/RequestManager";

describe("RequestManager", () => {
  const fetcher = async () => {
    return "请求成功"
  }

  const requestManager = new RequestManager(fetcher);

  test("runAsync", () => {
    requestManager.runAsync().then(res => expect(res).toBe("请求成功"));
  })

})
