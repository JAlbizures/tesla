var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'tesla',
   typeCast: function (field, next) {
        // handle only BIT(1)
        if (field.type == "BIT" && field.length == 1) {
            var bit = field.string();
            
            
            bit = (bit === null) ? null : bit.charCodeAt(0);
			//console.log(bit);
			if(bit === 0){
				bit = false;
			}else{
				bit = true;
			}

            return bit;
        }

        // handle everything else as default
        return next();
    }
},'pool');

(function(){
	//connection.connect();
	//connection.end();
	//console.log('conectada');
	//connection.query()
	
	connection.query('SELECT * FROM usuario',undefined,function (err,rows) {
		//console.log('a',err,rows);
		if(err){
			throw "Error Base de datos";
		}else{
			console.log('Se conecto correctamente');
		}
	});
}());

module.exports = {
	con : connection,
	query : function (query,data,callback) {
		//this.con.connect();
		var self = this;
		//console.log('query',query);
		//console.log('data',data);
		//console.log('callback',callback);
		connection.query(query,data, function(err, rows, fields) {
			if (err) throw err;
		 
			if(callback) callback(rows);
			//self.con.end();
		});
	}
};