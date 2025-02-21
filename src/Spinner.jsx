import Logo from './assets/logo.png'
import "./styles/spinner.css";

function Spinner() {
  return (
    <>
      <div className="container">
      <img className='animal' alt='Animal Home' src={Logo}/>
      <h1>Animal Home</h1>
      </div>
    </>
  );
}

export default Spinner;
