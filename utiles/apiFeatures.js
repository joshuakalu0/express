module.exports = class ApiFeatures {
  constructor(query, reqQuery) {
    this.query = query;
    this.reqQuery = reqQuery;
  }
  sort() {
    if (this.reqQuery.sort) {
      const sortBy = this.reqQuery.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  pagination() {
    const page = this.reqQuery.page * 1 || 1;
    const limit = this.reqQuery.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  field() {
    if (this.reqQuery.fields) {
      const field = this.reqQuery.fields.split(",").join(" ");
      this.query = this.query.select(field);
    } else {
      this.query = this.query.select("-createAt");
    }
    return this;
  }

  filter() {
    let queryObj = { ...this.reqQuery };
    const exlud_fields = ["sort", "limit", "page", "fields", "searchBy"];
    exlud_fields.forEach((ev) => delete queryObj[ev]);
    console.log(queryObj);
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(lte|gte|lt|gt)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  regx() {
    if (this.reqQuery.searchBy) {
      // console.log(this.reqQuery.searchBy, "search");
      const [field, word] = this.reqQuery.searchBy.split(",");
      const reg = new RegExp(word, "i");
      const queryStr = {
        [field]: reg,
      };
      this.query = this.query.find(queryStr);
    }
    return this;
  }
};
