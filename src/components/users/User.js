import React, { Component } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propType = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gist,
      hireable,
      company,
    } = this.props.user;

    const { loading, repos } = this.props;

    if (loading) return <Spinner />;
    return (
      <>
        <Link to='/' className='btn btn-light'>
          Back to search
        </Link>
        Hierable:{' '}
        {hireable ? (
          <i className='fas fa-check text-success'></i>
        ) : (
          <i className='fas fa-times-circle text-danger'></i>
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              alt='profile_picture'
              className='round-img'
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <>
                <h3>Bio</h3>
                <p>{bio}</p>
              </>
            )}
            <a
              href={html_url}
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-dark my-1'>
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <>
                    <strong>Username: </strong> {login}
                  </>
                )}
              </li>
              <li>
                {company && (
                  <>
                    <strong>Company: </strong> {company}
                  </>
                )}
              </li>
              <li>
                {blog && (
                  <>
                    <strong>Website: </strong> {blog}
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers || 0}</div>
          <div className='badge badge-success'>Following: {following || 0}</div>
          <div className='badge badge-light'>
            Public Repos: {public_repos || 0}
          </div>
          <div className='badge badge-dark'>
            {' '}
            Public Gists: {public_gist || 0}
          </div>
        </div>
        <Repos repos={repos} />
      </>
    );
  }
}

export default User;