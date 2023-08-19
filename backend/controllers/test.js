let list = {
  ans: { price: 2300, value: true },
  ds: { price: 9023423400, value: false },
  adsdns: { price: 1233200, value: true },
};

for (const key in list) {
  if (list[key].value === true) console.log(list[key].price);
}
