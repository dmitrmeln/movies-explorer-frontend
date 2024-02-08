import Auth from "../Auth/Auth";

export default function Register(props) {
  function handleSubmit({name, email, password}) {
    props.onSubmit({name, email, password})
  }

  return (
    <Auth
      heading="Добро пожаловать!"
      submitButtonName="Зарегистрироваться"
      bottomText="Уже зарегистрированы?"
      bottomLink="Войти"
      linkTo="/signin"
      onSubmit={handleSubmit}
      errorMessage={props.errorMessage}
    />
  );
}
