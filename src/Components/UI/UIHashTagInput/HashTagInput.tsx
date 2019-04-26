import * as React from 'react';
import noop from 'lodash/noop';
import Suggestions from './Suggest'
import Tag from './Tag';
import { Input } from '../../styled/base';
import styled from 'styled-components';
export const KEYS = {
  ENTER: 13,
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27,
};

export const DEFAULT_PLACEHOLDER = 'Add new tag';


export const INPUT_FIELD_POSITIONS = {
  INLINE: 'inline',
  TOP: 'top',
  BOTTOM: 'bottom',
};


export default class ReactTags extends React.Component<any, any> {
  static defaultProps = {
    labelField: 'text',
    suggestions: [],
    delimiters: [KEYS.ENTER, KEYS.TAB],
    autofocus: true,
    inline: true,
    inputFieldPosition: INPUT_FIELD_POSITIONS.INLINE,
    handleDelete: noop,
    handleAddition: noop,

    resetInputOnDelete: true,
    autocomplete: false,
    readOnly: false,
    allowUnique: true,
    allowDragDrop: true,
    tags: [],
  };
  textInput: any
  constructor(props) {
    super(props)
    const { suggestions } = props;
    this.state = {
      suggestions,
      query: '',
      isFocused: false,
      selectedIndex: -1,
      selectionMode: false,
    };
  }


  componentDidMount() {
    const { autofocus, readOnly } = this.props;
    if (autofocus && !readOnly) {
      this.resetAndFocusInput();
    }
  }

  filteredSuggestions = (query, suggestions) => {
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

  resetAndFocusInput = () => {
    this.setState({ query: '' });
    if (this.textInput) {
      this.textInput.value = '';
      this.textInput.focus();
    }
  }

  handleTagClick = (i, e) => {
    if (this.props.handleTagClick) {
      this.props.handleTagClick(i, e);
    }
    if (!this.props.resetInputOnDelete) {
      this.textInput && this.textInput.focus();
    } else {
      this.resetAndFocusInput();
    }
  }

  handleChange = (e) => {
    if (this.props.handleInputChange) {
      this.props.handleInputChange(e.target.value);
    }
    this.props.onChange(e.target.value)
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

  handleFocus = (e) => {
    const value = e.target.value;
    if (this.props.handleInputFocus) {
      this.props.handleInputFocus(value);
    }
    this.setState({ isFocused: true });
  }

  handleBlur = (e) => {
    const value = e.target.value;
    if (this.props.handleInputBlur) {
      this.props.handleInputBlur(value);
      if (this.textInput) {
        this.textInput.value = '';
      }
    }
    this.setState({ isFocused: false });
  }

  handleKeyDown = (e) => {
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

  addTag = (tag) => {
    const { tags, labelField, allowUnique } = this.props;
    if (!tag.id || !tag[labelField]) {
      return;
    }
    this.props.handleAddition(tag);
    this.setState({
      query: '',
      selectionMode: false,
      selectedIndex: -1,
    });

    this.resetAndFocusInput();
  };

  handleSuggestionClick = (i) => {
    console.log('this.state.suggestions', this.state.suggestions, i)
    this.addTag(this.state.suggestions[i]);
  }
  getTagItems = () => {
    const {
      tags,
      labelField,

    } = this.props;
    return tags.map((tag, index) => {
      return (
        <Tag
          key={`${tag.id}-${index}`}
          index={index}
          tag={tag}
          labelField={labelField}
          onDelete={this.props.handleDelete}
         
        />
      );
    });
  };

  render() {
    const query = this.state.query.trim(),
      selectedIndex = this.state.selectedIndex,
      suggestions = this.state.suggestions;

    const {
      placeholder,
    } = this.props;
    

    return (
      <Wrapper>
         <div className="pb-duc-wrapper-tag">
          { this.getTagItems()}
        </div>
        <div className="pb-duc-wrapper-input">
        <Input
          ref={(input) => {
            this.textInput = input;
          }}
          placeholder={placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={this.props.inputValue}
        />

        {query.length > 0 && <Suggestions
          query={query}
          suggestions={suggestions}
          labelField={this.props.labelField}
          selectedIndex={selectedIndex}
          handleClick={this.handleSuggestionClick}
          isFocused={this.state.isFocused}
        /> }
        </div>
       
      </Wrapper>
    );
  }
}
const Wrapper = styled.div`
display : flex;
flex-direction : row;
.pb-duc-wrapper-input {
 
}
  
`

