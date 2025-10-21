import "./Error.css";

export const Error = ({ message = "something went wrong" }) => {
  return (
    <div className="error">
      <div>Error</div>
      <div className="error-message">{message}</div>
    </div>
  );
};
