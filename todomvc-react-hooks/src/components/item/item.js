import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './itemStyle.css';

export function Item({ todo, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(todo.name);

  const handleEdit = () => setEditing(true);
  const handleCompleted = () => {
    onUpdate({
      id: todo.id,
      completed: !todo.completed,
      elapsed: (new Date() - todo.created)
    });
  };

  const handleRemove = () => onRemove(todo.id);

  const handleChange = event => setName(event.target.value);

  const handleBlur = () => {
    onUpdate({
      id: todo.id,
      name,
    });
    setEditing(false);
  };

  const { completed } = todo;

  // time tracking
  const timeTracking = (time) => {
    if (time){
      let seconds = (time / 1000).toFixed(0); // get seconds
      let minutes = Math.floor(seconds / 60); // function returns the largest integer less than or equal to a given number.
      let hours = "";

      if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
      }
      seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds: "0" + seconds;
      if (hours !== "") {
        return "elapsed time " + hours + ":" + minutes + ":" + seconds;
      }
      return "elapsed time " + minutes + ":" + seconds;
    }
    return ''
  }

  return (
    <li className={classNames({ completed, editing })} data-testid="todo-item">
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={handleCompleted} />
        <label>
          {todo.name}
          <p style={{ fontSize: '0.5em'}} >{timeTracking(todo.elapsed ? todo.elapsed : '')}</p>
        </label>
        <button className="ediButton" onClick={handleEdit} data-testid="todo-name"/>
        <button className="destroy" onClick={handleRemove} data-testid="todo-remove" />
      </div>
      {editing && (
          <input className="edit" value={name} onInput={handleChange} onBlur={handleBlur} onChange={() => {}} />
        )}
    </li>
  );
}

Item.propTypes = {
  todo: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};
