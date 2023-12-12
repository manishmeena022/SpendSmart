import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import AddTransaction from "./components/AddTransaction";
import AccountDashboard from "./components/dashboard/AccountDashboard";
import AccountDetails from "./components/dashboard/AccountDetails";
import AddAccount from "./components/AddAccount";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-transaction/:id" element={<AddTransaction />} />
        <Route path="/dashboard" element={<AccountDashboard />} />
        <Route
          path="/account-details/:accountID"
          element={<AccountDetails />}
        />
        <Route path="/dashboard/accounts/create" element={<AddAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;