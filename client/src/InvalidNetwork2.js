import { useDisconnect } from "@thirdweb-dev/react";
import React, { useState } from "react";

const InvalidNetwork = () => {

  const disconnectWallet = useDisconnect();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="wrapper">
      <div className="sign-in-page">
        <div className="signin-popup">
          <div className="signin-pop">
            <div className="row">
              <div className="col-lg-6">
                <div className="cmp-info">
                  <div className="cm-logo">
                    <img src="/assets/images/ImREAL.png" alt="ImREAL" />
                    <p>This DAO only works on the Polygon network, and it seems you are using a wallet connect option. please switch to the required network first.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="login-sec">
                  <div className="sign_in_sec current" id="tab-1">
                    <form id="my_form" onSubmit={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsLoading(true);
                      disconnectWallet().finally(() => { window.location.href = "/"; });

                    }}>
                      <div className="row">
                      </div>
                      <div className="login-resources">
                        <h3>You are using a wallet connect option. to proceed please switch to the required network first</h3>
                        {<ul>
                          <li>
                            <button disabled={isLoading} className="fb" type="submit" value="post">
                              {isLoading ? (<><i className="fas fa-spinner fa-spin"></i><b> Loading...</b></>) : "Log out"}
                            </button>
                          </li>
                        </ul>}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default InvalidNetwork;
