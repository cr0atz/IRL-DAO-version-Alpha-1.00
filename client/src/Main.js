import Header from "./Header";

const Main = () => {

  return (
    <>
      <Header />
      <section className="banner">
        <div className="bannerimage">
          <img src="/assets/images/about.png" alt="image" />
        </div>
        <div className="bennertext">
        </div>
      </section>
      <section className="Company-overview">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h2>
                ImREAL.life
              </h2>
              <p className="text-lg">
                ImREAL.life is a Portal to the Metaverse where Real Life meets Virtual Reality.
                This is where the Metaverse, NFT's and Crypto interface with Real Life and Real People.
                Social Media without algorithms tracking you
                No Manipulation of Public Opinion
                THIS IS WHERE REAL LIFE INTERACTS WITH THE VIRTUAL WORLD
                <br></br>
                <br></br>
                CLAIM YOUR PLACE IN THE WORLD NOW
                IT IS FREE TO JOIN SO CLICK HERE TO JOIN NOW
                ALL DAO MEMBERS GET<br></br>

                <br></br>1. EMAIL ADDRESS EG : member@imreal.life

                <br></br>2. DOMAIN EG : https://member.imreal.life

                <br></br>3. ACCESS TO THE ImREAL.life NETWORK & METAVERSE GATEWAY
              </p>
            </div>
            <div className="col-md-6 col-sm-12">
              <img style={{ width: '499px', height: "100%" }} src="/assets/images/ImREAL_big.png" alt="image" />
            </div>
          </div>
        </div>
      </section>
      <section className="services">
        <div className="container">
          <div className="video gio_padding">
            <iframe className="video-iframe" src="https://www.youtube.com/embed/K4TOrB7at0Y" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="blog">
                <img src="/assets/images/RealLife.png" alt="image" />
                <h2></h2>
                <a href="https://imreal.life/">imreal.life</a>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="blog">
                <img src="/assets/images/market_place.png" alt="image" />
                <h2></h2>
                <a href="https://market.imreal.life/">Marketplace</a>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="blog">
                <img src="/assets/images/openSea.png" alt="image" />
                <h2></h2>
                <a>Open Sea</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="footy-sec mn no-margin">
          <div className="container">
            <ul>
              <li>
                <a title="Supports">
                  <img width={16} height={16} src="/assets/images/polygon-matic.png" alt="" />
                  <img width={16} height={16} src="/assets/images/telegram.png" alt="" />
                  <img width={16} height={16} src="/assets/images/thirdweb.png" alt="" />
                  <img width={16} height={16} src="/assets/images/reactJS.png" alt="" />
                </a>
              </li>
              <li><a href="">Terms</a></li>
              <li><a href="">Privacy</a></li>
              <li><a href="">Contract</a></li>
            </ul>
            <p><img src="assets/images/copy-icon2.png" alt="" />Copyright 2022</p>
            <img className="fl-rgt" style={{ width: '100px', height: "100%" }} src="/assets/images/ImREAL.png" alt="" />
          </div>
        </div>
      </footer>
    </>
  );
};
export default Main;