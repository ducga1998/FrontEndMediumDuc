import  * as React from 'react';
import noop from 'lodash/noop';
import uniq from 'lodash/uniq';
import Suggestions from './Suggest';
import ClassNames from 'classnames';
import memoizeOne from 'memoize-one';
import Tag from './Tag';
import { buildRegExpFromDelimiters } from '../../../help/util'
export const KEYS = {
    ENTER: 13,
    TAB: 9,
    BACKSPACE: 8,
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    ESCAPE: 27,
  };
  
  export const DEFAULT_PLACEHOLDER = 'Add new tag';
  
  export const DEFAULT_LABEL_FIELD = 'text';
  
  export const DEFAULT_CLASSNAMES = {
    tags: 'ReactTags__tags',
    tagInput: 'ReactTags__tagInput',
    tagInputField: 'ReactTags__tagInputField',
    selected: 'ReactTags__selected',
    tag: 'ReactTags__tag',
    remove: 'ReactTags__remove',
    suggestions: 'ReactTags__suggestions',
    activeSuggestion: 'ReactTags__activeSuggestion',
  };
  
  export const INPUT_FIELD_POSITIONS = {
    INLINE: 'inline',
    TOP: 'top',
    BOTTOM: 'bottom',
  };
  

const updateClassNames  = memoizeOne((classNames) =>
{
  return {
    classNames : {...DEFAULT_CLASSNAMES,...classNames},
  };
});

export default class ReactTags extends React.Component<any, any> {
 

