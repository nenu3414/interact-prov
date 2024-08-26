import { API_URL } from "../utils_constant";

const getPublicDocs = async () => {
  return await fetch(`${API_URL}/prov/public`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => res)
    .catch((err) => console.log(err));
};

const createProvGraph = async (data: any) => {
  return await fetch(`${API_URL}/prov/create-graph`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

const exportProvDoc = async (data: any) => {
  return await fetch(`${API_URL}/prov/export-prov`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then((data) => data)
    .catch((err) => console.log(err));
};

const provApi = {
  getPublicDocs,
  createProvGraph,
  exportProvDoc,
};

export default provApi;
