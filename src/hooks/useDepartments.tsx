import { useState, useEffect } from "react";
import { departamentos } from "../data/departments";

const useDepartments = () => {
  // Estado para almacenar los departamentos como un objeto con claves de tipo string
  // y valores de tipo array de strings
  const [departamentosState, setDepartamentosState] = useState<{ [key: string]: string[] }>({});
  
  // Efecto que inicializa el estado de departamentos
  // Se ejecuta una vez al montar el componente
  useEffect(() => {
    // Establece el estado con los departamentos importados desde el archivo de datos
    setDepartamentosState(departamentos);
  }, []);

  // Devuelve el estado de los departamentos para que pueda ser usado en componentes
  return departamentosState;
};

export default useDepartments;