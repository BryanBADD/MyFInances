import axios from "axios";

// https://nameless-atoll-61372.herokuapp.com/api

const api =  axios.create({
    baseURL: "https://nameless-atoll-61372.herokuapp.com/api",
});

export const insertTransaction = payload => api.post("/transaction", payload);
export const getAllTransactions = id => api.get("./transactions/" + id);
export const updateTransactionById = (id, payload) => api.put("/transaction/" + id, payload);
export const deleteTransactionById = id => api.delete("transaction/" + id);
export const getTransactionById = id => api.get("/transaction/$id");
export const getEveryTransaction = () => api.get("./transactions")
export const insertAccount = payload => api.post("/account", payload);
export const getAllAccounts = () => api.get("./accounts");
export const updateAccountById = (id, payload) => api.put("/account/" + id, payload);
export const deleteAccountById = id => api.delete("account/$id");
export const getAccountById = id => api.get("/account/$id");

const apis = {
    insertTransaction,
    getEveryTransaction,
    getAllTransactions,
    updateTransactionById,
    deleteTransactionById,
    getTransactionById,
    insertAccount,
    getAllAccounts,
    updateAccountById,
    deleteAccountById,
    getAccountById
};

export default apis;