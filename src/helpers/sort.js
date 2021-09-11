const sortName = (items) => {

  return items.sort((a, b) => {
    var nameA = a.displayName?.toUpperCase();
    var nameB = b.displayName?.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}



export default sortName;