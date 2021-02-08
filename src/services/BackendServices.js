import axios from "axios";
import fileDownload from "js-file-download";
import { API_BASE_URL } from "./apiConstants";

// Add a request interceptor
axios.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("authorization"));

  if (user && user.accessToken) {
    const token = "Bearer " + user.accessToken;
    config.headers.Authorization = token;
  }
  //alert(config);
  return config;
});

class BackendService {
  async getUserDetails() {
    return await axios.get(API_BASE_URL + "/api/details/user/me");
  }

  async postUserFiles(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    return await axios.post(
      API_BASE_URL + "/api/details/user/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      }
    );
  }

  async getUserFiles() {
    return await axios.get(API_BASE_URL + "/api/details/user/files");
  }

  async downloadFile(fileurl, fileName) {
    return await axios
      .get(fileurl, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, fileName);
      });
  }
}

export default new BackendService();
