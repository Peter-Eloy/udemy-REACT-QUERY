import { useQuery } from "@tanstack/react-query";

import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation }) {
  // replace with useQuery
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchComments(post.id),
    staleTime: 2000,
  });

  if (isLoading) {
    return <h3>..is Loading</h3>;
  }

  if (isError) {
    return (
      <>
        <h3>..is Error</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>
        Delete
      </button>{" "}
      <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
