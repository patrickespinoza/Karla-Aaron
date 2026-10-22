
import React from "react";
import { motion } from "framer-motion";

// ==========================================
// CONFIGURACIÓN EDITABLE
// ==========================================

const CONFIG = {
  // Imagen ubicada en public/images/
  imagen: "/Final.jpeg",

  descripcion: "Fotografía final de nuestra celebración",

  // ========================================
  // POSICIÓN DE LA IMAGEN
  // ========================================

  // CELULAR
  // 50% 50% = centro
  // 50% 20% = mostrar más la parte superior
  // 50% 80% = mostrar más la parte inferior
  posicionCelular: "50% 50%",

  // COMPUTADORA
  posicionComputadora: "50% 75%",

  // ========================================
  // ZOOM DE LA IMAGEN
  // ========================================

  // 1 = tamaño normal
  // 1.1 = zoom ligero
  // 1.2 = zoom mayor
  zoomCelular: 1,
  zoomComputadora: 1,
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function ImagenFinal() {
  return (
    <section
      className="
        relative
        isolate
        w-full
        h-[100svh]
        min-h-[400px]
        overflow-hidden
        bg-[#0B1425]
      "
      aria-label="Imagen final de la invitación"
    >
      {/* ======================================
          IMAGEN A PANTALLA COMPLETA
      ====================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      >
        <picture>
          <img
            src={CONFIG.imagen}
            alt={CONFIG.descripcion}
            loading="lazy"
            decoding="async"
            className="
              imagen-final
              absolute
              inset-0
              block
              h-full
              w-full
              object-cover
            "
            style={{
              "--pos-mobile": CONFIG.posicionCelular,
              "--pos-desktop": CONFIG.posicionComputadora,
              "--zoom-mobile": CONFIG.zoomCelular,
              "--zoom-desktop": CONFIG.zoomComputadora,
            }}
          />
        </picture>
      </motion.div>

      {/* ======================================
          ESTILOS RESPONSIVOS
      ====================================== */}

      <style>{`
        .imagen-final {
          object-position: var(--pos-mobile);
          transform: scale(var(--zoom-mobile));
          transform-origin: center;
        }

        @media (min-width: 768px) {
          .imagen-final {
            object-position: var(--pos-desktop);
            transform: scale(var(--zoom-desktop));
          }
        }
      `}</style>
    </section>
  );
}
