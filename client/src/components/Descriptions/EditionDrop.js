export const EditionDropGuide = () => {
  return (
    <>
      <div className="sign_in_sec current" id="tab-1">
        <h3>EditionDrop Creation</h3>
      </div>

      <p style={{ fontSize: '18px', fontFamily: "Trebuchet MS" }}>
        The "Edition Drop" is a collection where we put our NFT entrance
        and can be claimed by the members if they are invited to your DAO.
      </p>
      
      <div className="timelines">
        <div className="timeline education">
          <div className="timeline-items">
            <div className="timeline-item">
              <h3>EditionDrop Name</h3>
              <div className="description">
                The NFT collections name.
              </div>
            </div>
            <div className="timeline-item">
              <h3>EditionDrop Description</h3>
              <div className="description">
                The description of your collections.
              </div>
            </div>
            <div className="timeline-item">
              <h3>EditionDrop Logo</h3>
              <div className="description">
                The display logo of your NFT collections and it is recommended.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditionDropGuide;