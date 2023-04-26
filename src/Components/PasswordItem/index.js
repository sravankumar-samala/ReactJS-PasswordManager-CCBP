import './index.css'

const PasswordItem = props => {
  const {passwordObject, onDelete, showPassword} = props
  const {website, userName, password, id, bgColor} = passwordObject
  const profileLetter = website.charAt(0).toUpperCase()

  const starsImageUrl =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png '

  return (
    <li className="password-item">
      <div className={`profile-letter ${bgColor}`}>{profileLetter}</div>
      <div className="password-item-details">
        <p>{website}</p>
        <p>{userName}</p>
        {showPassword ? (
          <p>{password}</p>
        ) : (
          <img src={starsImageUrl} alt="stars" />
        )}
      </div>
      <button
        type="button"
        className="del-btn"
        data-testid="delete"
        onClick={() => onDelete(id)}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          alt="delete"
          onClick={() => onDelete(id)}
        />
      </button>
    </li>
  )
}
export default PasswordItem
