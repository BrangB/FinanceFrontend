let host = "https://testing-2jq8.onrender.com"

const login = `${host}/api/getData`
const signup = `${host}/api/postData`
const insertData = `${host}/api/insertData`
const insertExpense = `${host}/api/insertExpense`
const insertIncome = `${host}/api/insertIncome`
const Adminlogin = `${host}/api/Adminlogin`
const banAccounts = `${host}/api/banAccount`
const MessageInsert = `${host}/api/MessageInsert`
const GetMessage = `${host}/api/GetMessage`

module.exports = {
    login,
    signup,
    insertData,
    insertExpense,
    insertIncome,
    Adminlogin,
    banAccounts,
    MessageInsert,
    GetMessage
}