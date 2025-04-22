import { useEffect, useState } from "react";

const adminMenu = [
  {
    name: "Admin",
    img: "fas fa-tools",
    href: "#"
  },
  {
    name: "REALs",
    img: "fas fa-users-cog",
    href: "/reals"
  }
];

const normalMenu = [
  {
    name: "Docs",
    img: "fas fa-file-alt",
    href: "#"
  },
  {
    name: "Notif",
    img: "fas fa-bell",
    href: "#"
  },
  {
    name: "DAOs",
    img: "fas fa-users",
    href: "/dashboard"
  }
];

const subMenu = [
  {
    kind: "Admin",
    category: "Admin Panel",
    href: "/adminpanel"
  },
  {
    kind: "Admin",
    category: "Create DAO",
    href: "/create"
  },
  {
    kind: "Docs",
    category: "About DAO",
    href: "#"
  },
  {
    kind: "Docs",
    category: "About ImREAL",
    href: "#"
  }
];

const Menu = ({
  isAdmin,
  adminAccount,
  address,
  notifications,
  moment,
  handleNotif,
  handleNotifClear
}) => {

  const admin = adminMenu.map(menuData => {
    const _subMenus = subMenu.filter(({ kind }) => kind === menuData.name);
    return {
      menuData,
      _subMenus
    };
  });

  const normal = normalMenu.map(menuData => {
    const _subMenus = subMenu.filter(({ kind }) => kind === menuData.name);
    return {
      menuData,
      _subMenus
    };
  });

  useEffect(() => {
    //console.log("Admin ", admin);
    //console.log("Normal ", normal);
  }, []);
  return (
    <ul className="nav-ul">
      {isAdmin && (
        <>
          {admin.map((adminMenu, idx) => (
            <b key={idx}>
              {!adminAccount?.DAOs ? (
                <>
                  {adminMenu.menuData.name !== "REALs" && (
                    <li>
                      <a href={adminMenu.menuData.href} className="hand_pointer">
                        <span>
                          <i className={adminMenu.menuData.img}></i>
                        </span>
                        {adminMenu.menuData.name}
                      </a>
                      {adminMenu._subMenus.length !== 0 && (
                        <ul className="head-hover">
                          {adminAccount?.creates ? (
                            <>
                              {adminMenu._subMenus.reverse().map((subMenu, idx) => (
                                <li key={idx}><a href={subMenu.href}>{subMenu.category}</a></li>
                              ))}
                            </>
                          ) : (<li><a href={admin[0]?._subMenus[0].href}>{admin[0]?._subMenus[0].category}</a></li>)}
                        </ul>
                      )}
                    </li>
                  )}
                </>
              ) : (
                <li>
                  <a href={adminMenu.menuData.href} className="hand_pointer">
                    <span>
                      <i className={adminMenu.menuData.img}></i>
                    </span>
                    {adminMenu.menuData.name}
                  </a>
                  {adminMenu._subMenus.length !== 0 && (
                    <ul className="head-hover">
                      {adminAccount?.creates ? (
                        <>
                          {adminMenu._subMenus.reverse().map((subMenu, idx) => (
                            <li key={idx}><a href={subMenu.href}>{subMenu.category}</a></li>
                          ))}
                        </>
                      ) : (<li><a href={admin[0]?._subMenus[0].href}>{admin[0]?._subMenus[0].category}</a></li>)}
                    </ul>
                  )}
                </li>
              )}
            </b>
          ))}
        </>
      )}
      {address && (
        <>
          {normal?.reverse().map((menu, idx) => (
            <b key={idx}>
              {menu.menuData.name !== "Notif" && (
                <li>
                  <a href={menu.menuData.href}>
                    <span>
                      <i className={menu.menuData.img}></i>
                    </span>
                    {notifications?.length !== 0 && menu.menuData.name === "Notif" && (
                      <div className="counter">{notifications?.length}</div>
                    )}
                    {menu.menuData.name}
                  </a>
                  {menu._subMenus.length !== 0 && (
                    <ul className="head-hover">
                      {menu._subMenus.map((subMenu, idx) => (
                        <li key={idx}><a href={subMenu.href}>{subMenu.category}</a></li>
                      ))}
                    </ul>
                  )}
                </li>
              )}
            </b>
          ))}
        </>
      )}
      <b>
        <li>
          {address ? (
            <a className="gio_link not-box-open">
              <span>
                <i className={normal[1]?.menuData.img}></i>
              </span>
              {notifications?.length !== 0 && (
                <div className="counter">{notifications?.length}</div>
              )}
              {normal[1]?.menuData.name}
            </a>
          ) : (
            <a className="hand_pointer not-box-open" title="">
              <span>
                <i className={normal[0]?.menuData.img}></i>
              </span>
              {normal[0]?.menuData.name}
            </a>
          )}
          {address ? (
            <div className="notification-box noti" id="notification">
              <div className="nt-title">
                <h4>Notifications</h4>
                <a className="hand_pointer" onClick={handleNotifClear} title="">Clear all</a>
              </div>
              <div className="nott-list">
                {notifications.map((data, idx) => {
                  return (
                    <div key={idx} onClick={() => { window.location.href = data.notif_link; handleNotif(data.id); }} className="notfication-details">
                      <div className="noty-user-img">
                        <img src={`/uploads/${data.notif_img}`} alt="" />
                      </div>
                      <div className="notification-info">
                        <h3>
                          <a title="">{data.notif_name}</a>
                          <b className="time">{moment.utc(data.notif_created).local().startOf('seconds').fromNow()}</b>
                        </h3>
                        <b className="notif-msg ">{data.notif_short_message}</b>
                      </div>
                    </div>
                  );
                })}
                <div className="view-all-nots">
                  <a href="/account?tab=notifications" title="">View All Notification</a>
                </div>
              </div>
            </div>
          ) : (
            <ul>
              {normal[0]?._subMenus.map((subMenu, idx) => (
                <li key={idx}><a href={subMenu.href}>{subMenu.category}</a></li>
              ))}
            </ul>
          )}
        </li>
      </b>
    </ul>
  );
};
export default Menu;;