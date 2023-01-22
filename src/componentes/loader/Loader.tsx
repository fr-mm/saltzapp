import "./Loader.css";

interface LoaderProps {
  semMascara?: boolean;
}

function Loader(props: LoaderProps): JSX.Element {
  if (props.semMascara === true) {
    return <LoaderReal />;
  } else {
    return (
      <div className="mascara">
        <LoaderReal />
      </div>
    );
  }
}

function LoaderReal(): JSX.Element {
  return (
    <div className="loader-container">
      <span className="loader"></span>
    </div>
  );
}

export default Loader;
