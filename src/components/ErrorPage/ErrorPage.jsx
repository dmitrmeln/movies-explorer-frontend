import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  function handleBackBtnClick() {
    navigate(-1, { replace: true })
  }

  return (
    <section className="error-page">
      <h1 className="error-page__heading">404</h1>
      <p className="error-page__text">Страница не найдена</p>
      <button onClick={handleBackBtnClick} className="error-page__link">Назад</button>
    </section>
  );
}
