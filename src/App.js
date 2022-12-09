import './App.css';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Tweeter } from "./Tweeter";
import { Instagram } from "./Instagram";
import { useState, useEffect } from "react";
import ColorQuote from "./ColorQuote";
import { SubSuper } from 'superorsub';
import InstaBootstrap from './InstaBootstrap.js';
import TweetBootstrap from './TweetBootstrap.js';
//import { AppProvider } from "@shopify/polaris";
//import en from "@shopify/polaris/locales/en.json";
//import "@shopify/polaris/build/esm/styles.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

function App() {
   
    const { pathname } = useLocation();
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
    useEffect(() => {
       
    }, [pathname]);
  return (
      <div className="App">
          {/*<Sidebar defaultCollapsed={true} width="200px" >*/}
          {/*    <Menu>*/}
          {/*        <SubMenu label="Social Media Tools" >*/}
          {/*            <MenuItem active={pathname === "/twitter" ?true:false} routerLink={<Link to="/twitter" /> } id="twitter"> Twitter </MenuItem>*/}
          {/*            <MenuItem active={pathname === "/instagram" ? true : false} routerLink={<Link to="/instagram" />}> Instagram </MenuItem>*/}
          {/*            <MenuItem routerLink={<Link to="/colorquote" />}> Color Quote </MenuItem>*/}
                      
          {/*        </SubMenu>*/}
          {/*        <MenuItem> Documentation </MenuItem>*/}
          {/*        <MenuItem> Calendar </MenuItem>*/}
          {/*        <MenuItem> <i className={collapsed ? "fa fa-arrow-right":"fa fa-arrow-left"} aria-hidden="true" style={{ fontSize: 14 }} onClick={() => collapseSidebar()} /> </MenuItem>*/}
          {/*    </Menu>*/}
          {/*    </Sidebar>*/}
          {/*<nav className="navbar navbar-expand-md">*/}
          {/*    <div className="container">*/}
          {/*        <span className="fw-bold text-secondary">Tools</span>*/}
          {/*        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#tool-nav" aria-controls="tool-nav" aria-expanded="false" aria-label="Toggler-navigation">*/}
          {/*            <span className="navbar-toggler-icon"></span>*/}
          {/*        </button>*/}
          {/*        <div id="tool-nav" className="collapse navbar-collapse justify-content-end align-center">*/}
          {/*            <ul className="navbar-nav">*/}
          {/*                <li className="nav-item mx-2"><Link className="nav-link"  to="/twitter" >Twitter</Link></li>*/}
          {/*                <li className="nav-item mx-2"><Link className="nav-link"  to="/instagram" >Instagram</Link></li>*/}
          {/*                </ul>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</nav>*/}
          
          <nav className="navbar navbar-dark bg-dark">
              <div className="container-fluid">
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                 
              </div>
          </nav>
          
          <div className="collapse" id="navbarToggleExternalContent">
              <div class="bg-dark p-4">
              <ul className="navbar-nav">
                      <li className="nav-item mx-2 text-white"><Link className="nav-link" to="/twitter" >Twitter</Link></li>
                      <li className="nav-item mx-2 text-white"><Link className="nav-link" to="/instagram" >Instagram</Link></li>
              </ul>
              </div>
          </div>
          <main className="main-class">
          <Routes>
                  <Route exact path="/" element={<TweetBootstrap />} />
                  <Route exact path="/twitter" element={<TweetBootstrap />} />
                  <Route exact path="/colorquote" element={<InstaBootstrap />} />
                  <Route exact path="/instagram" element={<InstaBootstrap />} />
                  <Route exact path="/tweet" element={<TweetBootstrap />} />
                
              <Route element={<NoMatch />}/>
                  

              </Routes>
              </main>
    </div>
  );
}

export default App;
const NoMatch = () => {
    return <h1> Error 404: Page Not Found</h1>;
}
//<div className=""></div>

const Whatsapp = () => {
    return (<div className="container-fluid m-md-3 m-sm-0">
        <h1 className="text-center text-lg-start" >insta</h1>
        <div className="row d-sm-grid d-md-flex d-lg-flex ">
            <div className="col-md col-lg-5 col-xl-4 col-xxl-2  d-flex justify-self-center " style={{ minWidth: 412, maxWidth: 412, justifySelf: "center" }}>
                <div className="" style={{ width: 402, border: "1px solid black", height: 600, maxWidth:402 }}></div>
            </div>
            <div className="col-md col-lg col-xl col-xxl">
                <div className="row">
                    <h3>Post Data</h3>

                </div>

                <div className="row d-md-block d-lg-flex">
                    <div className="col-md-12 col-lg col-xl col-xxl bg-secondary ">div1</div>
                    <div className="col-md-12 col-lg col-xl col-xxl bg-secondary ">div2</div>

                </div>
                <div className="row d-md-block d-lg-flex">
                    <div className="col-md-12 col-lg col-xl col-xxl bg-secondary ">div3</div>
                    

                </div>
                <div className="row d-md-block d-lg-flex">
                    <div className="col-md-12 col-lg col-xl col-xxl bg-secondary ">div4</div>
                    <div className="col-md-12 col-lg col-xl col-xxl bg-secondary ">div5</div>

                </div>
                <div className="row d-md-block d-lg-flex">
                    <div className="col-md-12 col-lg col-xl col-xxl bg-secondary ">div6</div>

                </div>
                <div className="row">
                    <h3>Stats & Status</h3>

                </div>
                <div className="row d-md-block d-lg-flex">
                    <div className="col-md-12 col-lg col-xl col-xxl bg-secondary ">div4</div>
                    <div className="col-md-12 col-lg col-xl col-xxl bg-secondary ">div5</div>
                    <div className="col-md-12 col-lg col-xl col-xxl bg-secondary ">div5</div>

                </div>
            </div>

            </div>
        <div className="row">
            <div className=" col-lg bg-primary ">col3</div>
            

        </div>
        </div>
        );
}
const Home = () => {
    return (<>
        <h1>Home</h1>
        <p>App is still upgrading. Please select option from menu</p>

    </>);
}