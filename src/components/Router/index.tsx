import React from "react";
import { Route, Routes } from "react-router-dom";
import { CadreMedicaleTable } from "../CadreMedicaleTable";
import { EchipamentTable } from "../EchipamenteTable";
import { FunctiiTable } from "../FunctiiTable";
import { ReviziiTehniceTable } from "../ReviziiTehniceTable";
import { SaloaneTable } from "../SaloaneTable";
export const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/functii" element={<FunctiiTable />} />
      <Route path="/cadremedicale" element={<CadreMedicaleTable />} />
      <Route path="/reviziitehnice" element={<ReviziiTehniceTable />} />
      <Route path="/echipamente" element={<EchipamentTable />} />
      <Route path="/saloane" element={<SaloaneTable />} />
    </Routes>
  );
};
