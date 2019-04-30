
import * as  React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { createLocation } from 'history';

export default withRouter(
 ({ staticContext, history, location, match ,  ...rest }: any) => {
  const {TypeDom}  =  rest
  return <Link
      {...rest}
      onClick={evt => {
        if (rest.onClick) rest.onClick(evt);
        if (evt.metaKey || evt.ctrlKey) return;
        if (window.appUpdateAvailable === true) {
          evt.preventDefault();
          const location =
            typeof rest.to === 'string'
              ? createLocation(rest.to, null, history.location)
              : rest.to;
          return (window.location = history.createHref(location));
        }
      }}
    />
}
)