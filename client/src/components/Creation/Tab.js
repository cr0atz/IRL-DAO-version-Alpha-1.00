import { EditionDrop } from "../EditionDrop";
import { NFTCreate } from "../NFTCreate";
import { DeployToken } from "../DeployToken";
import { DeployVote } from "../DeployVote";
import { CreateDAO } from "../CreateDAO";
import LoadEffect from "../../LoadEffect";

const Tab = ({
  dao_status,
  address,
  adminAccount,
  isLoading,
}) => {
  return (
    <div className="dff-tab current" id="tab-3">
      {(() => {
        const resStatus = dao_status.map(i => i.status).toString();
        if (!address) {
          return (
            <div className="cm-logo">
              <p>Connect your Metamask wallet first before you can proceed.</p>
            </div>
          );
        } else if (!adminAccount?.creates) {
          return (
            <div className="cm-logo">
              <p>Access to this page is forbidden.</p>
            </div>
          );
        } else if (isLoading) {
          return (
            <form>
              <div className="row">
                <div className="col-lg-12 no-pdd">
                  <div className="sn-field">
                    <LoadEffect />
                  </div>
                </div>
              </div>
            </form>
          );
        } else if (resStatus === '0') {
          return (<NFTCreate />);
        } else if (resStatus === '1') {
          return (<DeployToken />);
        } else if (resStatus === '2') {
          return (<DeployVote />);
        } else if (resStatus === '3') {
          return (<CreateDAO />);
        } else {
          return (<EditionDrop />);
        }
      })()}
    </div>
  );
};
export default Tab;