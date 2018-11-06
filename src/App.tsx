import * as React from 'react';
import Layout from './Component/Layout';
import { Grid, Row, Col } from 'react-bootstrap';
import Footer from './Component/footer'
import Article from './Component/Article';
import UIForm from './UI/UIField'
class App extends React.Component {
  public render() {
    return <Layout>
      <Article totalClap={10} totalComment={90909} hashTag={[{ name: "javascript" }, { name: "typescript" }]} titleArticle="titlte" time="123" avatar="https://webpack.js.org/e0b5805d423a4ec9473ee315250968b2.svg" content="caslcascnaskncjasnjkcnasjkcnjkasncjas" />
      <UIForm />
    </Layout>
  }
}
export default App;
