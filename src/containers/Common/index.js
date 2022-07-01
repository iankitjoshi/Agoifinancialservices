import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  IconButton,
  Hidden,
  CircularProgress
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { logOut, getObject } from "../../utils";
import CustomDialogBox from "../../components/common/CustomDialogBox";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import colors from '../../assets/scss/_colors.scss';
import dashboardIcon from '../../assets/images/dashboardIcon.svg'
import userIcon from '../../assets/images/userIcon.svg'
import toggleIcon from '../../assets/images/white-toggle.svg'
import LogoutIcon from '../../assets/images/logoutIcon.svg'
import WhiteToogleIcon from '../../assets/images/white-toggle.svg'
import settingIcon from '../../assets/images/settingIcon.svg'
import categoryIcon from '../../assets/images/categoryIcon.svg'


const menuItems = [
  {
    label: "Shares",
    path: '/shares',
    icon: dashboardIcon
  },
  {
    label: "Users",
    path: '/user',
    icon: userIcon
  },
  {
    label: "KYC",
    path: '/kyc',
    icon: userIcon
  },
  {
    label: "Order",
    path: '/order',
    icon: categoryIcon
  },
  {
    label: "Notify User",
    path: '/notify-user',
    icon: categoryIcon
  },
  {
    label: "Cashout",
    path: '/cashout',
    icon: categoryIcon
  },
  {
    label: "Settings",
    path: '/settings',
    icon: settingIcon
  },
  {
    label: "Logout",
    icon: LogoutIcon,
    path: '',
    type: 'LOGOUT_ACTION'
  }
]

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: 100,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: '300ms',
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: '300ms',
    }),
  },
  menuButton: {
    marginRight: 30,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  customDrawer: {
    zIndex: 100,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: '300ms',
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: '300ms',
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  logoleft: {
    height: '70px'
  },
  toolbarCustom: {
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    flexGrow: 1,
    background: colors.bgLight,
    padding: theme.spacing(3),
    paddingTop: 0
  },

}));


