import { AxiosError } from "axios";
import moment from "moment";
import { toast } from "sonner";
import { StatusProposal } from "../store/proposal/types";

export const formatDate = (date: string) => moment(date).format("DD/MM/YYYY");

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(value);

export const showAlertError = (error: AxiosError) => {
  if (error.response) {
    const data = error.response?.data as { message: string };

    toast.error(data.message);
  } else {
    toast.error("Ha ocurrido un error inesperado");
  }
};

export const borderClassByStatus = (status?: string | null) => {
  switch (status) {
    case StatusProposal.Accept:
      return "border-green-500";
    case StatusProposal.Reject:
      return "border-red-500";
    default:
      return "border-blue-500";
  }
};
