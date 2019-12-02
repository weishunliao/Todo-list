import styled from "styled-components";
import { StyleObject } from "../interfaces";

interface Breakpoints {
  [key: string]: string;
}

// All breakpoints should be specified here, including nonces.
// c.f. https://www.cnet.com/news/iphone-web-pages-apps-should-be-480-pixels-wide-10-mb-maximum/
export const breakpoints: Breakpoints = {
  zero: `0px`,
  smaller: `320px`,
  small: `480px`,
  medium: `960px`,
  large: `1100px`,
  inf: `7000px`,
};

interface BreakpointsInt {
  [key: string]: number;
}

export const breakpointsInt: BreakpointsInt = {
  zero: 0,
  smaller: 320,
  small: 480,
  medium: 960,
  large: 1100,
  inf: 7000,
};

interface HeightBreakpoints {
  [key: string]: string;
}

// In Chrome, bookmarks bar is 40px high.
const heightBreakpoints: HeightBreakpoints = {
  zero: `0px`,
  small: `720px`,
  medium: `760px`,
  large: `800px`,
  inf: `7000px`,
};

export const getIsMobile = (width: number) => width < breakpointsInt.small;

export const screenWidthMore = (key: string) =>
  `@media screen and (min-width: ${breakpoints[key]})`;

export const screenWidthLess = (key: string) =>
  `@media and (max-width: ${breakpoints[key]})`;

export const screenWidthBetween = (keyMin: string, keyMax: string) =>
  `@media (min-width: ${breakpoints[keyMin]}) and (max-width: ${breakpoints[keyMax]})`;

export const screenHeightMore = (key: string) =>
  `@media screen and (min-height: ${heightBreakpoints[key]})`;
export const screenHeightLess = (key: string) =>
  `@media screen and (max-height: ${heightBreakpoints[key]})`;

export const screenHeightBetween = (keyMin: string, keyMax: string) =>
  `@media (min-height: ${heightBreakpoints[keyMin]}) and (max-height: ${heightBreakpoints[keyMax]})`;

export const screenWidthBetweenInPx = (min: number, max: number) =>
  `@media (min-width: ${min}px) and (max-width: ${max}px)`;

interface ResponsiveObject {
  [key: string]: object[];
}

/**
 * obj can be of shape e.g. { color: ['red', 'blue', 'green'] }
 * or e.g. "& > *": [{ marginBottom: `24px` }, { marginBottom: `24px` }, { marginRight: `30px` }],
 */
export const responsive = (obj: ResponsiveObject) => {
  const propertyNames = Object.keys(obj);

  const small: StyleObject = {};
  const medium: StyleObject = {};
  const large: StyleObject = {};

  propertyNames.forEach((propertyName) => {
    const arr = obj[propertyName];
    const smallVal = arr[0];
    const mediumVal = arr[1];
    const largeVal = arr[2];

    if (typeof smallVal === "object" && smallVal !== null) {
      small[propertyName] = { ...smallVal };
    } else {
      small[propertyName] = smallVal;
    }

    if (typeof mediumVal === "object" && mediumVal !== null) {
      medium[propertyName] = { ...mediumVal };
    } else {
      medium[propertyName] = mediumVal;
    }

    if (typeof largeVal === "object" && largeVal !== null) {
      large[propertyName] = { ...largeVal };
    } else {
      large[propertyName] = largeVal;
    }
  });

  return {
    [screenWidthBetween(`zero`, `small`)]: {
      ...small,
    },
    [screenWidthBetween(`small`, `medium`)]: {
      ...medium,
    },
    [screenWidthBetween(`medium`, `large`)]: {
      ...large,
    },
    [screenWidthBetween(`large`, `inf`)]: {
      ...large,
    },
  };
};

interface SpaceProps {
  h?: number;
  w?: number;
  expand?: boolean;
}

export const Space = styled.div(({ h, w, expand }: SpaceProps) => ({
  height: `${h}px` || 0,
  width: `${w}px` || 0,
  flexGrow: expand ? 1 : 0,
}));

interface Space {
  [key: string]: number;
}

export const space: Space = {
  a: 8,
  b: 16,
  c: 24,
  d: 32,
  e: 40,
  f: 48,
  g: 56,
  h: 64,
};

interface SpacerProps {
  h?: string;
  w?: string;
  expand?: boolean;
}

export const Spacer = styled.div(({ h = ``, w = ``, expand }: SpacerProps) => ({
  height: `${space[h]}px` || 0,
  width: `${space[w]}px` || 0,
  flexGrow: expand ? 1 : 0,
}));

export const NarrowComponent = styled.div({
  display: "none",
  [screenWidthBetweenInPx(breakpointsInt[`zero`], breakpointsInt[`small`])]: {
    display: "initial",
  },
});

export const MediumComponent = styled.div({
  display: "none",
  [screenWidthBetweenInPx(
    breakpointsInt[`small`] + 1,
    breakpointsInt[`medium`],
  )]: {
    display: "initial",
  },
});

export const WideComponent = styled.div({
  display: "none",
  [screenWidthBetweenInPx(
    breakpointsInt[`medium`] + 1,
    breakpointsInt[`inf`],
  )]: {
    display: "initial",
  },
});

export const NarrowAndMediumComponent = styled.div({
  display: "none",
  [screenWidthBetweenInPx(breakpointsInt[`zero`], breakpointsInt[`medium`])]: {
    display: "initial",
  },
});

export const MediumAndWideComponent = styled.div({
  display: "none",
  [screenWidthBetweenInPx(
    breakpointsInt[`medium`] + 1,
    breakpointsInt[`inf`],
  )]: {
    display: "initial",
  },
});

export const Narrow = ({ children }) => (
  <NarrowComponent>{children}</NarrowComponent>
);

export const Medium = ({ children }) => (
  <MediumComponent>{children}</MediumComponent>
);

export const Wide = ({ children }) => <WideComponent>{children}</WideComponent>;

export const NarrowAndMedium = ({ children }) => (
  <NarrowAndMediumComponent>{children}</NarrowAndMediumComponent>
);

export const MediumAndWide = ({ children }) => (
  <MediumAndWideComponent>{children}</MediumAndWideComponent>
);
