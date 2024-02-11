function MainContainer(props) {
  return (
    <div
      className={
        props.title === "Студент"
          ? "main-container main-container__aboutme"
          : "main-container"
      }
    >
      <h2 className="main-container__title">{props.title}</h2>
      {props.children}
    </div>
  );
}

export default MainContainer;
