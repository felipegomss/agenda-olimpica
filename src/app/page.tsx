"use client";

import CardPartida from "@/components/cardPartida";
import Partidas from "@/components/partidas";
import { addHours, isPast, isToday, isYesterday, set } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface Partida {
  Hora: string;
  Evento: string;
  Esporte: string;
  "M/F": string;
  Etapa: string;
  "TV aberta": string;
  "TV fechada": string;
  Streaming: string;
  Data: string;
  BR: boolean;
  Link: string;
}

export default function Home() {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [partidasBrasil, setPartidasBrasil] = useState<Partida[]>([]);
  const [partidasHoje, setPartidasHoje] = useState<Partida[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        "https://script.googleusercontent.com/macros/echo?user_content_key=gXdGHIkMb5clgNoKabgb9sPTDYQscBjpL9bujrlUBbgnhKVR-B_ezvHxL47NR0y5455HQDBA2IpYOYVuvFT8LvX_InA0IMTtm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNDOZPaPL-b9SLeZ-j4QwjI7rw8T3mVaAgcaizzAPVouELDyo795joUYSffEyM1I8f4Gl_gaedpYsEDgckYU6dZsnxC70dUVMA&lib=MhvAzLCg-C_osMOLg1wqtBtIbbIa8tKKf"
      );
      const data: Partida[] = await res.json();
      const partidasAtualizadas = data.filter((partida) => {
        let date = new Date(partida.Data);
        date = new Date(date.setHours(date.getHours() + 3));
        return !isYesterday(date);
      });
      setPartidas(partidasAtualizadas);

      const partidasBrasil = data.filter((partida) => partida.BR);
      setPartidasBrasil(partidasBrasil);

      const partidasHoje = data.filter((partida) => {
        let date = new Date(partida.Data);
        date = new Date(date.setHours(date.getHours() + 3));
        return isToday(date);
      });
      setPartidasHoje(partidasHoje);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col gap-2 justify-center items-center">
        <Image
          src="/logo-olimpiadas.svg"
          alt="logo olimpiadas"
          className="animate-bounce"
          width={100}
          height={100}
        />
        Um momento, estamos carregando as informações...
      </div>
    );
  }

  return (
    <div className="p-2 space-y-4">
      <div className="p-2">
        <h2 className="text-2xl font-bold">Participações do Brasil</h2>
        <div className="w-10/12 sm:w-11/12 m-auto py-2">
          <Partidas partidas={partidasBrasil} />
        </div>
      </div>
      <div className="p-2">
        <h2 className="text-2xl font-bold">Partidas de Hoje</h2>
        <div className="w-10/12 sm:w-11/12 m-auto py-2">
          <Partidas partidas={partidasHoje} />
        </div>
      </div>
      <div className="p-2">
        <h2 className="text-2xl font-bold">Todas partidas</h2>
        <div className="m-auto py-2 grid md:grid-cols-4 ">
          {partidas?.map((partida, index) => (
            <div className="p-1" key={index}>
              <CardPartida {...partida} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
