import SignUpForm from "../registerForm/SignUpForm";
import "./Register.scss";

const Register = ({ signUp, openAddUser, setOpenAddUser }) => {
  return (
    <>
      {openAddUser && (
        <article className="modal">
          <section className="register-popup-box">
            <span
              className="close-popup-box"
              onClick={() => setOpenAddUser(false)}
            >
              X
            </span>

            <h2 className="register-title">Create an Account</h2>

            <SignUpForm />
          </section>
        </article>
      )}

      {signUp && <SignUpForm signUp={signUp} />}
    </>
  );
};

export default Register;
