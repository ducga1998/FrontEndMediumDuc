import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  KeyBindingUtil,
  Modifier,
  AtomicBlockUtils,
  Entity,
  EditorBlock,
  OrderedSet
}  from 'draft-js';
import {
  Editor,
  StringToTypeMap,
  Block,
  keyBindingFn,
  createEditorState,
  addNewBlockAt,
  beforeInput,
  getCurrentBlock,
  ImageSideButton,
  rendererFn,
  HANDLED,
  NOT_HANDLED
} from 'medium-draft'
import {
  setRenderOptions,
  blockToHTML,
  entityToHTML,
  styleToHTML
}  from 'medium-draft/lib/exporter';
import 'isomorphic-fetch';
import mediumDraftImporter from 'medium-draft/lib/importer';
import './draft.css'
import OverLay from '../../../workspace/overlay';
import CustomImageSideButton from './CustomImageSideButton'
import styled from 'styled-components';
interface IMediumDraft {
  onChangeTitle  : (e : any) => any,
  onChangeContent : (e : string) =>any,
  initArticle ? : any
}
const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};
export default class MediumDraft extends React.Component<IMediumDraft> {
  state = {
    editorState: createEditorState(),
    editorEnabled: true,
    placeholder: 'Write here...',
    imgSrc  : ''
  };
  _editor : any = React.createRef()
  wrapperEditer : any = React.createRef()
  onChange = async (editorState, callback?:any  ) => {
    // console.log(convertToRaw)
    console.log(editorState)
  //   // console.log('content', editorState)
  // const domEditer =   document.querySelectorAll('[data-contents="true"]')[0]
  // console.log(domEditer.innerHTML)
    const currentContent = this.state.editorState.getCurrentContent();
  // console.log('currentContent',currentContent)
  const title = currentContent.getFirstBlock().text
    const eHTML = this.exporter(currentContent);
     await this.props.onChangeTitle(title)
    await  this.props.onChangeContent(eHTML)
    // console.log('html',eHTML)
    if (this.state.editorEnabled) {
      this.setState({ editorState }, () => {
        if (callback) {
          callback();
        }
      });
    }
  };
  sideButtons = [{
    title: 'Image',
    component: CustomImageSideButton,
  }, {
    title: 'Embed',
    component: EmbedSideButton,
  }, {
    title: 'Separator',
    component: SeparatorSideButton,
  }];
  exporter = setRenderOptions({
    styleToHTML,
    blockToHTML: newBlockToHTML,
    entityToHTML: newEntityToHTML,
  });
  getEditorState = () => this.state.editorState;
  componentDidMount() {
    if(this.props.initArticle){
      const editorState = createEditorState(convertToRaw(mediumDraftImporter(this.props.initArticle)));
      this.setState({editorState})
    }
   
    this.setState({
      placeholder: 'Write something for you  .....',
    });
    // setTimeout(this.fetchData, 1000);
    // this.refs.editor.focus();
  }
  rendererFn = (setEditorState, getEditorState) =>  {
    const atomicRenderers = {
      embed: AtomicEmbedComponent,
      separator: AtomicSeparatorComponent,
    };
    const rFnOld = rendererFn(setEditorState, getEditorState);
    const rFnNew = (contentBlock) => {
      const type = contentBlock.getType();
      switch(type) {
        case Block.ATOMIC:
          return {
            component: AtomicBlock,
            editable: false,
            props: {
              components: atomicRenderers,
            },
          };
        default: return rFnOld(contentBlock);
      }
    };
    return rFnNew;
  }
  keyBinding = (e) =>  {
    if (hasCommandModifier(e)) {
      if (e.which === 83) {  /* Key S */
        return 'editor-save';
      }
    }
    if (e.altKey === true) {
      if (e.shiftKey === true) {
        switch (e.which) {
          /* Alt + Shift + L */
          case 76: return 'load-saved-data';
          /* Key E */
          // case 69: return 'toggle-edit-mode';
        }
      }
      
      if (e.which === 72 /* Key H */) {
        return 'toggleinline:HIGHLIGHT';
      }
    }
    return keyBindingFn(e);
  }
  handleKeyCommand = (command) =>  {
    console.log('test commad key' , command)
    if (command === 'editor-save') {
      window.localStorage['editor'] = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
      // window.ga('send', 'event', 'draftjs', command);
      return true;
    } else if (command === 'load-saved-data') {
      this.loadSavedData();
      return true;
    } else if (command === 'toggle-edit-mode') {
      this.toggleEdit();
    }
    return false;
  }
  
  
  loadSavedData= () =>  {
    const data = window.localStorage.getItem('editor');
    if (data === null) {
      return;
    }
    try {
      const blockData = JSON.parse(data);
      console.log(blockData);
      this.onChange( EditorState.push(this.state.editorState, convertFromRaw(blockData)), this._editor.focus);
    } catch(e) {
      console.log(e);
    }
    // window.ga('send', 'event', 'draftjs', 'load-data', 'localstorage');
  }
  toggleEdit = () => {
    this.setState({
      editorEnabled: !this.state.editorEnabled
    }, () => {
      // window.ga('send', 'event', 'draftjs', 'toggle-edit', this.state.editorEnabled + '');
    });
  }
  handleDroppedFiles = (selection, files) =>  {
    // window.ga('send', 'event', 'draftjs', 'filesdropped', files.length + ' files');
    const file = files[0];
    if (file.type.indexOf('image/') === 0) {
      // eslint-disable-next-line no-undef
      const src = URL.createObjectURL(file);
      this.onChange(addNewBlockAt(
        this.state.editorState,
        selection.getAnchorKey(),
        Block.IMAGE, {
          src,
        }
      ));
      return HANDLED;
    }
    return NOT_HANDLED
  }
  handleReturn = (e) =>  {
    // const currentBlock = getCurrentBlock(this.state.editorState);
    // var text = currentBlock.getText();
    return NOT_HANDLED;
  }
  handleMouseDown = (event) => {
    // event.stopPropagation()
    console.log(event.target)
    if(event.target.tagName ==='IMG') {
      const {width , height , top , left}  = event.target.getBoundingClientRect()
      const view = event.target.ownerDocument.defaultView
      const scrollTop = view.scrollY
      const imgSrc = event.target.getAttribute('src')
      this.setState({imgSrc})
      this.refOverLay.style.width  = width + 'px'
      this.refOverLay.style.height  = height + 'px'
      this.refOverLay.style.top  = (top + scrollTop) + 'px'

      this.refOverLay.style.left  = (left ) + 'px'
      
      console.log('nguyen inh duc' , this.refOverLay)
    }
  }
   blockRendererFn = function(contentBlock) {
    const type = contentBlock.getType()
    switch (type) {
      default:
        return {component: <Line />, editable: true}
    }
  }
  refOverLay : any = React.createRef()
  render() {
    const { editorState, editorEnabled } = this.state;
    return (
      <EditerWrapper ref={this.wrapperEditer}  onMouseDownCapture = {this.handleMouseDown}>

      <OverLay  imgSrc={this.state.imgSrc} getRef ={ ( ref) => { this.refOverLay = ref }}  /> 
     
        <Editor
          ref={(e) => {this._editor = e;}}
          editorState={editorState}
          onChange={this.onChange}
          editorEnabled={editorEnabled}
          handleDroppedFiles={this.handleDroppedFiles}
          handleKeyCommand={this.handleKeyCommand}
          placeholder={this.state.placeholder}
          keyBindingFn={this.keyBinding}
          beforeInput={handleBeforeInput}
          handleReturn={this.handleReturn}
          sideButtons={this.sideButtons}
          rendererFn={this.rendererFn}
          blockRendererFn={this.blockRendererFn}
          customStyleMap={styleMap}
          orderedSet={OrderedSet}  
        >
        
          </Editor>
      </EditerWrapper>
    );
  }
};
class Line extends React.Component<any> {
  render () {
    const blockMap = this.props.contentState.getBlockMap().toArray()
    const blockKey = this.props.block.key
    const lineNumber = blockMap.findIndex(block => blockKey === block.key) + 1
    return <div style={{display: 'flex'}}>
      <span style={{marginRight: '5px'}}>{lineNumber}</span>
      <div style={{flex: '1'}}><EditorBlock {...this.props} /></div>
    </div>
  }
}
const EditerWrapper = styled.div`
`
const newBlockToHTML = (block) => {
  if (block.type === Block.ATOMIC) {
    if (block.text === 'E') {
      return {
        start: '<figure class="md-block-atomic md-block-atomic-embed">',
        end: '</figure>',
      };
    } else if (block.text === '-') {
      return <div className="md-block-atomic md-block-atomic-break"><hr/></div>;
    }
  }
  return blockToHTML(block);
};
const newEntityToHTML = (entity, originalText) => {
  if (entity.type === 'embed') {
    return (
      <div>
        <a
          className="embedly-card"
          href={entity.data.url}
          data-card-controls="0"
          data-card-theme="dark"
        >Embedded ― {entity.data.url}
        </a>
      </div>
    );
  }
  return entityToHTML(entity, originalText);
};
const newTypeMap = StringToTypeMap;
newTypeMap['2.'] = Block.OL;
const { hasCommandModifier } = KeyBindingUtil;
/*
A demo for example editor. (Feature not built into medium-draft as too specific.)
Convert quotes to curly quotes.
*/
const DQUOTE_START = '“';
const DQUOTE_END = '”';
const SQUOTE_START = '‘';
const SQUOTE_END = '’';
const handleBeforeInput = (editorState, str, onChange) => {
  if (str === '"' || str === '\'') {
    const currentBlock = getCurrentBlock(editorState);
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const text = currentBlock.getText();
    const len = text.length;
    if (selectionState.getAnchorOffset() === 0) {
      onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_START : SQUOTE_START)), 'transpose-characters'));
      return HANDLED;
    } else if (len > 0) {
      const lastChar = text[len - 1];
      if (lastChar !== ' ') {
        onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_END : SQUOTE_END)), 'transpose-characters'));
      } else {
        onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_START : SQUOTE_START)), 'transpose-characters'));
      }
      return HANDLED;
    }
  }
  return beforeInput(editorState, str, onChange, newTypeMap);
};
class SeparatorSideButton extends React.Component<any> {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    const entityKey = Entity.create('separator', 'IMMUTABLE', {});
    this.props.setEditorState(
      AtomicBlockUtils.insertAtomicBlock(
        this.props.getEditorState(),
        entityKey,
        '-'
      )
    );
    this.props.close();
  }
  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        title="Add a separator"
        onClick={this.onClick}
      >
        <i className="fa fa-minus" />
      </button>
    );
  }
}

