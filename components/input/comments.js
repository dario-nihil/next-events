import { useState, useEffect, useContext } from "react";

import NotificationContext from "../../store/notification-context";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import styles from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;
  console.log("eventId: " + eventId);
  const ctx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    ctx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then(() =>
        ctx.showNotification({
          title: "Success!",
          message: "Your comment was saved!!",
          status: "success",
        })
      )
      .catch((error) =>
        ctx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong",
          status: "error",
        })
      );
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
