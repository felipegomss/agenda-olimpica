"use client";

import CardPartida from "@/components/cardPartida";
import Partidas from "@/components/partidas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isToday, isYesterday } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import {
  DotFilledIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

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
  const [partidasFiltro, setPartidasFiltro] = useState<Partida[]>([]);
  const [partidasBrasil, setPartidasBrasil] = useState<Partida[]>([]);
  const [partidasHoje, setPartidasHoje] = useState<Partida[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

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

      setPartidasFiltro(partidasAtualizadas);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleFilter = (event: any) => {
    event.preventDefault();
    if (filtro === "") {
      setPartidasFiltro(partidas);
      return;
    }
    setPartidasFiltro(
      partidas.filter(
        (partida) =>
          partida.Evento.toLowerCase().includes(filtro.toLowerCase()) ||
          partida.Esporte.toLowerCase().includes(filtro.toLowerCase()) ||
          partida.Etapa.toLowerCase().includes(filtro.toLowerCase())
      )
    );
  };

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
    <main className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-500/90 from-10% via-sky-500/70 via-30% to-emerald-500/65 to-90% w-full text-white text-center py-2">
        <h1 className="text-3xl font-bold">Agenda olímpica - Paris 2024</h1>
      </div>
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
        <div className="p-2 space-y-4">
          <h2 className="text-2xl font-bold">Todas partidas</h2>
          <div className="border rounded-xl">
            <form
              onSubmit={() => handleFilter(event)}
              className="p-4 flex gap-2"
            >
              <Input
                type="text"
                placeholder="Filtrar"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
              <Button>
                <SearchIcon className="mr-2 h-4 w-4" /> Login with Email
              </Button>
            </form>
            <div className="m-auto  py-4 p-2 grid md:grid-cols-4 h-screen overflow-scroll ">
              {partidasFiltro?.map((partida, index) => (
                <div className="p-1" key={index}>
                  <CardPartida {...partida} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <p>
          Este é um projeto feito por{" "}
          <Link
            href="https://felipegomes.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {" "}
            Felipe Gomes
          </Link>
        </p>
        <div className="flex justify-center items-center space-x-4 mt-2">
          <Link
            href="https://twitter.com/felipegomss"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterLogoIcon className="w-6 h-6 text-gray-600 hover:text-black" />
          </Link>
          <Link
            href="https://www.instagram.com/felipegomss"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogoIcon className="w-6 h-6 text-gray-600 hover:text-black" />
          </Link>

          <DotFilledIcon />

          <Link
            href="https://www.instagram.com/futenatv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogoIcon className="w-6 h-6 text-gray-600 hover:text-black" />
          </Link>
          <Link
            href="https://twitter.com/futnatv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterLogoIcon className="w-6 h-6 text-gray-600 hover:text-black" />
          </Link>
        </div>
        <p className="mt-2">
          Utilizamos a base de dados do{" "}
          <Link
            href="https://www.instagram.com/futenatv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            @futnatv
          </Link>
        </p>
      </footer>
    </main>
  );
}
