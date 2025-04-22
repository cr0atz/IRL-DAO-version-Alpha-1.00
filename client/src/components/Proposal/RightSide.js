import { Tooltip } from "@mui/material";
import LoadEffect from "../../LoadEffect";

const RightSide = ({
  StickyBox,
  voteLoading,
  VotesDetails,
  viewCount,
  commentsLoading,
  filteredData,
  commentList,
  moment,
  shortenAddress,
  ConvertBignumber,
}) => {
  return (
    <div className="col-lg-4">
      <StickyBox offsetTop={20} offsetBottom={20}>
        {voteLoading ? (
          <div className="widget widget-feat">
            <LoadEffect />
          </div>
        ) : (
          <div className="widget widget-feat">
            <ul>
              <Tooltip placement="top" title='Total count for who voted "for"' arrow>
                <li>
                  <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                  <span>{Number(ConvertBignumber(VotesDetails[1]?.count._hex.toString())).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </li>
              </Tooltip>
              <Tooltip placement="top" title='Total count for who voted "against"' arrow>
                <li>
                  <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                  <span>{Number(ConvertBignumber(VotesDetails[0]?.count._hex.toString())).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </li>
              </Tooltip>
              <Tooltip placement="top" title='Total count for who voted "abstain"' arrow>
                <li>
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                  <span>{Number(ConvertBignumber(VotesDetails[2]?.count._hex.toString())).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </li>
              </Tooltip>
              <Tooltip placement="top" title='Viewer count' arrow>
                <li>
                  <i className="fa fa-eye"></i>
                  <span>{Number(viewCount[0]?.view_count).toLocaleString()}</span>
                </li>
              </Tooltip>
            </ul>
            <ul>
            </ul>
          </div>
        )}
        {commentsLoading ? (
          <div className="widget widget-user">
            <ul>
              <LoadEffect />
            </ul>
          </div>
        ) : filteredData.length === 0 ? (<></>) : (
          <div className="widget widget-user">
            <h3 className="title-wd">Active Members <span className="gio_member_count">{filteredData.length}</span></h3>
            <ul>
              {filteredData.map((members, idx) => {
                const proposedCount = commentList?.filter(card => card.comments.user_wallet_address.includes(members.comenters?.wallet));
                return (
                  <li key={idx}>
                    <div className="usr-msg-details">
                      <div className="usr-ms-img">
                        <img style={{ backgroundColor: 'gainsboro' }} width={35} height={35} src={members.profile?.avatar ? members.profile?.avatar : "/uploads/unknown.PNG"} alt="" />
                      </div>
                      <div className="usr-mg-info">
                        <h3>{members.profile?.name ? members.profile?.name : shortenAddress(members.comenters?.wallet)}</h3>
                        <p>{moment(members.comenters?.datetime).format('MMMM D, yyyy h:mm a')}</p>
                      </div>
                    </div>
                    <span><i className="fa fa-comment" aria-hidden="true"></i> {Number(proposedCount.length).toLocaleString()}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </StickyBox>
    </div>
  );
};
export default RightSide;