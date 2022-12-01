import { useToast } from "@chakra-ui/react";
import { ToastPosition } from "@chakra-ui/react";

export interface ToastInterface {
  title: string;
  description: string;
  status: "error" | "warning";
  duration: number;
  isClosable: boolean;
  colorScheme: string;
  position: ToastPosition;
  size: string;
}
export interface ErrorCatcherInterface {
  createError: (message: string, options?: Partial<ToastInterface>) => void;
  createToast: (message: string, options?: Partial<ToastInterface>) => void;
}

export const useError = (): ErrorCatcherInterface => {
  const toast = useToast();

  const defaultErrorMessages: Partial<ToastInterface> = {
    title: "An error has occcured",
    description: "Whoops! Something went wrong.",
    position: "top-right",
    isClosable: true,
    status: "error",
  };

  const createError = (
    errorMessage: string,
    options?: Partial<ToastInterface>
  ) => {
    toast({
      ...defaultErrorMessages,
      title: "ERROR",
      description: errorMessage,
      ...options,
    });
  };
  const createToast = (message?: string, options?: Partial<ToastInterface>) => {
    return toast({
      title: options?.status === "warning" ? "Warning" : "Success",
      description: `${message || "The operation was a succes"}`,
      status: "success",
      position: "top-right",
      isClosable: true,
      ...options,
    });
  };
  return { createError, createToast };
};
