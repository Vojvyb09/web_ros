/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, type ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/components/Home";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminPanel } from "@/components/AdminPanel";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center", background: "#fafaf9", minHeight: "100vh", color: "#1c1917" }}>
          <h1 style={{ fontFamily: "serif", marginBottom: "1rem" }}>Něco se pokazilo</h1>
          <p>Obnovte stránku. Pokud problém trvá, zkuste později.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
