const AddAvatar = ({
  alertType,
  alertKind,
  alertMSG,
  avatarcontractAddress,
  fetchingNFT,
  ownedNFTs,
  handleAdd,
  addAvatar,
  handleAvatars,
}) => {
  return (
    <div className="modal" id="modal4" data-animation="slideInOutLeft">
      <div style={{ maxWidth: 600 }} className="modal-dialog">
        <header className="modal-header">
          Add NFT Avatar
          <button className="close-modal" aria-label="close modal" data-close>
            ✕
          </button>
        </header>
        <section className="modal-content">
          <div className="post-project-fields">
            <form onSubmit={addAvatar}>
              {/*<div className={`alert`}>
                    <strong>"Note!" </strong>"when adding a new avatar be sure that you own the NFT. Only provide contract address."
                  </div>*/}
              <div className={`alert ${alertType}`}>
                {/*<span onClick={handleCloseAlert} className="closebtn">&times;</span>*/}
                <strong>{alertKind ? alertKind : "Note!"}</strong> {alertMSG ? alertMSG : "when adding a new avatar be sure that you own the NFT. Only provide contract address."}
              </div>
              <span><input value={avatarcontractAddress} onChange={handleAvatars} type="text" placeholder="NFT Contract Address Here" /></span>
              <div className="filter-ttl"></div>
              <div className="col-lg-12">
                <ul>
                  <li>
                    <button className="active" type="submit" disabled={fetchingNFT}>
                      <i className={fetchingNFT ? "fas fa-sync fa-spin" : "fas fa-sync"}></i><b> {fetchingNFT ? "Fetching NFTs" : "Fetch NFTs"}</b>
                    </button>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div className="pf-gallery">
            <ul>
              {ownedNFTs?.map((NFTData, idx) => {
                return (
                  <li key={idx}>
                    <a onClick={(() => handleAdd(
                      NFTData.metadata.image,
                      NFTData.metadata.id,
                      NFTData.metadata.name,
                      NFTData.metadata.uri,
                      NFTData.metadata.description
                    ))}><img width={70} height={250} style={{ backgroundColor: 'gainsboro' }} src={NFTData.metadata.image} className="hand_pointer" alt="" /></a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <footer className="modal-footer">
        </footer>
      </div>
    </div >
  );
};
export default AddAvatar;