function Main(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [opens, setOpens] = useState(false);
  const [toggleValue, toggleSet] = useState(true);
  const [logoutMenu, setLogoutMenu] = useState(false);
  const history = useHistory();
  const [loader, setLoader] = useState(false)

  function toggle() {
    setOpen(!open);
    toggleSet(!toggleValue)
  }


  const handleClickLogoutModal = () => {
    setOpens(true);
  };

  const handleClose = () => {
    setOpens(false);
  };

  const logoutModal = () => {
    setOpens(true)
  }

  const handleLogout = () => {
    logOut("top-challenge-token")
    logOut("top-challange-admin")
    history.push('/login')
  }

  const openLogout = () => {
    setLogoutMenu(!logoutMenu);
  }

  const dynamicDrawer = () => {
    if (!toggleValue)
      setOpen(!open)
  }

  const onSetLoader = (action) => {
    if (action) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    setLoader(action)
  }

  const reRoute = (menuItem) => {
    if (menuItem?.type && menuItem.type === 'LOGOUT_ACTION') {
      logoutModal()
      return
    }
    history.push(menuItem.path)
  }

  return (
    <div className={classes.root}>
      {loader ? <div className="main-advanced-loader" ><CircularProgress size={45} /></div> : null}
      <Hidden xsDown smDown>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, 'custom-menu', classes.customDrawer, 'custom-menu', {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={clsx(classes.toolbar, classes.toolbarCustom, classes.logoleft, "cus-head-logo")} >
            <IconButton className="mobile logo" onClick={toggle}>
              <img className="toggle-btn" src={toggleIcon} alt="" />
            </IconButton>
          </div>

          <List
            className="sidebar-menus"
            onMouseEnter={dynamicDrawer}
            onMouseLeave={dynamicDrawer}
          >
            {[...menuItems].map((item, index) => {
              const { pathname } = history && history.location || {};
              const pathArray = pathname.split('/')
              let isActive = false;

              if (pathArray[1] === item?.path?.replace('/', '').split('?')[0]) {
                isActive = true
              }

              return (
                <ListItem
                  key={index}
                  button
                  className={clsx('sidepanel-item', { 'active': isActive })}
                  onClick={() => reRoute(item)}
                  disabled={item.disabled}
                >
                  <ListItemIcon className="sidebar-menu-icon">
                    <img src={item.icon} />
                  </ListItemIcon>
                  <ListItemText className="sidebar-menu-text">
                    <h6>
                      {item.label}
                    </h6>
                  </ListItemText>
                </ListItem>
              )
            })
            }
          </List>
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <MobileResponsiveHeader
          props={props}
          logOut={logOut}
          history={history}
          openLogout={openLogout}
          handleClickLogoutModal={handleClickLogoutModal}
          logoutMenu={logoutMenu}
          reRoute={reRoute}
        />
      </Hidden>
      <main className={classes.content}>
        {!props.internetOption ?
          <React.Fragment>
            {React.cloneElement(props.children, { setLoader: onSetLoader })}
          </React.Fragment>
          :
          <div className="no-internet-connection">
            <img className="mt-4" src='/images/1.jpg' alt="" />
            <p>OOPS! No Internet</p>
            <h4>Please check your internet connection.</h4>
          </div>
        }
      </main>

      <CustomDialogBox
        handleClose={handleClose}
        confirmAction={handleLogout}
        open={opens}
        title="Confirmation"
        dialogtext='Are you sure you want to logout?'
        text="Keep Logged In"
        isLogout={true}
      />
    </div >
  );
}


const mapStateToProp = state => {
  return {
    internetOption: state.dashboard && state.dashboard.internetOption
  }
}

export default connect(mapStateToProp)(Main);


function MobileResponsiveHeader(props) {
  const { history, handleClickLogoutModal, reRoute } = props

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        easing: theme.transitions.easing,
        duration: '300ms'
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "block"
      }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    toolbar: {
      ...theme.mixins.toolbar,
    },
    logoleft: {
      height: 'auto'
    },
    toolbarCustom: {
      display: 'flex',
      alignItems: 'center'
    },
  }));

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const wrapperFunction = (item) => {
    reRoute(item)
    handleDrawerToggle()
  }

  const drawer = (
    <React.Fragment>
      <List className="sidebar-menus">
        {[...menuItems].map((item, index) => {
          const { pathname } = history && history.location || {};
          const pathArray = pathname.split('/')
          let isActive = false;

          if (pathArray[1] === item?.path?.replace('/', '').split('?')[0]) {
            isActive = true
          }

          return (
            <ListItem
              key={index}
              button
              key={item.label}
              className={clsx('sidepanel-item', { 'active': isActive })}
              disabled={item.disabled}
              onClick={() => wrapperFunction(item)}
            >
              <ListItemIcon className="sidebar-menu-small-icon" >
                <img src={item.icon} />
              </ListItemIcon>
              <ListItemText >
                <h6>{item.label}</h6>
              </ListItemText>
            </ListItem>
          )
        })
        }
      </List>
    </React.Fragment>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const object = getObject("top-challenge-token");
  const { email = '' } = object && JSON.parse(object) || '';

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className="d-flex">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <img src='/images/Path 403.svg' />
            </IconButton>
          </div>
          <Typography variant="h6" noWrap>
          </Typography>
          <div className="user-name-email" >
            <div className="setting-option" >
              <div className="user-profile-text">
                <div className="option-dropdown">
                  {/* <UserInfo /> */}
                </div>
                <img src={LogoutIcon} onClick={handleClickLogoutModal} className="logout-icon" alt="" />
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            className={clsx(classes.drawerPaper, 'custom-menu', {
              paper: classes.drawerPaper
            })}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <div className={clsx(classes.toolbar, classes.toolbarCustom, classes.logoleft, "cus-head-logo")} >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <img src={WhiteToogleIcon} style={{ height: '25px', width: '25px' }} />
              </IconButton>
            </div>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
}