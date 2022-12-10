import React from "react";
import { Route, Routes } from "react-router-dom";
import { CadreMedicaleTable } from "../CadreMedicaleTable";
import { DonatiiTable } from "../DonatiiTable";
import { DonatoriTable } from "../DonatoriTable";
import { EchipamentTable } from "../EchipamenteTable";
import { FunctiiTable } from "../FunctiiTable";
import { GrupeSangeTable } from "../GrupeSangeTable";
import { RecipienteTable } from "../RecipienteTable";
import { ReviziiTehniceTable } from "../ReviziiTehniceTable";
import { SaloaneTable } from "../SaloaneTable";
import { TesteTable } from "../TesteTable";
export const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/functii" element={<FunctiiTable />} />
      <Route path="/cadremedicale" element={<CadreMedicaleTable />} />
      <Route path="/reviziitehnice" element={<ReviziiTehniceTable />} />
      <Route path="/echipamente" element={<EchipamentTable />} />
      <Route path="/saloane" element={<SaloaneTable />} />
      <Route path="/teste" element={<TesteTable />} />
      <Route path="/recipiente" element={<RecipienteTable />} />
      <Route path="/donatii" element={<DonatiiTable />} />
      <Route path="/donatori" element={<DonatoriTable />} />
      <Route path="/grupesange" element={<GrupeSangeTable />} />
    </Routes>
  );
};
