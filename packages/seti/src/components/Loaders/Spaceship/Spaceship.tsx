import * as css from "./Spaceship.styled";

const Spaceship = () => {
  return (
    <css.Container>
      <css.Ship />
      <css.Copy>Preparing to land...</css.Copy>
    </css.Container>
  );
};

export default Spaceship;
