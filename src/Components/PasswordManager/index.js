import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
// import PasswordItem from '../PasswordItem'

import './index.css'
import PasswordItem from '../PasswordItem'

const colorsList = [
  'gray-blue-d',
  'blue',
  'gray-d',
  'gray-l',
  'blue-ll',
  'yellow-l',
  'green-l',
  'orange-l',
  'cyan-l',
  'red-d',
]

const NoPasswords = () => (
  <div className="display-empty-list-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
      alt="no passwords"
    />
    <p>No Passwords</p>
  </div>
)

export default class PasswordManager extends Component {
  state = {
    website: '',
    userName: '',
    password: '',
    searchValue: '',
    passwordsList: [],
    showPassword: false,
  }

  formSubmit = e => {
    e.preventDefault()

    const {website, userName, password} = this.state
    const bgColor = colorsList[Math.floor(Math.random() * colorsList.length)]

    const newPasswordItem = {
      id: uuidV4(),
      website,
      userName,
      password,
      bgColor,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordItem],
      website: '',
      userName: '',
      password: '',
    }))

    console.log('form submitted')
  }

  filterPasswordsList = () => {
    const {passwordsList, searchValue} = this.state
    const filteredList = passwordsList.filter(eachPasswordItem =>
      eachPasswordItem.website.toLowerCase().includes(searchValue),
    )
    return filteredList
  }

  onDelete = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  render() {
    const {
      website,
      userName,
      password,
      searchValue,
      passwordsList,
      showPassword,
    } = this.state
    const filteredPasswordsList = this.filterPasswordsList()
    const passwordManagerImage =
      window.innerWidth >= 576
        ? 'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png '
        : 'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png '

    return (
      <div className="container">
        <div className="main-container">
          <header>
            <div className="logo-div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
                alt="app logo"
              />
            </div>
          </header>
          <div className="passwords-form-container">
            {/* form starts here  */}
            <form className="form" onSubmit={this.formSubmit}>
              <h2>Add New Password</h2>
              <div className="input-container">
                <div className="input-icon-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Website"
                  onChange={e => this.setState({website: e.target.value})}
                  value={website}
                />
              </div>
              <div className="input-container">
                <div className="input-icon-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                    alt="username"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  onChange={e => this.setState({userName: e.target.value})}
                  value={userName}
                />
              </div>
              <div className="input-container">
                <div className="input-icon-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={e => this.setState({password: e.target.value})}
                  value={password}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <div className="password-manager-header-img">
              <img src={passwordManagerImage} alt="password manager" />
            </div>
          </div>

          {/* Passwords list container starts here */}
          <div className="passwords-items-container">
            <div className="password-items-header">
              <div className="header-title">
                <h1>Your Passwords</h1>
                <p className="passwords-count">{passwordsList.length}</p>
              </div>
              <div className="input-container">
                <div className="input-icon-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                    alt="search"
                  />
                </div>
                <input
                  type="search"
                  onChange={e =>
                    this.setState({searchValue: e.target.value.toLowerCase()})
                  }
                  placeholder="Search Passwords"
                  value={searchValue}
                />
              </div>
            </div>
            <div className="show-passwords-container">
              <input
                type="checkbox"
                id="show-passwords"
                onChange={() =>
                  this.setState(prevState => ({
                    showPassword: !prevState.showPassword,
                  }))
                }
              />
              <label htmlFor="show-passwords">Show Passwords</label>
            </div>
            <ul className="passwords-list">
              {filteredPasswordsList.length !== 0 ? (
                filteredPasswordsList.map(eachItem => (
                  <PasswordItem
                    key={eachItem.id}
                    passwordObject={eachItem}
                    onDelete={this.onDelete}
                    showPassword={showPassword}
                  />
                ))
              ) : (
                <NoPasswords />
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
