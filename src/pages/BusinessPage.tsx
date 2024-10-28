import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { Whatsapp } from "../../public/icons/Whatsapp";
import { Facebook } from "../../public/icons/Facebook";
import { Instagram } from "../../public/icons/Instagram";
import { LeftArrow } from "../../public/icons/LeftArrow";

interface BusinessData {
  nombre: string;
  descripcion: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  hora_a: string;
  hora_c: string;
  categorias: string[];
}

const BusinessPage: React.FC = () => {
  const { businessName } = useParams<{ businessName: string }>();
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (businessName) {
        setLoading(true);
        const { data, error } = await supabase
          .from("negocios")
          .select("*")
          .eq("slug", businessName);

        if (error) {
          setError("Error fetching business data");
          console.error("Error fetching business data:", error);
        } else if (data.length === 0) {
          navigate("/404");
        } else {
          setBusinessData(data[0]);
        }
        setLoading(false);
      }
    };
    fetchBusinessData();
  }, [businessName, navigate]);

  const isOpen = () => {
    if (!businessData) return false;

    const now = new Date();
    const [openHour, openMinute] = businessData.hora_a.split(':').map(Number);
    const [closeHour, closeMinute] = businessData.hora_c.split(':').map(Number);

    const openTime = new Date();
    openTime.setHours(openHour, openMinute, 0);

    const closeTime = new Date();
    closeTime.setHours(closeHour, closeMinute, 0);

    return now >= openTime && now <= closeTime;
  };

  if (loading) return <div className="text-center py-4">Cargando...</div>;
  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!businessData) return null;

  const horarioClass = isOpen() ? "text-green-600" : "text-red-600";

  return (
    <div className="bg-white">
      <span
        className="absolute top-8 left-8 inline-flex items-center text-gray-400 cursor-pointer border-2 p-2 rounded-full"
        onClick={() => navigate("/")}
      >
        <LeftArrow />
      </span>
      <div className="w-full h-48 bg-gray-600 text-white flex items-center justify-center">Imagen del negocio</div>
      <section className="px-8 py-6 flex flex-col">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {businessData.nombre}
        </h1>
        <p className="text-gray-600 mb-3 text-pretty">{businessData.descripcion}</p>
        <p className={`${horarioClass} mb-4`}>
          <span className="font-semibold">Horario:</span> {businessData.hora_a}{" "}
          - {businessData.hora_c}
        </p>
        <div className="mb-4 flex gap-3 flex-wrap">
          {businessData.categorias.map((categoria) => (
            <span
              key={categoria}
              className="inline-block text-blue-600 font-medium border border-current rounded-full px-4 py-1 text-center"
            >
              {categoria}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href={`https://wa.me/${businessData.whatsapp}`}
            className="inline-flex gap-2 items-center text-white font-semibold bg-[#25D366] py-2 px-4 rounded-md hover:opacity-80 transition-opacity"
          >
            <Whatsapp />
            <span>WhatsApp</span>
          </a>
          <a
            href={businessData.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-2 items-center text-white font-semibold bg-blue-500 py-2 px-4 rounded-md hover:opacity-80 transition-opacity"
          >
            <Facebook />
            <span>Facebook</span>
          </a>
          <a
            href={businessData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-2 items-center text-white font-semibold bg-[linear-gradient(to_right,_#833ab4,_#fd1d1d,_#fcb045)] py-2 px-4 rounded-md hover:opacity-80 transition-opacity"
          >
            <Instagram />
            <span>Instagram</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default BusinessPage;