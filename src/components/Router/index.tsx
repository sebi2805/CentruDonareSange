import React from "react";
import { Route, Routes } from "react-router-dom";
import { CadreMedicaleTable } from "../CadreMedicaleTable";
import { FunctiiTable } from "../FunctiiTable";
export const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/functii" element={<FunctiiTable />} />
      <Route path="/cadremedicale" element={<CadreMedicaleTable />} />
    </Routes>
  );
};
