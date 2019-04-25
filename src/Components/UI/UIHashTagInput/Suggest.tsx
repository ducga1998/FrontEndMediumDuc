import * as React from 'react';
import isEqual from 'lodash/isEqual';
import escape from 'lodash/escape';
import styled from 'styled-components';
class Suggestions extends React.Component<any> {
  static defaultProps = {
    minQueryLength: 2,
  };
  suggestionsRef : any
  shouldComponentUpdate(nextProps) {
    const { props } = this;
    const shouldRenderSuggestions =
      props.shouldRenderSuggestions || this.shouldRenderSuggestions;
    return (
      props.isFocused !== nextProps.isFocused ||
      !isEqual(props.suggestions, nextProps.suggestions) ||
      shouldRenderSuggestions(nextProps.query) ||
      shouldRenderSuggestions(nextProps.query) !==
        shouldRenderSuggestions(props.query)
    );
  }
  componentDidUpdate(prevProps) {
    const { selectedIndex } = this.props;

    if (
      this.suggestionsRef &&
      prevProps.selectedIndex !== selectedIndex
    ) {
    }
  }
  markIt = (input, query) => {
    const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    const { [this.props.labelField]: labelValue } = input;

    return {
      __html: labelValue.replace(RegExp(escapedRegex, 'gi'), (x) => {
        return `<mark>${escape(x)}</mark>`;
      }),
    };
  };

  shouldRenderSuggestions = (query) => {
    const { minQueryLength, isFocused } = this.props;
    return query.length >= minQueryLength && isFocused;
  };

  renderSuggestion = (item, query) => {
    const { renderSuggestion } = this.props;
    if (typeof renderSuggestion === 'function') {
      return renderSuggestion(item, query);
    }
    return <span dangerouslySetInnerHTML={this.markIt(item, query)} />;
  };

  render() {
    const { props } = this;
    const suggestions = props.suggestions.map(
      (item, i)  => {
        return (
          <li
            key={i}
            onMouseDown={props.handleClick.bind(null, i)}
            onTouchStart={props.handleClick.bind(null, i)}
            className={
              i === props.selectedIndex ? props.classNames.activeSuggestion : ''
            }>
            {this.renderSuggestion(item, props.query)}
          </li>
        );
      }
    );
   
  if (suggestions.length === 0 || this.shouldRenderSuggestions(props.query)) {
    return null;
  }
    return (
        <WrapperSuggestion
        ref={(elem) => {
          this.suggestionsRef = elem;
        }}
        >
        <ul> {suggestions} </ul>
      </WrapperSuggestion>
    );
  }
}
const WrapperSuggestion = styled.div` 
  background : ${props => props.theme.brand.default};
  position : relative;
  li {
        display : block;
        padding : 10px;
        list-style : none;
        transition : .1s;
        background : ${props => props.theme.brand.alt};
        &:hover {
            background : ${props => props.theme.brand.border};
        }
        border-bottom : 1px solid ${props => props.theme.brand.border}
    }
    ul{
      position : absolute;
      z-index : 900000000000;
      padding : 0px;
      margin : 3px 0px 0px 0px;
    }
`
export default Suggestions;
