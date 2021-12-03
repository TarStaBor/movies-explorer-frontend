import "./SearchForm.css";
import magnifier from "../../images/magnifier.svg";

import findArrow from "../../images/find-arrow.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  const { handlePreloader } = props;

  return (
    <section className="searchForm">
      <div className="searchForm__box">
        <div className="searchForm__search-bar">
          <div className="searchForm__search-side">
            <img src={magnifier} className="searchForm__magnifier" alt="Изображение лупы"></img>
            <input className="searchForm__search-input" required placeholder="Фильм"></input>
            <img
              src={findArrow}
              className="searchForm__findArrow link-opacity"
              onClick={handlePreloader}
              alt="Кнопка поиска"
            ></img>
          </div>
          <div className="searchForm__format-side">
            <FilterCheckbox />
            <h2 className="searchForm__format-title">Короткометражки</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
