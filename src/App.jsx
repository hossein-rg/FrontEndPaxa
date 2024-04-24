import React from "react";
import LoginPage from "./components/login/LoginPage";
import ShopPage from "./components/shop/ShopPage";
import { Route, Routes } from "react-router-dom";
import CheckWallet from "./components/checkwallet/CheckWallet";
import StatusPanels from "./components/statuspanels/StatusPanels";
import LogedInAdmin from "./components/statuspanels/LogedInAdmin";
import NewAdmin from "./components/statuspanels/NewAdmin";
class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/check" element={<CheckWallet />} />
        <Route path="/gotopanel" element={<StatusPanels />} />
        <Route path="/welcome" element={<LogedInAdmin />} />
        <Route path="/newadmin" element={<NewAdmin />} />
      </Routes>
    );
  }
}

export default App;
