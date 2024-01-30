import MainContainer from "../MainContainer/MainContainer";

function Techs() {
  return (
    <section className="techs">
      <MainContainer title="Технологии">
        <div className="techs__text-container">
          <h3 className="techs__text-title">7 технологий</h3>
          <p className="techs__text-subtitle">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </div>
        <ul className="techs__grid-items">
          <li className="techs__grid-item">HTML</li>
          <li className="techs__grid-item">CSS</li>
          <li className="techs__grid-item">JS</li>
          <li className="techs__grid-item">React</li>
          <li className="techs__grid-item">Git</li>
          <li className="techs__grid-item">Express.js</li>
          <li className="techs__grid-item">mongoDB</li>
        </ul>
      </MainContainer>
    </section>
  );
}

export default Techs;
