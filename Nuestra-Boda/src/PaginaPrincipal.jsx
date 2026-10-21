import React from "react";
import Celebracion from "./componentes-encabezado/ubicacion";
import Vestimenta from "./componentes-encabezado/vestimenta";
import Novios from "./componentes-encabezado/novios";
import ConfirmacionAsistencia from "./componentes-encabezado/confirmacion";
import Musica from "./componentes-encabezado/Musica";
import MesadeRegalos from "./componentes-encabezado/MesadeRegalos";

export default function PaginaPrincipal() {

  return (
    <div>

      <Musica/>

      <Novios />

      <Celebracion/>

      <Vestimenta />

      <MesadeRegalos/>

      <ConfirmacionAsistencia/>
    </div>
  );
}