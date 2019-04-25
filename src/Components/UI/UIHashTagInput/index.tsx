import * as React from 'react';

import ReactHashTag from './HashTagInput';
const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

interface IUIHashTagInput {
    tags: any[]
    suggestions: any[],
    onDelete : (e ?: any) => any,
    onAdd  : (e ?: any) => any,
    onMouseDownHashTag ?: (e : any) => any,
    onChange ?:   (e : any) => any
}
export default class UIHashTagInput extends React.Component<IUIHashTagInput> {
    state = {
        tags: this.props.tags.map(item => ({ text: item, id: item })),
        suggestions: this.props.suggestions.map(item => ({ text: item, id: item }))
    };

    handleDelete = (i) => {
        const { tags } = this.state;
        this.props.onDelete()
    }
    handleAddition = (tag) => {
        this.props.onAdd()
    }


    render() {
        let { tags ,suggestions } = this.props
        suggestions = this.props.suggestions.map(item => ({ text: item, id: item }))
        tags = this.props.tags.map(item => ({ text: item, id: item }))
        return <ReactHashTag
            tags={tags}
            suggestions={suggestions || []}
            delimiters={delimiters}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            onChange={this.props.onChange}
            // handleDrag={this.handleDrag}
            handleTagClick={this.props.onMouseDownHashTag|| undefined}
        />
    }
}
