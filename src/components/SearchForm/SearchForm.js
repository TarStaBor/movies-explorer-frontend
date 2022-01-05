import "./SearchForm.css";
import magnifier from "../../images/magnifier.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  const { handleFilter, setSearchValue, tumbler, setTumbler, arrayforSearch, searchValue } = props;

  function handleEdit(evt) {
    setSearchValue(evt.target.value);
  }

  return (
    <section className="searchForm">
      <div className="searchForm__box">
        <div className="searchForm__search-bar">
          <form
            className="searchForm__search-side"
            onSubmit={(evt) => {
              evt.preventDefault();
              handleFilter(arrayforSearch);
            }}
          >
            <img src={magnifier} className="searchForm__magnifier" alt="Изображение лупы"></img>
            <input
              className="searchForm__search-input"
              type="text"
              name="searchValue"
              value={searchValue}
              required
              placeholder="Фильм"
              onChange={handleEdit}
            ></input>
            <button className="searchForm__findArrow link-opacity" type="submit"></button>
          </form>
          <div className="searchForm__format-side">
            <FilterCheckbox tumbler={tumbler} setTumbler={setTumbler} />
            <h2 className="searchForm__format-title">Короткометражки</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
