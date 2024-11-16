import { useDispatch } from "react-redux";
import "./CommentCard.scss";
import { MdClose } from "react-icons/md";
import {
  deleteComment,
  fetchAllComments,
} from "../../../redux/actions/comment/commentAction";

const CommentCard = ({ data }) => {
  const dispatch = useDispatch();

  const {
    email,
    message,
    userDetails: {
      firstName,
      lastName,
      image,
      phone,
      street,
      zipCode,
      city,
      state,
      country,
      maritalStatus,
      monthlyContributions,
      services,
      comments,
      role,
    } = {},
  } = data || {};

  // Handle delete comment
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete this comment?`)) {
      await dispatch(deleteComment(data._id));
      dispatch(fetchAllComments());
    }
  };

  return (
    <section className="comment-card-container">
      <MdClose
        title="Delete Comment"
        onClick={handleDelete}
        className="delete-single-comment"
      />

      <h3 className="comment-card-title">
        {firstName} {lastName}
      </h3>
      
      <div className="commenter-information-wrapper">
        <figure className="user-photo-container">
          <img className="user-photo" src={image} alt={firstName} />
          <figcaption className="user-figcaption"> {phone}</figcaption>
        </figure>

        <div className="commenter-address--status-wrapper">
          <aside className="aside-box">
            <h4 className="aside-box-title">User Address</h4>

            <p className="aside-element">
              <strong className="strong-element">Street:</strong>{" "}
              <span className="span-element">{street} </span>
            </p>

            <p className="aside-element">
              <strong className="strong-element">Zip Code:</strong>{" "}
              <span className="span-element">{zipCode}</span>
            </p>

            <p className="aside-element">
              <strong className="strong-element">City:</strong>{" "}
              <span className="span-element">{city}</span>
            </p>

            <p className="aside-element">
              <strong className="strong-element">State:</strong>{" "}
              <span className="span-element">{state}</span>
            </p>

            <p className="aside-element">
              <strong className="strong-element">Country:</strong>{" "}
              <span className="span-element">{country}</span>
            </p>
          </aside>

          <aside className="aside-box">
            <h4 className="aside-box-title">User Status</h4>

            <p className="aside-element">
              <strong className="strong-element">Marital Status:</strong>{" "}
              <span className="span-element">{maritalStatus} </span>
            </p>

            <p className="aside-element">
              <strong className="strong-element">Contribution:</strong>{" "}
              <span className="span-element">
                {monthlyContributions?.length}
              </span>
            </p>

            <p className="aside-element">
              <strong className="strong-element">Services:</strong>{" "}
              <span className="span-element">{services?.length}</span>
            </p>

            <p className="aside-element">
              <strong className="strong-element">Comments:</strong>{" "}
              <span className="span-element">{comments?.length}</span>
            </p>

            <p className="aside-element">
              <strong className="strong-element">Role:</strong>{" "}
              <span className="span-element">{role}</span>
            </p>
          </aside>
        </div>
      </div>

      <p className="user-comment"> {message} </p>

      <button className="comment-reply-btn">
        <a
          href={`mailto:${email}?subject=Inquiry%20from%20${firstName}%20${lastName}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Send an email to ${firstName} ${lastName}`}
          title={`Send an email to ${firstName} ${lastName}`}
          className="comment-reply-link"
        >
          Contact via Email
        </a>
      </button>
    </section>
  );
};

export default CommentCard;
