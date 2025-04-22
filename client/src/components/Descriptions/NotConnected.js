export const NotConnected = () => {
  return (
    <>
      <div className="sign_in_sec current" id="tab-1">
        <h3>Not Connected</h3>
      </div>

      <p style={{ fontSize: '18px', fontFamily: "Trebuchet MS" }}>
        A connected Metamask wallet is needed to proceed with creating a DAO. please connect your wallet first
      </p>
    </>
  );
};
export default NotConnected;