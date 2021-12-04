export interface AppContextType {
  state: StateType;
  setState: (state: StateType) => void;
}
export interface IShoes {
  id: number;
  marca: string;
  modelo: string;
  talla: string;
  precio: string;
  pais: string;
  ciudad: string;
  color: string;
  material: string;
  fecha: string;
  estado: string;
  puntos: string;
  tableData: {
    id: number;
  };
}

export interface StateType {
  ListShoes?: IShoes[];
}
