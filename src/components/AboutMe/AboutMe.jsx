import aboutMePhoto from "../../images/aboutme-photo.jpg";
import MainContainer from "../MainContainer/MainContainer";

function AboutMe() {
  return (
    <section className="aboutme">
      <MainContainer title="Студент">
        <div className="aboutme__container">
          <div className="aboutme__text-container">
            <h3 className="aboutme__name">Дмитрий</h3>
            <p className="aboutme__occupation">Веб-разработчик, 29 лет</p>
            <p className="aboutme__bio">
              Я родился в Хабаровске, сейчас живу в Москве. По образованию
              инженер-строитель. С недавнего
              времени серьёзно увлёкся программированием, а именно
              веб-разработкой. В 2024 успешно завершил 10-ти месячный курс по
              веб-разработке от Яндекса. Теперь планирую работать и развиваться
              в данной сфере.
            </p>
            <a
              className="aboutme__link"
              href="https://github.com/dmitrmeln"
              target="_blank"
              rel="noopener noreferrer">
              Github
            </a>
          </div>
          <img
            className="aboutme__photo"
            src={aboutMePhoto}
            alt="фото"></img>
        </div>
      </MainContainer>
    </section>
  );
}

export default AboutMe;
