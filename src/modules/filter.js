import getData from "./getData";
import renderGoods from "./renderGoods";
import { priceFilter, hotSaleFilter } from "./filters";

const filter =() => {

  const minInput = document.getElementById('min'),
        maxInput = document.getElementById('max'),
        checkboxInput = document.getElementById('discount-checkbox'),
        checkboxSpan = document.querySelector('.filter-check_checkmark');

  minInput.addEventListener('input', () => {
    getData().then(data => {
    renderGoods(priceFilter(hotSaleFilter(data, checkboxInput.checked), minInput.value, maxInput.value));
    });
  });

  maxInput.addEventListener('input', () => {
    getData().then(data => {
    renderGoods(priceFilter(hotSaleFilter(data, checkboxInput.checked), minInput.value, maxInput.value));
    });
  });

  checkboxInput.addEventListener('change', () => {
    if (checkboxInput.checked) {
      checkboxSpan.classList.add('checked');
    } else {
      checkboxSpan.classList.remove('checked');
    }
    getData().then(data => {
      renderGoods(priceFilter(hotSaleFilter(data, checkboxInput.checked), minInput.value, maxInput.value));
    });
  });

};

export default filter;