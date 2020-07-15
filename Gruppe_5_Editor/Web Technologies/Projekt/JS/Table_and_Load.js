function createTable(o) {

  class Table {

    constructor(Tablename) {
      this.tablename = Tablename;
    }

    toString() {
      return this.tablename;
    }
  }

  tablename = new Table(
    grName
  )

  const options = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(table)
  };

  fetch("/createTable", options)
  .then(response => response.json())
  .then(data => {

    if (data.register === ""){

    } else {
      alert(data.register);
      location.reload();
    }
  });

}