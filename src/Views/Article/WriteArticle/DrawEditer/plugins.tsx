import {Plugins} from '@react-page/core';
// The background plugin
import background, {ModeEnum} from '@react-page/plugins-background';
import '@react-page/plugins-background/lib/index.css';
// The native handler plugin
import native from '@react-page/plugins-default-native';
// The divider plugin
import divider from '@react-page/plugins-divider';
// The html5-video plugin
import html5video from '@react-page/plugins-html5-video';
import '@react-page/plugins-html5-video/lib/index.css';
// The image plugin
import {imagePlugin} from '@react-page/plugins-image';
import '@react-page/plugins-image/lib/index.css';
// The spacer plugin
import spacer from '@react-page/plugins-spacer';
import '@react-page/plugins-spacer/lib/index.css';
// The video plugin
import video from '@react-page/plugins-video';
import '@react-page/plugins-video/lib/index.css';
import {defaultSlate, reducedSlate} from './slate';
import {ImageUploadType} from '@react-page/ui/lib/ImageUpload/types';
import articleContainer from "../../../../Container/articleContainer";

const fakeImageUploadService: (url: string) => ImageUploadType = defaultUrl => (
    file,
    reportProgress
) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('image', file);

    fetch('/img', { // => localhost:3000/img  =>localhost:4000/img < == backend
      method: 'POST',
      body: formData,
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then(({linkImage}: { linkImage: string }) => {
          if (linkImage) {
            console.log("linkImage", linkImage)
            if (articleContainer.state.imageArticle === '') {
              articleContainer.setState({imageArticle: linkImage})
            }
            resolve({url: linkImage});
            reportProgress(100)
          }
        });
      }
    });


  });

  }
// Define which plugins we want to use.

  export const plugins: Plugins = {
    content: [
      defaultSlate,
      reducedSlate,
      spacer,
      imagePlugin({imageUpload: fakeImageUploadService('/images/react.png')}),
      video,
      divider,
      html5video,
    ],
    layout: [
      background({
        defaultPlugin: defaultSlate,
        imageUpload: fakeImageUploadService('/images/sea-bg.jpg'),
        enabledModes:
            ModeEnum.COLOR_MODE_FLAG |
            ModeEnum.IMAGE_MODE_FLAG |
            ModeEnum.GRADIENT_MODE_FLAG,
      }),

    ],

    // If you pass the native key the editor will be able to handle native drag and drop events (such as links, text, etc).
    // The native plugin will then be responsible to properly display the data which was dropped onto the editor.
    native,
};