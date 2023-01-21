import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducers, RootState } from "../../store";
import "./Alerta.css";

function Alerta(): JSX.Element {
  const alerta = useSelector((state: RootState) => state.alerta);
  const dispatch = useDispatch();

  function esconder() {
    dispatch(reducers.alerta.esconder());
  }

  function className(): string {
    let name = "alert alert-simple alert-danger ";
    if (!alerta.virgem) {
      name += alerta.visivel ? "mostrar" : "esconder";
    }
    return name;
  }

  useEffect(() => {
    if (alerta.visivel) {
      setTimeout(() => {
        dispatch(reducers.alerta.esconder());
      }, 3000);
    }
  });

  return (
    <div className={className()} onClick={esconder}>
      {alerta.mensagem}
    </div>
  );
}

export default Alerta;
