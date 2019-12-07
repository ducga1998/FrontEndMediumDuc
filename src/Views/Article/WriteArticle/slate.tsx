import slate from '@react-page/plugins-slate';
import '@react-page/plugins-slate/lib/index.css';

export const defaultSlate = slate(def => ({
  ...def,
  plugins: {
    ...def.plugins,
  },
}));

// if you want to use a plugin twice with a differnet config, you have to give it another name
export const reducedSlate = slate(def => ({
  ...def,
  name: def.name + '/reduced', // give it some other name
  hideInMenu: true, // don't show in insert menu, we only use it as intial children
  plugins: {
    headings: {
      h2: def.plugins.headings.h2,
      h3: def.plugins.headings.h3,
    },
    paragraphs: def.plugins.paragraphs,
    emphasize: def.plugins.emphasize,
  }
}));