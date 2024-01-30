import promoLogo from "../../images/promo-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <div className="promo__logo-container">
        <img className="promo__logo" src={promoLogo} alt="логотип баннера"></img>
      </div>
    </section>
  );
}

export default Promo;
