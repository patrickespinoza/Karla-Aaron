import React from "react";
import Celebracion from "./componentes-encabezado/ubicacion";
import Vestimenta from "./componentes-encabezado/vestimenta";
import Novios from "./componentes-encabezado/novios";
import ConfirmacionAsistencia from "./componentes-encabezado/confirmacion";
import Musica from "./componentes-encabezado/Musica";
import MesadeRegalos from "./componentes-encabezado/MesadeRegalos";
import ImagenIntermedia from "./componentes-encabezado/ImagenIntermedia";
import ImagenFinal from "./componentes-encabezado/ImagenFinal";

export default function PaginaPrincipal() {

  return (
    <div>

      <Musica/>

      <Novios />

      <Celebracion/>

      <ImagenIntermedia/>

      <Vestimenta />

      <MesadeRegalos/>

      <ConfirmacionAsistencia/>

      <ImagenFinal/>
    </div>
  );
}