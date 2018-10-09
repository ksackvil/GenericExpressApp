class EndpointHandler {

  constructor(db) {
    this.db = db;
  }

  logger(req) {
    console.log(`${req.method} => ${req.path}`);
  }

  async get(req, res) {
    let id = req.params.id;
    let key = req.params.key;
    let resp = null;
    let message = "";
    let code = 200;

    if (id) {
      resp = await this.db.findObject('_id', id);
      message = "successfully got object";

      if(key) {
        resp = resp[key];
        message = "successfully got object key";
      }
    }
    else {
      resp = await this.db.getCollection();
      message = "successfully got collection";
    }

    this.logger(req);
    res.json({code:200, message: message, body: resp});
  }

  async post(req, res) {
    let id = req.params.id;
    let body = req.body;
    let resp = "";

    if (id) {
      resp = await this.db.updateObject(id, body);
    }
    else {
      resp = await this.db.addObject(body)
    }

    this.logger(req)
    res.json({code: 200, message: "successfully posted object", body: res})
  }

  async delete(req, res) {
    let id = req.params.id;
    let resp = "";;

    if (id) {
      resp = await this.db.deleteObject(id);
    }
    else{
      resp = {code:400, message: "bad request, must include valid id as param."};
    }

    this.logger(req);
    res.json({code: 200, message: "successfully deleted object", body:res});
  }
};

module.exports = EndpointHandler;
