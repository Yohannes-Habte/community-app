import { useDispatch, useSelector } from "react-redux";
import CommentCard from "../../contact/commentCard/CommentCard";
import "./AllComments.scss";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import { fetchAllComments } from "../../../redux/actions/comment/commentAction";
import { clearCommentErrors } from "../../../redux/reducers/comment/commentReducer";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import { MdClose } from "react-icons/md";

const AllComments = () => {
  const dispatch = useDispatch();
  const { loading, error, comments } = useSelector((state) => state.comment);

  const [searchTerm, setSearchTerm] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    if (searchTerm === "") {
      dispatch(fetchAllComments());
    } else if (shouldSearch) {
      dispatch(fetchAllComments(searchTerm));
      setShouldSearch(false);
    }

    // Cleanup
    return () => {
      dispatch(clearCommentErrors());
    };
  }, [dispatch, searchTerm, shouldSearch]);

  // Handle change in the search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle clear search input
  const handleClearSearch = () => {
    setSearchTerm("");
    setShouldSearch(false); // Ensure search is reset
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShouldSearch(true); // Trigger search when button is clicked
  };

  // If there are no comments, display a friendly message when search is performed
  const noCommentsMessage =
    comments.length === 0 && searchTerm !== "" ? (
      <Alert severity="info">
        Sorry, no comments on your search. Please try again!
      </Alert>
    ) : null;

  return (
    <article className="all-comment-container">
      <h1 className="all-comment-title">Customer Reviews</h1>

      <form onSubmit={handleSearchSubmit} className="search-comment-form">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          aria-label="Search by first name, last name, or email"
          className="search-input"
        />
        <button className="search-comment-btn" type="submit">
          Search
        </button>

        {/* Close button (X) to clear search */}
        {searchTerm.length > 0 && (
          <MdClose
            onClick={handleClearSearch}
            title="Delete Text Search"
            className="delete-search-text"
          />
        )}
      </form>

      {noCommentsMessage}

      {loading ? (
        <PageLoader isLoading={loading} />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : comments.length === 0 ? (
        <Alert security="info"> No comments available </Alert>
      ) : (
        <div className="comment-card-box">
          {comments.map((comment) => (
            <CommentCard key={comment._id} data={comment} />
          ))}
        </div>
      )}
    </article>
  );
};

export default AllComments;
