import * as css from "./Alien.styled";
import IconAlienLoading from "ui/components/Icons/AlienLoading";

const Alien = () => {
  return (
    <css.Container>
      <IconAlienLoading />
      <css.Copy>Searching...</css.Copy>
    </css.Container>
  );
};

export default Alien;
