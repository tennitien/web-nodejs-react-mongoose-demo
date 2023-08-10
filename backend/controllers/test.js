let ds = [
  { type: 'hotel', count: 4 },
  { type: 'apartments', count: 0 },
  { type: 'resorts', count: 0 },
  { type: 'villas', count: 0 },
  { type: 'cabins', count: 0 },
];

let  title=[]

let list = ds.map((item, i) => ({ ...item, title: title[i] }));
console.log(list);
