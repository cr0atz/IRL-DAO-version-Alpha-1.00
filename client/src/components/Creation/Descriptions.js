import EditionDropGuide from "../Descriptions/EditionDrop";
import NFTCreateGuide from "../Descriptions/NFTCreate";
import DeployTokenGuide from "../Descriptions/DeployToken";
import DeployVoteGuide from "../Descriptions/DeployVote";
import CreateDAOGuide from "../Descriptions/CreateDAO";
import NotConnected from "../Descriptions/NotConnected";
import NotAllowed from "../Descriptions/NotAllowed";

const Descreptions = ({
  dao_status,
  address,
  adminAccount,
}) => {
  return (
    <div className="cm-logo">
      <img src="/assets/images/ImREAL.png" alt="ImREAL" />
      {(() => {
        const resStatus = dao_status.map(i => i.status).toString();
        if (!address) {
          return (<NotConnected />);
        } else if (!adminAccount?.creates) {
          return (<NotAllowed />);
        } else if (resStatus === '0') {
          return (<NFTCreateGuide />);
        } else if (resStatus === '1') {
          return (<DeployTokenGuide />);
        } else if (resStatus === '2') {
          return (<DeployVoteGuide />);
        } else if (resStatus === '3') {
          return (<CreateDAOGuide />);
        } else {
          return (<EditionDropGuide />);
        }
      })()}
    </div>
  );
};
export default Descreptions;