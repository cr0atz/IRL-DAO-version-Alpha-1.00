import { Tooltip } from "@mui/material";

const Members = ({
  membersData,
  Ranking,
  checkRank,
  daoDATA,
  copyMembersAddress,
  shortenAddress,
  _copymembersAddress,
  totalSuply,
  isHolder,
  balance,
  dataCreation
}) => {
  return (
    <>
      {/*<div className="widget suggestions full-width">
      <div className="sd-title">
      <h3>Members</h3>
      <b>{membersData?.length}</b>
      </div>*/}
      <div className="suggestions-list">
        {membersData?.map((members, idx) => {
          const imgsrc = "/assets/images/" + Ranking[checkRank(daoDATA[0]?.wallet, members.address)];
          return (
            <div key={idx} className="suggestion-usd">
              <img style={{ backgroundColor: 'gainsboro', width: '35px', height: '35px' }} src={members.profile?.avatar ? members?.profile.avatar : "/uploads/unknown.PNG"} alt="" />
              <div className="sgt-text">
                <Tooltip placement="top" title="Copy members address" arrow>
                  <h4 onClick={() => { copyMembersAddress(members.address, idx); }} className="gio_link">
                    {members.profile?.name ? members.profile?.name : shortenAddress(members.address)} <i className={_copymembersAddress.has(idx) ? "fas fa-check-circle" : "fas fa-clone"}></i>
                  </h4>
                </Tooltip>
                <span>🟡{" " + Number(members.tokenAmount).toLocaleString(undefined, { maximumFractionDigits: 2 })} <a style={{ fontSize: '10px' }}>{totalSuply?.symbol}</a></span>
              </div>
              <span><img src={imgsrc} alt="" /></span>
            </div>
          );
        })}
        {isHolder && (balance?.displayValue) >= parseInt(dataCreation[0]?.token_threshhold) && (
          <>
            <div className="view-more">
              <div className="filter-dd paddy">
                <div className="filter-ttl">
                </div>
                <form onSubmit={async (e) => { e.preventDefault(); }}>
                  <button data-open="modal2" className="left_button" type="submit">Add New Member</button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
      {/*</div>*/}
    </>
  );
};
export default Members;