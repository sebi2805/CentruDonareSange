import React from "react";
import { Route, Routes } from "react-router-dom";
import { CadreMedicaleCountTable } from "../CadreMedicaleCount/CadreMedicaleCount";
import { CadreMedicaleFunctii } from "../CadreMedicaleFunctii";
import { CadreMedicaleTable } from "../CadreMedicaleTable";
import { DashboardWrapper } from "../DashboardWrapper";
import { DonatiiJoinTable } from "../DonatiiJoin";
import { DonatiiTable } from "../DonatiiTable";
import { DonatoriTable } from "../DonatoriTable";
import { EchipamenteSaloane } from "../EchipamenteSaloane/EchipamenteSaloane";
import { EchipamentTable } from "../EchipamenteTable";
import { FunctiiCount } from "../FunctiiCount";
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
        path="/functiis"
        element={
          <DashboardWrapper>
            <FunctiiTable />
          </DashboardWrapper>
        }
      />
      <Route
        path="/cadremedicales"
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
        path="/echipaments"
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
        path="/donatiis"
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
      <Route
        path="/donatiiJoin"
        element={
          <DashboardWrapper>
            <DonatiiJoinTable />
          </DashboardWrapper>
        }
      />
      <Route
        path="/functiiCount"
        element={
          <DashboardWrapper>
            <FunctiiCount />
          </DashboardWrapper>
        }
      />
      <Route
        path="/cadreMedicaleFunctii"
        element={
          <DashboardWrapper>
            <CadreMedicaleFunctii />
          </DashboardWrapper>
        }
      />
      <Route
        path="/echipamenteSaloane"
        element={
          <DashboardWrapper>
            <EchipamenteSaloane />
          </DashboardWrapper>
        }
      />
    </Routes>
  );
};
