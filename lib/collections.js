Styleguides = new Mongo.Collection('styleguides');
Patterns = new Mongo.Collection('patterns');
Comments = new Mongo.Collection('comments');

/*
styleguide = {
  name: String,
  created_by: String,
  created_at: Number,
  stylesheet: String
}

pattern = {
  name: String,
  description: String,
  markup: String,
  attachment: String,
  created_at: Number,
  created_by: String,
  styleguide: String
}

comments = {
  pattern: String,
  created_at: Number,
  commenter: String,
  text: String
}
*/
