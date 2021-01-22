import React from "react";
import MainApp from "./MainApp";
import { SnackbarProvider } from "notistack";

export default function UserApp() {
  return (
    <div>
      <SnackbarProvider>
        <MainApp />
      </SnackbarProvider>
    </div>
  );
}
