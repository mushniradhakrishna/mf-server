import { mount } from "authentication/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn, pin }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn,
      pin: pin,
    });

    history.listen(onParentNavigate);
  }, [pin]);

  return <div ref={ref} />;
};
