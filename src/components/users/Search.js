import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from 'context/github/githubContext';

const Search = ({ showAlert }) => {
  const githubContext = useContext(GithubContext);

  const [text, setText] = useState('');
  /* On Submit - trigger searchUsers */
  const onSubmit = e => {
    e.preventDefault();
    if (!text.length) return showAlert('Please enter something', 'light');
    githubContext.searchUsers(text);
    setText('');
  };
  const onChange = e => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {!!githubContext.users.length && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUser}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  showAlert: PropTypes.func.isRequired,
};

export default Search;
