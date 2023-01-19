import "./Login.css";
import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

function Login() {
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value: any) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <div className="login-container">
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Cadastro
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <MDBInput wrapperClass="mb-4" label="Nome" id="form1" type="text" />
            <MDBInput
              wrapperClass="mb-4"
              label="Senha"
              id="form2"
              type="password"
            />

            <MDBBtn className="mb-4 w-100">Entrar</MDBBtn>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <MDBInput wrapperClass="mb-4" label="Nome" id="form1" type="text" />
            <MDBInput
              wrapperClass="mb-4"
              label="Senha"
              id="form1"
              type="password"
            />

            <MDBBtn className="mb-4 w-100">Cadastrar</MDBBtn>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </div>
  );
}

export default Login;
