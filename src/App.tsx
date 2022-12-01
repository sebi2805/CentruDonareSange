import { ChakraProvider } from "@chakra-ui/react";
import { createContext } from "react";
import {
  ErrorCatcherInterface,
  useError,
} from "./components/common/ErrorService";
import { RoutesComponent } from "./components/Router";
import { theme } from "./theme";
export const ErrorServiceContext = createContext<ErrorCatcherInterface>(
  {} as ErrorCatcherInterface
);
export const App = () => {
  const contextHook = useError();
  return (
    <ChakraProvider theme={theme}>
      <ErrorServiceContext.Provider value={contextHook}>
        <RoutesComponent />
      </ErrorServiceContext.Provider>
    </ChakraProvider>
  );
};
