let list = [
  { roomid: 'djksk', roomNumbers: [1, 2, 3] },
  { roomid: 'djksk', roomNumbers: [6, 7, 5] },
];

let ds = list.map((item) => item.roomNumbers.map((item) => item));
console.log(ds.toString());
