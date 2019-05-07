import * as React  from "react";
import { css } from "emotion";
import {
  skeletonClass,
  defaultBaseColor,
  defaultHighlightColor
} from "./index";
export default class SkeletonTheme extends React.Component {
  static defaultProps = {
    color: defaultBaseColor,
    highlightColor: defaultHighlightColor
  };
  themeClass : any
  constructor(props) {
    super(props);

    this.themeClass = css`
      .${skeletonClass} {
        background-color: ${props.color};
        background-image: linear-gradient(
          90deg,
          ${props.color},
          ${props.highlightColor},
          ${props.color}
        );
      }
    `;
  }
  render() {
    return <div className={this.themeClass}>{this.props.children}</div>;
  }
}