import "./More.css";

function More(props) {
  const { setAmountShowCards, amountShowCards, addShowCards } = props;
  return (
    <section className="more">
      <button
        className="more__button link-opacity"
        onClick={() => {
          setAmountShowCards(amountShowCards + addShowCards);
        }}
      >
        <h2 className="more__link">Ещё</h2>
      </button>
    </section>
  );
}

export default More;
