import React from "react";
import { useAuthenticated } from "../context/Auth";
import Router from "next/router";
import cookie from "cookie";

const isServer = typeof window === "undefined";

const WithAuthWrapperRedirectComponent = (WrappedComponent) => {
  const WithAuthWrapper = (props) => {
    const isAuthenticated = useAuthenticated();

    if (!isServer && !isAuthenticated) {
      Router.push("/signin");
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };

  WithAuthWrapper.getInitialProps = async (ctx) => {
    let isAuthenticated = false;
    if (ctx.req && ctx.req.headers.cookie) {
      const cookies = cookie.parse(ctx.req.headers.cookie);
      isAuthenticated = cookies.__session !== undefined;
    }
    if (ctx.req && !isAuthenticated) {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps };
  };
  return WithAuthWrapper;
};

export default WithAuthWrapperRedirectComponent;
