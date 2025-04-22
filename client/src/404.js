import { useNavigate } from 'react-router-dom';
const Notfound = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <div></div>
            <h1>404</h1>
          </div>
          <h2>Page not found</h2>
          <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
          <button className='gio_link' onClick={handleClick} type="button">Home Page</button>
        </div>
      </div>
    </>
  );

};

export default Notfound;