interface EmbedSideButton {
  setEditorState: ( e  : any) => any 
  getEditorState: () => any 
  close: ( ) => any
}
class EmbedSideButton extends React.Component<EmbedSideButton> {x
  onClick = () =>  {
    const url = window.prompt('Enter a URL', 'https://www.youtube.com/watch?v=PMNFaAUs2mo');
    this.props.close();
    if (!url) {
      return;
    }
    this.addEmbedURL(url);
  }
  addEmbedURL = (url)  => {
    const entityKey = Entity.create('embed', 'IMMUTABLE', {url});
    this.props.setEditorState(
      AtomicBlockUtils.insertAtomicBlock(
        this.props.getEditorState(),
        entityKey,
        'E'
      )
    );
  }
  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        title="Add an Embed"
        onClick={this.onClick}
      >
        <i className="fa fa-code" />
      </button>
    );
  }
}
interface IAtomicEmbedComponent {
data : any
}
class AtomicEmbedComponent extends React.Component<IAtomicEmbedComponent> {
  state = {
    showIframe: false,
  };
  componentDidMount() {
    this.renderEmbedly();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.showIframe !== this.state.showIframe && this.state.showIframe === true) {
      this.renderEmbedly();
    }
  }
  getScript =  ()  => {
    const script = document.createElement('script')  as HTMLScriptElement
    script.async = true;
    script.src = '//cdn.embedly.com/widgets/platform.js';
    script.onload = () => {
      window.embedly();
    };
    document.body.appendChild(script);
  }
  renderEmbedly = () => {
    if (window.embedly) {
      window.embedly();
    } else {
      this.getScript();
    }
  }
  enablePreview = () =>  {
    this.setState({
      showIframe: true,
    });
  }
  render() {
    const { url } = this.props.data;
    const innerHTML = `<div><a class="embedly-card" href="${url}" data-card-controls="0" data-card-theme="dark">Embedded ― ${url}</a></div>`;
    return (
      <div className="md-block-atomic-embed">
        <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
      </div>
    );
  }
  /*render() {
    const { url } = this.props.data;
    const innerHTML = `<div><a class="embedly-card" href="${url}" data-card-controls="0" data-card-theme="dark">Embedded ― ${url}</a></div>`;
    return (
      <div className="md-block-atomic-embed">
        {this.state.showIframe ? <div dangerouslySetInnerHTML={{ __html: innerHTML }} /> : (
          <div>
            <p>Embedded URL - <a href={url} target="_blank">{url}</a></p>
            <button type="button" onClick={this.enablePreview}>Show Preview</button>
          </div>
        )}
      </div>
    );
  }*/
}
const AtomicSeparatorComponent = (props) => (
  <hr />
);
const AtomicBlock = (props) => {
  const { blockProps, block, contentState } = props;
  const entity = contentState.getEntity(block.getEntityAt(0));
  const data = entity.getData();
  const type = entity.getType();
  if (blockProps.components[type]) {
    const AtComponent = blockProps.components[type];
    return (
      <div className={`md-block-atomic-wrapper md-block-atomic-wrapper-${type}`}>
        <AtComponent data={data} />
      </div>
    );
  }
  return <p>Block of type <b>{type}</b> is not supported.</p>;
};
