// This import is to try fix the weird next Link issue with css.
// c.f. https://github.com/zeit/next-plugins/issues/282
import "../static/empty.css";
import Router from "next/router";
import Head from "next/head";
import App from "next/app";
import LogRocket from "logrocket";
import getConfig from "next/config";
import setupLogRocketReact from "logrocket-react";
import * as Sentry from "@sentry/browser";
import cookie from "cookie";
import { AuthProvider } from "../context/Auth";
import Latout from "../components/Layout";
import { Styler } from "../components/app";

const { publicRuntimeConfig = {} } = getConfig() || {};

// NOTE: we have to access directly or else Next can't read it properly.
/* eslint-disable */
const LOGROCKET_PROJECT_ID = publicRuntimeConfig.LOGROCKET_PROJECT_ID;
const SENTRY_DSN = publicRuntimeConfig.SENTRY_DSN;
/* eslint-enable */
LogRocket.init("app/id");
Sentry.init({ dsn: SENTRY_DSN });

// only initialize when in the browser
if (process.browser) {
  LogRocket.init(LOGROCKET_PROJECT_ID);
  setupLogRocketReact(LogRocket);
  LogRocket.getSessionURL((sessionURL) => {
    Sentry.configureScope((scope) => {
      scope.setExtra(`sessionURL`, sessionURL);
    });
  });
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let isAuthenticated = false;
    let token = "";
    if (ctx.req && ctx.req.headers.cookie) {
      const cookies = cookie.parse(ctx.req.headers.cookie);
      token = cookies.__session;
      isAuthenticated = typeof token !== "undefined";
    }
    if (isAuthenticated) {
      ctx.token = token;
    }

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps, isAuthenticated, token };
  }

  componentDidMount() {
    Router.events.on(`routeChangeComplete`, () => {
      window.scrollTo(0, 0);
    });
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps, isAuthenticated, token } = this.props;
    return (
      <>
        <AuthProvider isAuthenticated={isAuthenticated} token={token}>
          <Head>
            <title>Boilerplate todo app</title>
          </Head>
          <Latout />
          <Styler>
            <Component {...pageProps} />
          </Styler>
        </AuthProvider>
      </>
    );
  }
}

export default MyApp;
