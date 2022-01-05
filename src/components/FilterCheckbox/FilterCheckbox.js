import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  const { tumbler, setTumbler } = props;
  function changeTumbler() {
    setTumbler(tumbler ? false : true);
  }

  return (
    <input
      type="checkbox"
      checked={tumbler}
      onClick={changeTumbler}
      className="filterCheckbox__tumbler link-opacity"
    ></input>
  );
}

export default FilterCheckbox;
