function getLiData() {

}

function createTable(tablename) {

  class Table {
    constructor(Tablename) {
      this.tablename = Tablename;
    }

    toString() {
      return this.tablename;
    }
  }

  table = new Table(
      tablename
  );

  console.log(table);

  const options = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(table)
  };

  fetch("/createTable", options);
}

function loadTable() {

}