import React from "react";
import { Route, Routes } from "react-router-dom";
import { CadreMedicaleCountTable } from "../CadreMedicaleCount/CadreMedicaleCount";
import { CadreMedicaleTable } from "../CadreMedicaleTable";
import { DashboardWrapper } from "../DashboardWrapper";
import { DonatiiTable } from "../DonatiiTable";
import { DonatoriTable } from "../DonatoriTable";
import { EchipamentTable } from "../EchipamenteTable";
import { FunctiiTable } from "../FunctiiTable";
import { GrupeSangeTable } from "../GrupeSangeTable";
import { MainPage } from "../MainPage";
import { RecipienteTable } from "../RecipienteTable";
import { ReviziiTehniceTable } from "../ReviziiTehniceTable";
import { SaloaneTable } from "../SaloaneTable";
import { TesteTable } from "../TesteTable";
export const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/functii"
        element={
          <DashboardWrapper>
            <FunctiiTable />
          </DashboardWrapper>
        }
      />
      <Route
        path="/cadremedicale"
        element={
          <DashboardWrapper>
            <CadreMedicaleTable />
          </DashboardWrapper>
        }
      />
      <Route
        path="/reviziitehnice"
        element={
          <DashboardWrapper>
            <ReviziiTehniceTable />
          </DashboardWrapper>
        }
      />
      <Route
        path="/echipamente"
        element={
          <DashboardWrapper>
            <EchipamentTable />
          </DashboardWrapper>
        }
      />
      <Route
        path="/saloane"
        element={
          <DashboardWrapper>
            <SaloaneTable />
          </DashboardWrapper>
        }
      />
      <Route
        path="/teste"
        element={
          <DashboardWrapper>
            <TesteTable />
          </DashboardWrapper>
        }
      />
      <Route
        path="/recipiente"
        element={
          <DashboardWrapper>
            <RecipienteTable />
          </DashboardWrapper>
        }
      />
      <Route
        path="/donatii"
        element={
          <DashboardWrapper>
            <DonatiiTable />
          </DashboardWrapper>
        }
      />
      <Route
        path="/donatori"
        element={
          <DashboardWrapper>
            <DonatoriTable />
          </DashboardWrapper>
        }
      />
      <Route
        path="/grupesange"
        element={
          <DashboardWrapper>
            <GrupeSangeTable />
          </DashboardWrapper>
        }
      />
      <Route
        path="/cadreMedicaleCount"
        element={
          <DashboardWrapper>
            <CadreMedicaleCountTable />
          </DashboardWrapper>
        }
      />
    </Routes>
  );
};
