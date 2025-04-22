const AddMember = ({
  inviteeStatus,
  emptyInputErr,
  addMember,
  alertInviteeType,
  alertInviteeKind,
  alertInviteeMSG,
  inviteeAddress,
  handleInviteeAddress,
  isAdding
}) => {
  return (
    <div className="modal" id="modal2" data-animation="slideInOutLeft">
      <div style={{ maxWidth: 500 }} className="modal-dialog">
        <header className="modal-header">
          Add New Member
          <button className="close-modal" aria-label="close modal" data-close>
            ✕
          </button>
        </header>
        <section className="modal-content">
          <p style={{ display: "flex", justifyContent: "center", alignItems: "center", color: inviteeStatus === 1 ? "red" : "green" }} id="gio_display_error">{emptyInputErr}</p>
          <div className="">
            <div className="post-project-fields">
              <form onSubmit={addMember}>
                <div className={`alert ${alertInviteeType}`}>
                  <strong>{alertInviteeKind ? alertInviteeKind : "Note!"}</strong> {alertInviteeMSG ? alertInviteeMSG : "When adding a new member. make sure that the wallet address is valid."}
                </div>
                <div className="">
                  <div className="col-lg-12">
                    <input id="invitee" value={inviteeAddress} onChange={handleInviteeAddress} type="text" placeholder="Invitee Wallet Address" />
                  </div>
                  <div className="col-lg-12">
                    <ul>
                      <li>
                        <button disabled={isAdding} className="active" type="submit" value="post">
                          {isAdding ? (<><i className="fas fa-sync fa-spin"></i><b> Inviting...</b></>) : (<><i className="fas fa-sync"></i><b> Invite</b></>)}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        <footer className="modal-footer">
        </footer>
      </div>
    </div>
  );
};
export default AddMember;