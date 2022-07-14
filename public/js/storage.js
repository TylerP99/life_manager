// Objects for storage system
module.exports = {
    Storage_System: 
    class Storage_System {
        constructor(name, contents, stage) {
            this.name = name;
            this.contents = contents;
            this.stage = stage;
        }
    },
    Storage_Unit: 
    class Storage_Unit {
        constructor(name, desc, contents, location, len, wid, height) {
            this.name = name;
            this.description = desc;
            this.contents = contents;
            this.location = location;
            this.length = len;
            this.width = wid;
            this.height = height;
        }

        add_item(item) {
            this.contents.push(item);
        }

        move_item(item, destination) {
            destination.contents.push(item);
        }

        get_volume() {
            return this.length * this.width * this.height;
        }
    },
    Storage_Container: 
    class Storage_Container {
        constructor(name, desc, contents, len, wid, height, storedIn) {
            this.name = name || "New Container";
            this.description = desc || "";
            this.contents = contents || [];
            this.length = len;
            this.width = wid;
            this.height = height;
            this.storedIn = storedIn;
        }
        
        add_item(item) {
            this.contents.push(item);
        }

        get_volume() {
            return this.length * this.width * this.height;
        }
    },
    Item:
    class Item {
        constructor(name, desc, quantity, len, wid, height, storedIn) {
            this.name = name;
            this.description = desc;
            this.quantity = quantity;
            this.length = len;
            this.width = wid;
            this.height = height;
            this.storedIn = storedIn;
        }

        // Getters & Setters
        get_volume() {
            return this.length * this.width * this.height;
        }
    }
}