import React, { useState } from "react";
import Editor from "@react-page/editor";
import "@react-page/core/lib/index.css"; // we also want to load the stylesheets
// Require editor ui stylesheet
import "@react-page/ui/lib/index.css";
import contents from './content'
import "@react-page/plugins-slate/lib/index.css"; // Stylesheets for the rich text area plugin
import "@react-page/plugins-background/lib/index.css"; // Stylesheets for  background layout plugin
import {plugins} from './plugins'
import styled from "styled-components";
import { HTMLRenderer } from "@react-page/renderer";
import ReactDOMServer from 'react-dom/server';

const Editer = () => {
  const [editorValue, setEditorValue] = useState(contents[0]);
  return (
    <WrapperEditer id="get-html-to-page">
        <button onClick={() => {
            const html  = ReactDOMServer.renderToString(<HTMLRenderer state={editorValue} plugins={plugins} />)
            console.log({ok : html})
        }}>get html </button>
      <Editor plugins={plugins} value={editorValue} onChange={value => {
          console.log('valueeee',value)
          setEditorValue(value)
      }} />
    </WrapperEditer>
  );
};
const WrapperEditer = styled.div`
.ory-cell-focused {
box-shadow:  none;
}
`
export default Editer;