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
      heading="Добро пожаловать!"
      submitButtonName="Зарегистрироваться"
      bottomText="Уже зарегистрированы?"
      bottomLink="Войти"
      linkTo="/signin"
      handleSubmit={handleSubmit}
    />
  );
}
