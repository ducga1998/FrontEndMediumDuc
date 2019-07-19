import { Block, ImageSideButton, addNewBlock } from 'medium-draft';
import * as React from 'react'
import articleContainer from '../../../Container/articleContainer';
import { LINK_DEVELOPMENT } from 'src/help/help';
export default class CustomImageSideButton extends ImageSideButton<any, { images: string[] }>{

  props: any;
  onChange(e) {
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === 0) {
      // This is a post request to server endpoint with image as `image`
      // const formData = new FormData();
      // formData.append('image', file);

      // fetch('/img', { // => localhost:3000/img  =>localhost:4000/img < == backend 
      //   method: 'POST',
      //   body: formData,
      // }).then((response) => {
      //   if (response.status === 200) {
      //     return response.json().then(({name}  : {name : string}) => {
      //       if (name) {
      //         if(articleContainer.state.imageArticle === ''){
      //           articleContainer.setState({ imageArticle : name })
      //         }

      //         this.props.setEditorState(addNewBlock(this.props.getEditorState(), Block.IMAGE, {
      //           src: `${LINK_DEVELOPMENT}/img/${name}`,
      //         }));
      //       }
      //     });
      //   }
      // });
    }
    this.props.close();
  }
}