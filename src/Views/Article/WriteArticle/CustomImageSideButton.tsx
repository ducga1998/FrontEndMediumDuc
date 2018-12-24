import { Block, ImageSideButton, addNewBlock } from 'medium-draft';
import * as React from 'react'
export default class CustomImageSideButton  extends ImageSideButton {
    props: any;
  /*
  We will only check for first file and also whether
  it is an image or not.
  */
  onChange(e) {
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === 0) {
      // This is a post request to server endpoint with image as `image`
      const formData = new FormData();
      formData.append('image', file);
  
      fetch('/img', {
        method: 'POST',
        body: formData,
      }).then((response) => {
          console.log('response.status',response.status)
        
        if (response.status === 200) {
            // console.log('json',response.json())
          // Assuming server responds with
          // `{ "url": "http://example-cdn.com/image.jpg"}`
          return response.json().then(data => {
            console.log('datadatadatadatadata',data)
            if (data.name) {
                console.log('data.url',data.name)
              this.props.setEditorState(addNewBlock(this.props.getEditorState(), Block.IMAGE, {
                src:    `http://localhost:4000/img/${data.name}`,
              }));
            }
          });
        }
      });
    }
    this.props.close();
  }
}