import { SearchHeadlessProvider } from "@yext/search-headless-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SearchHeadlessProvider
      apiKey="b083465ee2ad3d23460e150c6a297f7f"
      experienceKey="pokemon"
      verticalKey="pokemon"
      locale="en"
    >
      <App />
    </SearchHeadlessProvider>
  </React.StrictMode>
);