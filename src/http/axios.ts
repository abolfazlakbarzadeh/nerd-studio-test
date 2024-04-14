import AxiosPkg from "axios";

const token = process.env.NEXT_PUBLIC_DEEP_SEEK_TOKEN;
if (!token) {
  console.log("Please Check API Token!");
  process.exit(1);
}

const axiosIns = AxiosPkg.create({
  baseURL: "https://api.deepseek.com/v1",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  responseType: "stream",
});

export { axiosIns as axios };
