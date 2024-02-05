import { FormAddItem } from "../FormAddItem/FormAddItem";
import { Logo } from "../Logo/Logo";

export const Header = ({ setNeedsReload }) => {
  return (
    <header>
      <Logo />
      <FormAddItem setNeedsReload={setNeedsReload} />
    </header>
  );
};
