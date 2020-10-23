import React, { useState, useEffect } from "react";

const Loader = (props) => {
  const [show, setShow] = useState(true);
  const abortController = new AbortController();
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 1000);
    return function cleanup() {
      abortController.abort();
  }
  }, [show]);

  return (
    <div className={`loader-wrapper ${show ? "" : "loderhide"}`}>
      <div className="typewriter">
        <h1>New Era Admin Loading..</h1>
      </div>
    </div>
  );
};

export default Loader;
