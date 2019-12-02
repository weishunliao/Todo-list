import styled from "styled-components";
import { black, error, success } from "./colors";
import { screenWidthBetween, screenWidthBetweenInPx } from "./responsive";
import { noSelect } from "./utils";

export const fontSizes = {
  header1: `2.5rem`,
  header2: `2.125rem`,
  header3: `1.5rem`,
  largeText: `1.25rem`,
  largerNormalText: `1rem`,
  normalText: `0.875rem`,
  smallText: `0.75rem`,
  panelHeaderText: `1.15rem`,
};

export const fontStyles = {
  bold: {
    fontWeight: `bold`,
  },
};

export const HeaderText = styled.div({
  fontSize: fontSizes.header1,
  color: black,
  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.header2,
  },
});

export const CardHeaderText = styled.div({
  fontSize: fontSizes.header3,
  color: black,
  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.header3,
  },
});

export const Text = styled.div({
  fontSize: fontSizes.normalText,
  color: black,
  ...noSelect(),
  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.normalText,
  },
});

export const LargerThanNormalText = styled.div({
  fontSize: fontSizes.largerNormalText,
  color: black,

  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.normalText,
  },
});

export const ErrorText = styled.div({
  fontSize: fontSizes.normalText,
  color: error,

  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.normalText,
  },
});

export const SuccessText = styled.div({
  fontSize: fontSizes.normalText,
  color: success,

  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.normalText,
  },
});

export const LargeText = styled.div({
  fontSize: fontSizes.largeText,
  color: black,

  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.largeText,
  },
});

export const LargerText = styled.div({
  fontSize: fontSizes.header3,
  color: black,

  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.header3,
  },
});

export const HugeText = styled.div({
  fontSize: fontSizes.header2,
  color: black,

  [screenWidthBetweenInPx(0, 1380)]: {
    fontSize: fontSizes.header3,
  },
});

export const PanelHeaderText = styled.div({
  fontSize: fontSizes.panelHeaderText,
  color: black,

  [screenWidthBetween(`zero`, `small`)]: {
    fontSize: fontSizes.panelHeaderText,
  },
});
