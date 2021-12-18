const getData = () => {
  return fetch("https://test-129c8-default-rtdb.firebaseio.com/goods.json")
  .then(res => res.json());
};

export default getData;
