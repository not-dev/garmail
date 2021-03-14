var maxSpeed = {
  car: { s: 300 },
  bike: { s: 60 },
  motorbike: { s: 200 }
};

const sortable = Object.entries(maxSpeed)

sortable.sort((a, b) => {
  return (a[0] < b[0]) ? -1 : 1;
});

console.log(sortable)
