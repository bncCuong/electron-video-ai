/** @format */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ControlLayout from "./layouts/control-layout";
import AuthButton from "./components/global/auth-button";
import Widget from "./components/global/widget";
const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Toaster />
      <ControlLayout>
        <AuthButton />
        <Widget />
      </ControlLayout>
    </QueryClientProvider>
  );
}

export default App;
