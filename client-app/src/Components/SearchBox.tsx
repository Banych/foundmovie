import { observer } from "mobx-react-lite";
import { FormEvent, Fragment, useContext } from "react";
import { Icon, Input } from "semantic-ui-react";
import MoviesStore from "../stores/store.Movie";

const SearchBox = () => {
  const moviesStore = useContext(MoviesStore);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.currentTarget;
    moviesStore.setSearchQuery(value);
  };

  return (
    <Fragment>
      <Input
        placeholder="Search..."
        onChange={handleInputChange}
        action={{
          type: "submit",
          content: <Icon name="search" />,
          onClick: () => moviesStore.searchMovies(),
        }}
      />
    </Fragment>
  );
};

export default observer(SearchBox);
