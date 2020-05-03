import React from "react";
import { useAuthenticated } from "../context/Auth";
import Router from "next/router";

const isServer = typeof window === "undefined";

const WithoutAuthWrapperRedirectComponent = (WrappedComponent) => {
  const WithoutAuthWrapper = (props) => {
    const isAuthenticated = useAuthenticated();
    if (!isServer && isAuthenticated) {
      Router.push("/board");
    }
    return <WrappedComponent {...props} />;
  };

  WithoutAuthWrapper.getInitialProps = async (ctx) => {
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps };
  };
  return WithoutAuthWrapper;
};

export default WithoutAuthWrapperRedirectComponent;
