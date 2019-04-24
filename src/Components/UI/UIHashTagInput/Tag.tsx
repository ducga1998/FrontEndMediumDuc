import  * as  React  from 'react';
import ClassNames from 'classnames';

class Tag extends React.Component<any, any> {
    static defaultProps = {
        labelField: 'text',
        readOnly: false,
      };
  render() {
    const { props } = this;
    const label = props.tag[props.labelField];
    const {
      tag,
      classNames,
    } = props;
    const { className = '' } = tag;
    const tagComponent = ( <span
      className={ClassNames('tag-wrapper', classNames.tag, className)}
      onClick={props.onTagClicked}
      onKeyDown={props.onTagClicked}
      onTouchStart={props.onTagClicked}>
      {label}

    </span>
    );
    return tagComponent
  }
}



export default Tag