class HashMap
{
	constructor()
	{
		this.map = new Array();
	}

	put(key, value)
	{
		this.map[key] = value;
	}
	get(key)
	{
		return this.map[key];
	}

	getAll()
	{
		return this.map;
	}

	containsKey(key)
	{
		return key in this.map;
	}

	containsValue(value)
	{
		for (var prop in this.map)
		{
			if (this.map[prop] == value) return true;
		}
		return false;
	}
	isEmpty(key)
	{
		return (this.size() == 0);
	}

	clear()
	{
		this.map = new Array();
	}

	remove(key)
	{
		delete this.map[key];
	}

	keys()
	{
		var keys = new Array();
		for (var prop in this.map)
		{
			keys.push(prop);
		}
		return keys;
	}

	values()
	{
		var values = new Array();
		for (var prop in this.map)
		{
			values.push(this.map[prop]);
		}
		return values;
	}

	size()
	{
		var count = 0;
		for (var prop in this.map)
		{
			count++;
		}
		return count;
	}
}
export default HashMap;
