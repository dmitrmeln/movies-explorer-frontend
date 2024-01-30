import Auth from "../Auth/Auth";

export default function Register(props) {
  function handleSubmit(evt) {
    evt.preventDefault();

    // props
    //   .onSubmit({
    //     email,
    //     name,
    //     password
    //   })
    //   .then(() => {
    //     setEmail("");
    //     setName("");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
  }

  return (
    <Auth
      heading="Рады видеть!"
      submitButtonName="Войти"
      bottomText="Ещё не зарегистрированы?"
      bottomLink="Регистрация"
      linkTo="/signup"
      handleSubmit={handleSubmit}
    />
  );
}
