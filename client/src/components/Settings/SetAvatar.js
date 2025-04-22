const SetAvatar = ({
  resultType,
  resultKind,
  resultMsg,
  avatarImg,
  avatarWallet,
  avatarVote,
  isSettingAvatar,
  setAvatar,
}) => {
  return (
    <div className="modal" id="modal3" data-animation="slideInOutLeft">
      <div style={{ maxWidth: 400 }} className="modal-dialog">
        <header className="modal-header">
          Set Avatar
          {/*<p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: resultType === "error" ? 'red' : resultType === 'success' ? 'green' : 'black' }} id="gio_display_error">{resultMsg}</p>*/}
          <button className="close-modal" aria-label="close modal" data-close>
            ✕
          </button>
        </header>
        <section className="modal-content">
          <div className={`alert ${resultType}`}>
            {/*<span onClick={handleCloseAlert} className="closebtn">&times;</span>*/}
            <strong>{resultKind ? resultKind : "Note!"}</strong> {resultMsg ? resultMsg : "you can only change your avatar and name once a day only."}
          </div>

          <form>
            <div className="widget widget-adver">
              <img src={avatarImg} alt="" />
            </div>
          </form>

        </section>
        <footer className="modal-footer">
          <div className="accept-feat">
            <div className="gio_btn_name">
              <button onClick={(() => { setAvatar(avatarImg, avatarWallet, avatarVote); })} type="submit" className="accept-req hand_pointer" disabled={isSettingAvatar}>
                <i className={isSettingAvatar ? "fas fa-sync fa-spin" : "fas fa-sync"}></i> {isSettingAvatar ? "Saving..." : "Set As Avatar"}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default SetAvatar;