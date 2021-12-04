import React, { FormEvent, ReactElement } from "react";
import { helpHttp } from "../../api/helpHttp";
import { Service } from "../service/service";
import { useAppContext } from "../../context/context";
import "./from.css";

interface IShoes {
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
}

const FormShoes = (): ReactElement => {
  const { state, setState } = useAppContext();

  const [newShoes, setNewShoes] = React.useState<IShoes[]>([]);
  const [ciudadColombia, setCiudadColombia] = React.useState<Boolean>(false);
  const [ciudadMexico, setCiudadMexico] = React.useState<Boolean>(false);
  const [ciudadEcuador, setCiudadEcuador] = React.useState<Boolean>(false);
  const [ciudadChile, setCiudadChile] = React.useState<Boolean>(false);

  let api = helpHttp();
  let url = Service.datosShoes;
  const addShoes = (event: any) => {
    const { name, value } = event.target;
    setNewShoes({ ...newShoes, [name]: value });
    let paises = event.target.value;
    if (paises === "colombia") {
      setCiudadColombia(true);
    } else if (paises === "mexico") {
      setCiudadMexico(true);
    } else if (paises === "ecuador") {
      setCiudadEcuador(true);
    } else if (paises === "chile") {
      setCiudadChile(true);
    }
  };

  const enviarDatos = (event: FormEvent) => {
    event.preventDefault();
    api
      .post(url, {
        body: newShoes,
        headers: { "content-type": "application/json" },
      })
      .then((res) => {
        if (!res.err) {
          setState({
            ...state,
            ListShoes: res,
          });
        } else {
          console.log(res);
        }
      });
    window.location.reload();
  };
  return (
    <div className="container">
      <form onSubmit={enviarDatos}>
        <div className="row row-cols-1 row-cols-sm-3">
          <div className="content_input">
            <input
              type="text"
              className="form-control"
              onChange={addShoes}
              name="marca"
              placeholder="Marca"
            />
          </div>
          <div className="content_input">
            <input
              type="text"
              className="form-control"
              onChange={addShoes}
              name="modelo"
              placeholder="Modelo"
            />
          </div>
          <div className="content_input">
            <input
              type="number"
              className="form-control"
              onChange={addShoes}
              name="talla"
              placeholder="Talla"
            />
          </div>
          <div className="content_input">
            <input
              type="number"
              className="form-control"
              onChange={addShoes}
              name="precio"
              placeholder="Precio"
            />
          </div>
          <div className="content_input">
            <input
              type="text"
              className="form-control"
              onChange={addShoes}
              name="color"
              placeholder="Color"
            />
          </div>
          <div className="content_input">
            <input
              type="text"
              className="form-control"
              onChange={addShoes}
              name="material"
              placeholder="Material"
            />
          </div>
          <div className="content_input">
            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
              onChange={addShoes}
              name="pais"
              placeholder="pais"
            >
              <option value="" selected>
                País
              </option>
              <option value="colombia">Colombia</option>
              <option value="mexico">Mexico</option>
              <option value="ecuador">Ecuador</option>
              <option value="chile">Chile</option>
            </select>
          </div>
          <div className="content_input">
            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
              onChange={addShoes}
              name="ciudad"
              placeholder="ciudad"
            >
              <option value="" selected>
                Ciudad
              </option>
              {ciudadColombia ? (
                <>
                  <option value="bogota">Bogota</option>
                  <option value="barranquilla">Barranquilla</option>
                  <option value="ibague">Ibague</option>
                  <option value="valledupar">Valledupar</option>
                </>
              ) : null}
              {ciudadMexico ? (
                <>
                  <option value="ciudad de México">Ciudad de México</option>
                  <option value="tijuana">Tijuana</option>
                  <option value="león">León</option>
                  <option value="guadalajara">Guadalajara</option>
                </>
              ) : null}
              {ciudadEcuador ? (
                <>
                  <option value="quito">Quito</option>
                  <option value="guayaquil">Guayaquil</option>
                  <option value="cuenca">Cuenca</option>
                  <option value="machala">Machala</option>
                </>
              ) : null}
              {ciudadChile ? (
                <>
                  <option value="Santiago">Santiago</option>
                  <option value="maipú">Maipú</option>
                  <option value="puente Alto">Puente Alto</option>
                  <option value="la Florida">La Florida</option>
                </>
              ) : null}
            </select>
          </div>
          <div className="content_input">
            <input
              type="date"
              className="form-control"
              onChange={addShoes}
              name="fecha"
              placeholder="fecha"
            />
          </div>
          <div className="content_input">
            <input
              type="text"
              className="form-control"
              onChange={addShoes}
              name="estado"
              placeholder="Estado"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success" id="button_send">
          Enviar
        </button>
      </form>
    </div>
  );
};
export default FormShoes;
