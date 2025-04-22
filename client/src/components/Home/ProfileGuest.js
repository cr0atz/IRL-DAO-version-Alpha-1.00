const ProfileGuest = () => {
  return (
    <div className="user-data full-width">
      <div className="user-profile">
        <div className="username-dt">
          <div className="usr-pic">
            <img src="/assets/images/guest.png" alt="" />
          </div>
        </div>
        <div className="user-specs">
          <h3>Guest</h3>
          <span>Welcome Guest</span>
        </div>
      </div>
      <ul className="user-fw-status"></ul>
    </div>
  );
};

export default ProfileGuest;