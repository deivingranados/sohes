export const Service = {
  datosShoes: "http://localhost:5000/datos",
};

export const getGlobalDatos = async () => {
  return fetch(Service.datosShoes).then((data) => data.json());
};