  static defaultProps = {
    placeholder: DEFAULT_PLACEHOLDER,
    labelField: DEFAULT_LABEL_FIELD,
    suggestions: [],
    delimiters: [KEYS.ENTER, KEYS.TAB],
    autofocus: true,
    inline: true, // TODO: Remove in v7.x.x
    inputFieldPosition: INPUT_FIELD_POSITIONS.INLINE,
    handleDelete: noop,
    handleAddition: noop,
    allowDeleteFromEmptyInput: true,
    allowAdditionFromPaste: true,
    resetInputOnDelete: true,
    autocomplete: false,
    readOnly: false,
    allowUnique: true,
    allowDragDrop: true,
    tags: [],
  };
  textInput : any
  constructor(props) {
    super(props);

    if (!props.inline) {
      /* eslint-disable no-console */
      console.warn('[Deprecation] The inline attribute is deprecated and will be removed in v7.x.x, please use inputFieldPosition instead.');
      /* eslint-enable no-console */
    }

    const { suggestions, classNames } = props;
    this.state = {
      suggestions,
      query: '',
      isFocused: false,
      selectedIndex: -1,
      selectionMode: false,
      classNames: { ...DEFAULT_CLASSNAMES, ...classNames },
    };
    // TODO : remove classNames from state and change updateClassNames to instance function
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.moveTag = this.moveTag.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.resetAndFocusInput = this.resetAndFocusInput.bind(this);
    this.handleSuggestionHover = this.handleSuggestionHover.bind(this);
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);

  }

  static getDerivedStateFromProps(props)
  {
    const { classNames } = props;
    return updateClassNames(classNames);
  }

  componentDidMount() {
    const { autofocus, readOnly } = this.props;
    if (autofocus && !readOnly) {
      this.resetAndFocusInput();
    }
  }

  filteredSuggestions(query, suggestions) {
    if (this.props.handleFilterSuggestions) {
      return this.props.handleFilterSuggestions(query, suggestions);
    }

    const exactSuggestions = suggestions.filter((item) => {
      return this.getQueryIndex(query, item) === 0;
    });
    const partialSuggestions = suggestions.filter((item) => {
      return this.getQueryIndex(query, item) > 0;
    });
    return exactSuggestions.concat(partialSuggestions);
  }

  getQueryIndex = (query, item) => {
    return item[this.props.labelField]
      .toLowerCase()
      .indexOf(query.toLowerCase());
  }

  resetAndFocusInput() {
    this.setState({ query: '' });
    if (this.textInput) {
      this.textInput.value = '';
      this.textInput.focus();
    }
  }

  handleDelete(i, e) {
    this.props.handleDelete(i, e);
    if (!this.props.resetInputOnDelete) {
      this.textInput && this.textInput.focus();
    } else {
      this.resetAndFocusInput();
    }
    e.stopPropagation();
  }

  handleTagClick(i, e) {
    if (this.props.handleTagClick) {
      this.props.handleTagClick(i, e);
    }
    if (!this.props.resetInputOnDelete) {
      this.textInput && this.textInput.focus();
    } else {
      this.resetAndFocusInput();
    }
  }

  handleChange(e) {
    if (this.props.handleInputChange) {
      this.props.handleInputChange(e.target.value);
    }

    const query = e.target.value.trim();
    const suggestions = this.filteredSuggestions(query, this.props.suggestions);

    const { selectedIndex } = this.state;

    this.setState({
      query: query,
      suggestions: suggestions,
      selectedIndex:
        selectedIndex >= suggestions.length
          ? suggestions.length - 1
          : selectedIndex,
    });
  }

  handleFocus(e) {
    const value = e.target.value;
    if (this.props.handleInputFocus) {
      this.props.handleInputFocus(value);
    }
    this.setState({ isFocused: true });
  }

  handleBlur(e) {
    const value = e.target.value;
    if (this.props.handleInputBlur) {
      this.props.handleInputBlur(value);
      if (this.textInput) {
        this.textInput.value = '';
      }
    }
    this.setState({ isFocused: false });
  }

  handleKeyDown(e) {
    const { query, selectedIndex, suggestions, selectionMode } = this.state;

    // hide suggestions menu on escape
    if (e.keyCode === KEYS.ESCAPE) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        selectedIndex: -1,
        selectionMode: false,
        suggestions: [],
      });
    }

    // When one of the terminating keys is pressed, add current query to the tags.
    // If no text is typed in so far, ignore the action - so we don't end up with a terminating
    // character typed in.
    if (this.props.delimiters.indexOf(e.keyCode) !== -1 && !e.shiftKey) {
      if (e.keyCode !== KEYS.TAB || query !== '') {
        e.preventDefault();
      }

      const selectedQuery =
        selectionMode && selectedIndex !== -1
          ? suggestions[selectedIndex]
          : { id: query, [this.props.labelField]: query };

      if (selectedQuery !== '') {
        this.addTag(selectedQuery);
      }
    }

    // when backspace key is pressed and query is blank, delete tag
    if (
      e.keyCode === KEYS.BACKSPACE &&
      query === '' &&
      this.props.allowDeleteFromEmptyInput
    ) {
      this.handleDelete(this.props.tags.length - 1, e);
    }

    // up arrow
    if (e.keyCode === KEYS.UP_ARROW) {
      e.preventDefault();
      this.setState({
        selectedIndex:
          selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1,
        selectionMode: true,
      });
    }

    // down arrow
    if (e.keyCode === KEYS.DOWN_ARROW) {
      e.preventDefault();
      this.setState({
        selectedIndex:
          suggestions.length === 0
            ? -1
            : (selectedIndex + 1) % suggestions.length,
        selectionMode: true,
      });
    }
  }

  handlePaste(e) {
    if (!this.props.allowAdditionFromPaste) {
      return;
    }

    e.preventDefault();

    const clipboardData = e.clipboardData || window.clipboardData;
    const clipboardText = clipboardData.getData('text');

    const { maxLength = clipboardText.length } = this.props;

    const maxTextLength = Math.min(maxLength, clipboardText.length);
    const pastedText = clipboardData.getData('text').substr(0, maxTextLength);

    // Used to determine how the pasted content is split.
    const delimiterRegExp = buildRegExpFromDelimiters(this.props.delimiters);
    const tags = pastedText.split(delimiterRegExp);

    // Only add unique tags
    uniq(tags).forEach((tag) =>
      this.addTag({ id: tag, [this.props.labelField]: tag })
    );
  }

  addTag = (tag) => {
    const { tags, labelField, allowUnique } = this.props;
    if (!tag.id || !tag[labelField]) {
      return;
    }
    const existingKeys = tags.map((tag) => tag.id.toLowerCase());

    // Return if tag has been already added
    if (allowUnique && existingKeys.indexOf(tag.id.toLowerCase()) >= 0) {
      return;
    }
    if (this.props.autocomplete) {
      const possibleMatches = this.filteredSuggestions(
        tag[labelField],
        this.props.suggestions
      );

      if (
        (this.props.autocomplete === 1 && possibleMatches.length === 1) ||
        (this.props.autocomplete === true && possibleMatches.length)
      ) {
        tag = possibleMatches[0];
      }
    }

    // call method to add
    this.props.handleAddition(tag);

    // reset the state
    this.setState({
      query: '',
      selectionMode: false,
      selectedIndex: -1,
    });

    this.resetAndFocusInput();
  };

  handleSuggestionClick(i) {
    this.addTag(this.state.suggestions[i]);
  }

  handleSuggestionHover(i) {
    this.setState({
      selectedIndex: i,
      selectionMode: true,
    });
  }

  moveTag(dragIndex, hoverIndex) {
    const tags = this.props.tags;

    // locate tags
    const dragTag = tags[dragIndex];

    // call handler with the index of the dragged tag
    // and the tag that is hovered
    this.props.handleDrag(dragTag, dragIndex, hoverIndex);
  }

  getTagItems = () => {
    const {
      tags,
      labelField,
      removeComponent,
      readOnly,
      allowDragDrop,
    } = this.props;
    const { classNames } = this.state;
    const moveTag = allowDragDrop ? this.moveTag : null;
    return tags.map((tag, index) => {
      return (
        <Tag
          key={`${tag.id}-${index}`}
          index={index}
          tag={tag}
          labelField={labelField}
          onDelete={this.handleDelete.bind(this, index)}
          moveTag={moveTag}
          removeComponent={removeComponent}
          onTagClicked={this.handleTagClick.bind(this, index)}
          readOnly={readOnly}
          classNames={classNames}
          allowDragDrop={allowDragDrop}
        />
      );
    });
  };

  render() {
    const tagItems = this.getTagItems();

    // get the suggestions for the given query
    const query = this.state.query.trim(),
      selectedIndex = this.state.selectedIndex,
      suggestions = this.state.suggestions;

    const {
      placeholder,
      name: inputName,
      id: inputId,
      maxLength,
      inline,
      inputFieldPosition,
    } = this.props;

    const position = !inline ? INPUT_FIELD_POSITIONS.BOTTOM : inputFieldPosition;

    const tagInput = !this.props.readOnly ? (
      <div className={this.state.classNames.tagInput}>
        <input
          ref={(input) => {
            this.textInput = input;
          }}
          className={this.state.classNames.tagInputField}
          type="text"
          placeholder={placeholder}
          aria-label={placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onPaste={this.handlePaste}
          name={inputName}
          id={inputId}
          maxLength={maxLength}
          value={this.props.inputValue}
        />

        <Suggestions
          query={query}
          suggestions={suggestions}
          labelField={this.props.labelField}
          selectedIndex={selectedIndex}
          handleClick={this.handleSuggestionClick}
          handleHover={this.handleSuggestionHover}
          minQueryLength={this.props.minQueryLength}
          shouldRenderSuggestions={this.props.shouldRenderSuggestions}
          isFocused={this.state.isFocused}
          classNames={this.state.classNames}
        />
      </div>
    ) : null;

    return (
      <div className={ClassNames(this.state.classNames.tags, 'react-tags-wrapper')}>
        {position === INPUT_FIELD_POSITIONS.TOP && tagInput}
        <div className={this.state.classNames.selected}>
          {tagItems}
          {position === INPUT_FIELD_POSITIONS.INLINE && tagInput}
        </div>
        {position === INPUT_FIELD_POSITIONS.BOTTOM && tagInput}
      </div>
    );
  }
}

