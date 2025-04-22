import React, { useState } from "react";
import { useNetwork } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";


const InvalidNetwork = () => {

  const [, switchNetwork] = useNetwork();
  const [isLoading, setIsLoading] = useState(false);

  var load = (<><i className="fas fa-spinner fa-spin"></i><b> Switching...</b></>);

  return (
    <div className="wrapper">
      <div className="sign-in-page">
        <div className="signin-popup">
          <div className="signin-pop">
            <div className="row">
              <div className="col-lg-6">
                <div className="cmp-info">
                  <div className="cm-logo">
                    <img src="/assets/images/ImREAL.png" alt="" />
                    <p>This DAO only works on the Polygon network, please click the button to add and switch to the required network.</p>
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
                      try {
                        switchNetwork(ChainId.Polygon).finally(() => {
                          setIsLoading(false);
                          window.location.reload(true);
                        });

                      } catch (error) {
                        console.error("Fail to switch network", error);
                        process.exit(1);
                      }
                    }}>
                      <div className="row">
                      </div>
                      <div className="login-resources">
                        <h3>Click the button to add and switch to the required network</h3>
                        <ul>
                          <li>
                            <button disabled={isLoading} className="fb" type="submit" value="post">
                              {isLoading ? load : "Add and switch network"}
                            </button>
                          </li>
                        </ul>
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
