import { useAddress, useNetwork } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Proposal from "./pages/Proposal";
import REALs from "./pages/REALs";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Notfound from "./404";
import Creation from "./Creation";
import Header from "./Header";
import AdminPanel from "./pages/AdminPanel";
import Account from "./pages/Account";

const App = () => {

  const address = useAddress();
  const network = useNetwork();

  if (address && network?.[0].data?.chain?.id !== ChainId.Polygon) {
    return (<Header />);
  } else {
    return (
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/DAO" element={<Home />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reals" element={<REALs />} />
          <Route path="/create" element={<Creation />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/account" element={<Account />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </div>
    );
  }
};

export default App;
