const Access = ({
  address,
  isAdmin,
  shortenAddress,
}) => {
  return (
    <div className="signup-tab">
      <i className="fa fa-long-arrow-left"></i>
      {(() => {
        if (address && isAdmin) {
          return (
            <>
              <h2>{shortenAddress(address)}</h2>
              <div className="col-lg-12 no-pdd">
                Connected
              </div>
            </>
          );
        } else if (address && !isAdmin) {
          return (
            <>
              <h2>{shortenAddress(address)}</h2>
              <div className="col-lg-12 no-pdd">
                Access Denied
              </div>
            </>
          );
        } else {
          return (
            <>
              <h2>Not Connected</h2>
              <div className="col-lg-12 no-pdd">
                Please Connect your wallet first
              </div>
            </>
          );
        }
      })()}
    </div>
  );
};
export default Access;