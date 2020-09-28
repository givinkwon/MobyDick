import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import { withRouter } from 'next/router'
import Router from "next/router";
// components
import Container from "./Container";
import * as Text from "./Text";

import { PRIMARY, WHITE, DARKGRAY } from "static/style";

const close_ic = "/static/icon/close.svg";
const hamburger_ic = "/static/icon/hamburger.png";
const logo_ic = "/static/images/logo2.jpg";
const profile = "/static/images/profile.png";

@inject("Auth", "Partner")
@observer
class Nav extends React.Component {
  state = {
    token: null,
    url: "/",
    is_profile: false,
    is_open: false,
  };

  alreadyLoggedin = ["login", "signup"];
  needPermission = ["profile", "answer", "proposal", "offered", "account"];
  logout = () => {
    localStorage.removeItem("token");
    if(localStorage.getItem("expiry")) {
      localStorage.removeItem("expiry");
    }
    window.location.href = "/";
  };
  async componentDidMount() {
    const { Auth } = this.props;
    const token = await localStorage.getItem("token");
    const { route, pathname } = Router.router;
    const splitedRoute = route.split("/");
    console.log(splitedRoute);
    const requestId = window.location.pathname.split('/').pop()

    // 사용자 접근 제어
    if (token) {
      this.alreadyLoggedin.forEach((url) => {
        if (url === splitedRoute[1]) {
          alert("이미 로그인한 사용자입니다");
          Router.push("/");
        }
        // /offered 에서 tab 1을 거치지 않고 tab 2로 들어온 사용자 리다이렉트
        else if ("offered" === splitedRoute[1]) {
          let currentTab = 0;
          const queryParams = window.location.href.split("?").pop();

          // 'http://localhost:3000/offered?tab=1&state=2'이면
          // queryParams = 'tab=1&state=2'
          queryParams.split("&").forEach((param) => {
            // name = 'tab', 'state'
            // value = '1', '2'
            const [name, value] = param.split("=");
            if (name === "tab") {
              currentTab = value;
            }
          });

          let prevTab = 0;
          const prevQueryParams = document.referrer.split("?").pop();

          prevQueryParams.split("&").forEach((param) => {
            const [name, value] = param.split("=");
            if (name === "tab") {
              prevTab = value;
            }
          });

          // 현재 tab이 2인데 이전 tab이 1이 아니면
          if (currentTab == 2 && prevTab != 1) {
            Router.push(pathname + "?tab=1");
          }
        }
      });
    } else
     {
      // 로그인 하지 않고 /partner/[id]로 들어오는 사용자 리다이렉트
      //if(splitedRoute[1] === 'partner' && splitedRoute.length >= 3) {
      //  alert("로그인이 필요합니다");
      //  Router.push("/login");
      //}
      console.log(requestId)
      this.needPermission.forEach((url) => {
        if (url === splitedRoute[1]) {
          if(requestId != 923){
          alert("로그인이 필요합니다");
          Router.push("/login");
          }
        }
      });
     }

    // 토큰은 있는데 userInfo가 mobx에 없으면 리로딩
    await Auth.checkLogin();

    this.setState({
      url: route,
      token: token,
    });
    // 토큰은 있는데 userInfo가 mobx에 없으면 리로딩
    Auth.checkLogin();
  }
  render() {
    const { Auth, Partner } = this.props;
    const { url, is_open, is_profile, token } = this.state;

    return (
      <NavBox>
        <Container>
          <NavWrap>
            <Logo src={logo_ic} onClick={() => Router.push("/")} />
            <Menu is_open={is_open}>
              <Close>
                <Icon
                  src={close_ic}
                  onClick={() => this.setState({ is_open: false })}
                />
              </Close>

              {Auth.logged_in_user ? (
                Auth.logged_in_user.type === 0 ? (
                  /* client로 로그인 */

                  <Fragment>
                    <NavLink
                      first
                      onClick={() => Router.push("/request?big=4&mid=")}
                      active={url.indexOf("request") > -1}
                    >
                      의뢰하기
                    </NavLink>
                    <NavLink
                      onClick={() => Router.push("/answer")}
                      active={url.indexOf("answer") > -1}
                    >
                      보낸 의뢰
                    </NavLink>
                    <NavLink
                      onClick={
                        async () => {
                          Router.push("/partner");
                          if(Router.pathname === '/partner') {
                            Router.reload();
                          }
                        }
                      }
                      active={url.indexOf("partner") > -1}
                    >
                      제조사 찾기
                    </NavLink>
                    <NavLink
                      onClick={() => Router.push("/magazine")}
                      active={url.indexOf("magazine") > -1}
                    >
                      제품 인사이트
                    </NavLink>
                    {/*<NavLink
                      onClick={() => Router.push("/info?tab=1")}
                      active={url.indexOf("info") > -1}
                    >
                      이용 안내
                    </NavLink>*/}
                  </Fragment>
                ) : (
                  /* partner로 로그인 */
                  <Fragment>
                    {/*<NavLink
                      first
                      onClick={() => Router.push("/proposal")}
                      active={url.indexOf("proposal") > -1}
                    >
                      받은 의뢰
                    </NavLink>*/}
                    {/*<NavLink
                      onClick={() => Router.push("/offered?tab=1")}
                      active={url.indexOf("offered") > -1}
                    >
                      보낸 제안서
                    </NavLink>*/}
                    <NavLink
                      onClick={
                        async () => {
                          await Router.push("/partner");
                          if(Router.pathname === '/partner') {
                            Router.reload();
                          }
                        }
                      }
                      active={url.indexOf("partner") > -1}
                    >
                      제조사 찾기
                    </NavLink>
                    <NavLink
                      onClick={() => Router.push("/magazine")}
                      active={url.indexOf("magazine") > -1}
                    >
                      제품 인사이트
                    </NavLink>
                    {/*<NavLink
                      onClick={() => Router.push("/info?tab=2")}
                      active={url.indexOf("info") > -1}
                    >
                      이용 안내
                    </NavLink>*/}
                  </Fragment>
                )
              ) : (
                /* 로그인 안되어있는 경우 */
                <Fragment>
                  <NavLink
                    first
                    onClick={() => Router.push("/request?big=4&mid=")}
                    active={url.indexOf("request") > -1}
                  >
                    의뢰하기
                  </NavLink>
                  {/*<NavLink
                    onClick={() => Router.push("/answer")}
                    active={url.indexOf("answer") > -1}
                  >
                    보낸 의뢰
                  </NavLink>*/}
                  <NavLink
                    onClick={
                      async () => {
                        await Router.push("/partner");
                        if(Router.pathname === '/partner') {
                          Router.reload();
                        }
                      }
                    }
                    active={url.indexOf("partner") > -1}
                  >
                    제조사 찾기
                  </NavLink>
                  <NavLink
                      onClick={() => Router.push("/magazine")}
                      active={url.indexOf("magazine") > -1}
                    >
                      제품 인사이트
                  </NavLink>
                  {/*<NavLink
                    onClick={() => Router.push("/info?tab=1")}
                    active={url.indexOf("info") > -1}
                  >
                    이용 안내
                  </NavLink>*/}
                </Fragment>
              )}

              {token ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    src={profile}
                    onClick={() => this.setState({ is_profile: !is_profile })}
                  />
                  {is_profile && (
                    <ProfileMenu>
                      {Auth.logged_in_user.type == 1 ? (
                        <div onClick={async () => await Router.push("/profile")}>
                          <Text.FontSize16 fontWeight={500}>
                            프로필
                          </Text.FontSize16>
                        </div>
                      ) : null}
                      <div onClick={() => Router.push("/store?tab=1")}>
                        <Text.FontSize16 fontWeight={500}>
                          {Auth.logged_in_user.type == 1 ? '이용요금' : '이용요금'}
                        </Text.FontSize16>
                      </div>
                      {/*<div onClick={async () => {
                        await Router.push("/store?tab=2")
                        Router.reload()
                      } }>
                        <Text.FontSize16 fontWeight={500}>
                          스토어
                        </Text.FontSize16>
                      </div>*/}
                      <div onClick={() => Router.push('/account?tab=1')}>
                        <Text.FontSize16 fontWeight={500}>
                          계정설정
                        </Text.FontSize16>
                      </div>
                      <div onClick={this.logout}>
                        <Text.FontSize16 fontWeight={500}>
                          로그아웃
                        </Text.FontSize16>
                      </div>
                    </ProfileMenu>
                  )}
                </div>
              ) : (
                <NavLink
                  onClick={() => {
                    Router.push("/login"), Auth.reset();
                  }}
                  active={url.indexOf("login") > -1}
                >
                  LOG IN
                </NavLink>
              )}
            </Menu>
            <Icon
              src={hamburger_ic}
              onClick={() => this.setState({ is_open: true })}
            />
            {is_open && (
              <BG onClick={() => this.setState({ is_open: false })} />
            )}
          </NavWrap>
        </Container>
      </NavBox>
    );
  }
}

