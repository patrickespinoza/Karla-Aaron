
import React from "react";
import { motion } from "framer-motion";

// ==========================================
// CONFIGURACIÓN EDITABLE
// ==========================================

const CONFIG = {
  imagen: "/Intermedia.jpeg",
  descripcion: "Una fotografía especial de nuestra historia",

  // Ancho máximo en computadora
  anchoMaximo: "620px",
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function ImagenIntermedia() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F4F0E7]
        px-5
        pt-8 pb-20
        sm:px-8
        sm:pt-12 sm:pb-28
        lg:pb-32
      "
    >
      {/* CONTENEDOR INVISIBLE */}

      <motion.div
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.97,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          mx-auto
          flex w-full
          items-center justify-center
        "
        style={{
          maxWidth: CONFIG.anchoMaximo,
        }}
      >
        {/* IMAGEN COMPLETA, SIN RECORTES */}

        <img
          src={CONFIG.imagen}
          alt={CONFIG.descripcion}
          loading="lazy"
          decoding="async"
          className="
            block
            h-auto
            w-full
            max-h-[75vh]
            object-contain
            sm:max-h-[80vh]
            lg:max-h-[720px]
          "
        />
      </motion.div>
    </section>
  );
}
