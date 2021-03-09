import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Todo = ({id, title}) => {

  return <div>
    {title}
  </div>
};

Todo.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
};

export default Todo;
