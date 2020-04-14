
exports.up = function(knex) {
    return knex.schema.createTable("clucks", table => {
        table.increments("id"); // creats an autoincrement column named id ("id", SERIAL)
        table.string("username"); // "title" VARCHAR(255)
        table.text("content"); // "content" TEXT
        table.text("image_url");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
   });  
};

exports.down = function(knex) {
    return knex.schema.dropTable("clucks");
};
