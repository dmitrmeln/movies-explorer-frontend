import MainContainer from "../MainContainer/MainContainer";

function AboutProject() {
  return (
    <section className="aboutproject">
      <MainContainer title="О проекте">
        <div className="aboutproject__text">
          <h3 className="aboutproject__paragraph-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutproject__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
          <h3 className="aboutproject__paragraph-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutproject__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className="aboutproject__time">
          <p className="aboutproject__time-text aboutproject__time-text_green">
            1 неделя
          </p>
          <p className="aboutproject__time-subtext">Back-end</p>
          <p className="aboutproject__time-text">4 недели</p>
          <p className="aboutproject__time-subtext">Front-end</p>
        </div>
      </MainContainer>
    </section>
  );
}

export default AboutProject;
