import {addNewBlock, Block, ImageSideButton} from 'medium-draft';
import * as React from 'react'
import articleContainer from '../../../Container/articleContainer';

export default class CustomImageSideButton extends ImageSideButton<any, { images: string[] }>{

    props: any;
    async onChange(e) {
        const file = e.target.files[0];
        if (file.type.indexOf('image/') === 0) {
            // This is a post request to server endpoint with image as `image`
            const formData = new FormData();
            formData.append('image', file);

              await fetch('/img', { // => localhost:3000/img  =>localhost:4000/img < == backend
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.status === 200) {
                    return response.json().then(({linkImage}  : {linkImage : string}) => {
                        if (linkImage) {
                            if(articleContainer.state.imageArticle === ''){
                                articleContainer.setState({ imageArticle : linkImage })
                            }
                            console.log("linkImage", linkImage);
                            this.props.setEditorState(addNewBlock(
                                this.props.getEditorState(),
                                Block.IMAGE, {
                                    src : linkImage
                                }
                            ));
                            this.props.close();
                        }
                    });
                }
            });
        }
        this.props.close();
    }
}
