// Objects for storage system
module.exports = {
    Storage_System: class Storage_System {
                        constructor(name, contents, stage) {
                            this.name = name;
                            this.contents = contents;
                            this.stage = stage;
                        }
                    },
    Storage_Unit: class Storage_Unit {
                      constructor(name, desc, contents, location, len, wid) {
                          this.name = name;
                          this.description = desc;
                          this.contents = contents;
                          this.location = location;
                          this.length = len;
                          this.width = width;
                      }
                  },

    Storage_Container: class Storage_Container {
                           constructor(name, desc, contents, len, wid, storedIn) {
                               this.name = name || "New Container";
                               this.description = desc || "";
                               this.contents = contents || [];
                               this.length = len;
                               this.width = width;
                               this.storedIn = storedIn;
                           }
                       },

    Item: class Item {
             constructor(name, desc, quantity, len, wid,  storedIn) {
                 this.name = name;
                 this.description = desc;
                 this.quantity = quantity;
                 this.length = len;
                 this.width = wid;
                 this.storedIn = storedIn;
             }
         }
}