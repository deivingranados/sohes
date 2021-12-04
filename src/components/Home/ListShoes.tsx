import React, { ReactElement, useEffect } from "react";
import MaterialTable from "material-table";
import FormShoes from "../formAuto/FormAuto";
import { useAppContext } from "../../context/context";
import { getGlobalDatos } from "../service/service";
import { RiFileExcel2Line } from "react-icons/ri";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import "./list.css";
import XLSX from "xlsx";

type prosType = any;

const ListShoesComponent = (props: prosType): ReactElement => {
  let prop = props;
  const { state, setState } = useAppContext();
  const [contentForm, setContentForm] = React.useState<Boolean>(false);
  const [buttonValid, setButtonValid] = React.useState<Boolean>(true);
  const { ListShoes } = state;
  type IType =
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
  const string: IType = "string";
  const currency: IType = "currency";
  const columns = [
    {
      title: "Marca",
      field: "marca",
      type: string,
    },
    {
      title: "Fecha",
      field: "fecha",
      type: string,
    },
    {
      title: "Modelo",
      field: "modelo",
      type: string,
    },
    {
      title: "Talla",
      field: "talla",
      type: string,
    },
    {
      title: "Precio",
      field: "precio",
      type: currency,
    },
    {
      title: "Estado",
      field: "estado",
      type: string,
    },

    {
      title: "Taterial",
      field: "material",
      type: string,
    },
  ];

  useEffect(() => {
    if (!ListShoes) {
      getGlobalDatos().then((result) => {
        setState({
          ...state,
          ListShoes: result,
        });
      });
    }
  }, [ListShoes, setState, state]);

  const hadleCreate = () => {
    setContentForm(true);
    setButtonValid(false);
  };

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(ListShoes || []);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "shoes");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ListShoes.xlsx");
    console.log(buf);
  };

  return (
    <div className="content">
      {contentForm ? <FormShoes /> : null}
      {buttonValid ? (
        <div className="button_crear" onClick={hadleCreate}>
          crear inventario
        </div>
      ) : null}
      <div className="content_table">
        <MaterialTable
          title="Informacion de zapatos"
          columns={columns}
          data={ListShoes || []}
          {...prop}
          icons={{
            Edit: () => <Edit style={{ color: "#009900" }} />,
            Delete: () => <Delete style={{ color: "red" }} />,
          }}
          editable={{
            onRowUpdate: (newData, oldData: prosType) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...(ListShoes || [])];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setState({
                    ...state,
                    ListShoes: dataUpdate,
                  });

                  resolve({});
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...(ListShoes || [])];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setState({
                    ...state,
                    ListShoes: dataDelete,
                  });
                  resolve({});
                }, 1000);
              }),
          }}
          options={{
            paging: true,
            pageSizeOptions: [2, 5, 10],
            pageSize: 10,
            paginationType: "stepped",
            headerStyle: {
              background: "#009900",
              color: "white",
              border: "solid 2px white",
              textAlign: "center",
              fontFamily: "monospace",
              fontSize: 16,
            },
            rowStyle: {
              borderBottom: "solid 4px #d8d8d8",
              fontFamily: "monospace",
              fontSize: 15,
            },
          }}
          detailPanel={[
            {
              icon: "dns",
              tooltip: "Detalles",
              render: (rowData) => {
                return (
                  <div
                    style={{
                      fontSize: 15,
                      color: "green",
                      backgroundColor: "withe",
                      padding: 20,
                      textAlign: "center",
                      fontFamily: "serif",
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                  >
                    {" "}
                    <h6>Detalles de garantia</h6>
                    <div className="row row-cols-2 row-cols-sm-4">
                      <div className="content_details">
                        <div className="title_details">Material</div>
                        <p className="text">{rowData.material}</p>
                      </div>
                      <div className="content_details">
                        <div className="title_details">Confor</div>
                        <p className="text">{rowData.puntos}-puntos</p>
                      </div>
                      <div className="content_details">
                        <div className="title_details"> Garantia</div>
                        <p className="text">1 año</p>
                      </div>
                      <div className="content_details">
                        <div className="title_details"> Fecha</div>
                        <p className="text">{rowData.fecha}</p>
                      </div>
                    </div>
                  </div>
                );
              },
            },
          ]}
          actions={[
            {
              icon: () => (
                <div className="icon">
                  <RiFileExcel2Line />
                </div>
              ),
              tooltip: "Export to Excel",
              onClick: () => downloadExcel(),
              isFreeAction: true,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ListShoesComponent;
