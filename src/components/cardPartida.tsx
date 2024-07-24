import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { DotFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Partida } from "@/app/page";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function CardPartida(partida: Partida) {
  return (
    <Card className={`border ${partida.BR ? "border-green-700" : ""} `}>
      {" "}
      <CardHeader>
        <CardTitle className="flex items-center">
          <Image
            src="/logo-olimpiadas.svg"
            alt="logo olimpiadas"
            height={20}
            width={41.93}
            className="mr-2"
          />
          {partida.Esporte} <DotFilledIcon />
          {partida["M/F"] === "M" ? "Masculino" : "Feminino"}
        </CardTitle>
        <CardDescription className="flex items-center">
          {formatDate(partida.Data)} às {partida.Hora}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{partida.Evento}</p>
        <p>{partida.Etapa}</p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-around items-center bg-gradient-to-r from-yellow-500/90 from-10% via-sky-500/70 via-30% to-emerald-500/65 to-90% w-full rounded-md p-2">
          {partida["TV aberta"] && (
            <Image src="/globo.png" alt="Logo Globo" width={31} height={20} />
          )}
          {partida["TV fechada"] && (
            <div className="flex items-center">
              <Image
                src="/sportv.png"
                alt="Logo SporTV"
                width={81}
                height={20}
              />
              {partida["TV fechada"].includes(" ") && (
                <span className="font-black text-xl text-[#060439]">
                  {partida["TV fechada"].split(" ")[1]}
                </span>
              )}
            </div>
          )}
          {partida.Streaming && (
            <Link
              href={partida.Link}
              target="_blank"
              className="hover:scale-125"
            >
              <HoverCard>
                <HoverCardTrigger>
                  {partida.Streaming === "CazéTV" ? (
                    <Image
                      src="/cazetv.png"
                      alt="Logo CazéTV"
                      width={61}
                      height={20}
                    />
                  ) : (
                    <Image
                      src="/olympics.png"
                      alt="Logo Olympics.com"
                      className="bg-white p-1 rounded-md"
                      width={31}
                      height={20}
                    />
                  )}
                </HoverCardTrigger>
                <HoverCardContent side="top" className="text-xs">
                  Clique para assistir em {partida.Streaming}
                </HoverCardContent>
              </HoverCard>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
