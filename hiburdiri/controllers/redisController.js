const redis = require("redis");
const client = redis.createClient();

client.on("error", function(err) {
	console.log("Error " + err);
});

client.on("connected", function() {
	console.log("Redis Connected!");
});

module.exports = {
	setValue: function(key, value) {
		return new Promise((resolve, reject) => {
			client.set(key, JSON.stringify(value), "EX", 120, res => {
				resolve(res);
			});
		});
	},
	getValue: function(key) {
		return new Promise((resolve, reject) => {
			client.get(key, function(err, reply) {
				if (err) reject(err);
				else resolve(reply);
			});
		});
	}
};