const ProfileMenu = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 50px;
  > div {
    padding: 15px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    > p {
      color: rgb(0, 0, 0, 0.8);
    }
    :hover {
      background-color: #f3f3f3;
      > p {
        color: ${PRIMARY};
      }
    }
  }
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  padding: 0px 15px;
  cursor: pointer;
`;
const NavBox = styled.div`
  height: 70px;
  width: 100%;
  background-color: ${WHITE};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;
const NavWrap = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 0;
  }
  @media (min-width: 768px) {
    padding: 0 16px;
  }
`;
const Logo = styled.img`
  cursor: pointer;
  width: 113px;
`;
const Icon = styled.img`
  cursor: pointer;
  margin-left: auto;
  width: 40px;
  height: 40px;
  display: none;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
  }
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: none;
    flex-direction: column;

    width: 100%;
    max-width: 380px;
    height: 100vh;
    background-color: ${DARKGRAY};
    position: absolute;

    top: 0;
    right: -100%;
    transition: 0.8s;

    z-index: 900;
    ${(props) =>
      props.is_open &&
      css`
        display: flex;
        right: 0%;
      `}
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-right: -12px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-right: -25px;
  }
  @media (min-width: 1300px) and (max-width: 1599.98px) {
    margin-right: -25px;
  }
  @media (min-width: 1600px) {
    margin-right: -30px;
  }
`;
const NavLink = styled.p`
  margin: 0px;
  height: 70px;
  cursor: pointer;
  color: #000000;
  display: flex;
  align-items: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    justify-content: center;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding-left: 12px;
    padding-right: 12px;
    font-size: 14px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding-left: 25px;
    padding-right: 25px;
    font-size: 14px;
  }
  @media (min-width: 1300px) and (max-width: 1599.98px) {
    padding-left: 25px;
    padding-right: 25px;
    font-size: 14px;
  }
  @media (min-width: 1600px) {
    padding-left: 30px;
    padding-right: 30px;
    font-size: 16px;
  }
  ${(props) =>
    props.first &&
    css`
      margin-left: 0px !important;
    `}
  ${(props) =>
    props.active &&
    css`
      font-weight: 700;
      background-color: rgba(255, 255, 255, 0.1);
    `}
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const BG = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 800;
  top: 0;
  left: 0;
`;
const Close = styled.div`
  margin: 10px;
  width: calc(100% - 20px);
  display: none;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: flex;
  }
`;
export default Nav;
