import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "pages/landing";
import React from "react";
import ScrollToTop from "utils/ScrollToTop";
import StakePage from "pages/stake";
import BuyEarnPage from "pages/buyEarn";
import MyAssetPage from "pages/myAsset";
import DocsPage from "pages/docs";
import LoanPage from "pages/loan";
import SwapPage from "pages/swap";
import ContractPage from "pages/contract";
import IlpPage from "pages/ilp";
import InviStakePage from "pages/inviStake";

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/stake" element={<StakePage />} />
        <Route path="/buy&earn" element={<BuyEarnPage />} />
        <Route path="/ilp" element={<IlpPage />} />
        <Route path="/Myasset" element={<MyAssetPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/loan" element={<LoanPage />} />
        <Route path="/swap" element={<SwapPage />} />
        <Route path="/contract" element={<ContractPage />} />
        <Route path="invi/:staking" element={<InviStakePage />} />
        <Route path="/*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
