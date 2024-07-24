import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isTomorrow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(dateString: string) {
  let date = new Date(dateString);
  date = new Date(date.setHours(date.getHours() + 3));

  if (isToday(date)) {
    return "Hoje";
  } else if (isTomorrow(date)) {
    return "Amanhã";
  } else {
    return format(date, "d 'de' MMMM", { locale: ptBR });
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
