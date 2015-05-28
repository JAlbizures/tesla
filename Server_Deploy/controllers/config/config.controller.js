

var connect = require('../../utils/connect');


function all (callback) {
	var query = "SELECT * FROM config";	
	connect.query(query,undefined,function (rows) {
		callback(rows);
	});}

exports.getAll = function(req, res) {
	all(function (rows) {
		res.json(rows);
	});
}
exports.update = function (req,res) {
	

	var query = "UPDATE config SET dato = ? WHERE idConfig=?;";
	var data = [];
	for(var name in req.body){
		data.push(req.body[name]);
	}
	//console.log(data);
	function recursiva (index) {
		//console.log(data[index]);
		connect.query(query,[data[index].dato.toString(),data[index].idConfig],function (row) {
			if(index >= data.length-1){
				all(function (rows) {
					//console.log(rows);
					res.json(rows);
				});				
			}else{
				index++;
				recursiva(index);
			}
		});	
	}

	recursiva(0);
}
