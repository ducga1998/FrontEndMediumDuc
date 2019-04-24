import * as React from 'react';
import isEqual from 'lodash/isEqual';
import escape from 'lodash/escape';

const maybeScrollSuggestionIntoView = (suggestionEl, suggestionsContainer) => {
  const containerHeight = suggestionsContainer.offsetHeight;
  const suggestionHeight = suggestionEl.offsetHeight;
  const relativeSuggestionTop =
    suggestionEl.offsetTop - suggestionsContainer.scrollTop;

  if (relativeSuggestionTop + suggestionHeight >= containerHeight) {
    suggestionsContainer.scrollTop +=
      relativeSuggestionTop - containerHeight + suggestionHeight;
  } else if (relativeSuggestionTop < 0) {
    suggestionsContainer.scrollTop += relativeSuggestionTop;
  }
};

class Suggestions extends React.Component<any> {
  static defaultProps = {
    minQueryLength: 2,
  };
  suggestionsContainer : any
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
    const { selectedIndex, classNames } = this.props;

    if (
      this.suggestionsContainer &&
      prevProps.selectedIndex !== selectedIndex
    ) {
      const activeSuggestion = this.suggestionsContainer.querySelector(
        classNames.activeSuggestion
      );

      if (activeSuggestion) {
        maybeScrollSuggestionIntoView(
          activeSuggestion,
          this.suggestionsContainer
        );
      }
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
            onMouseOver={props.handleHover.bind(null, i)}
            className={
              i === props.selectedIndex ? props.classNames.activeSuggestion : ''
            }>
            {this.renderSuggestion(item, props.query)}
          </li>
        );
      }
    );

    // use the override, if provided
    const shouldRenderSuggestions =
      props.shouldRenderSuggestions || this.shouldRenderSuggestions;
    if (suggestions.length === 0 || !shouldRenderSuggestions(props.query)) {
      return null;
    }

    return (
      <div
        ref={(elem) => {
          this.suggestionsContainer = elem;
        }}
        className={this.props.classNames.suggestions}>
        <ul> {suggestions} </ul>
      </div>
    );
  }
}

export default Suggestions;
