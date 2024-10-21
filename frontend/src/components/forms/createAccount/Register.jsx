import SignUpForm from "../registerForm/SignUpForm";
import "./Register.scss";

const Register = ({ onSignUp, open, setOpen }) => {
  return (
    <>
      {open && (
        <article className="modal">
          <section className="register-popup-box">
            <span
              className="close-popup-box"
              onClick={() => setOpen(false)}
              aria-label="Close registration modal"
              role="button"
              tabIndex="0" // Make it focusable for keyboard accessibility
              onKeyDown={(e) => e.key === "Enter" && setOpen(false)} // Handle keyboard enter
            >
              X
            </span>

            <h2 className="register-title">Create an Account</h2>

            <SignUpForm />
          </section>
        </article>
      )}

      {onSignUp && <SignUpForm onSignUp={onSignUp} />}
    </>
  );
};

export default Register;
