import Auth from "../Auth/Auth";

export default function Register(props) {
  function handleSubmit({email, password}) {
    props.onSubmit({email, password})
  }

  return (
    <Auth
      heading="Рады видеть!"
      submitButtonName="Войти"
      bottomText="Ещё не зарегистрированы?"
      bottomLink="Регистрация"
      linkTo="/signup"
      onSubmit={handleSubmit}
      errorMessage={props.errorMessage}
    />
  );
}
