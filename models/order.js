var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var items = new Schema(
  {
    name : Array,
    sauce : Array,
    quantity : Array
  });

var OrderSchema = new Schema(
  {
    user : { type: Schema.Types.ObjectId, ref: 'User'},
    isDone: Boolean,
    isConfirmed: Boolean,
    items : [items], 
    phone: Number,
    address: String,
    endIn: {type: Number, required: true}
  }, {
    timestamps: true
  });

  OrderSchema
  .virtual('url')
  .get(function(){
      return '/order/' + this._id;
  });

  OrderSchema
  .virtual('mins')
  .get(function(){
    const crMin= moment(this.createdAt).format('HH:mm');
    const total = moment(crMin, 'HH:mm').add(this.endIn, 'minutes').format('HH:mm');
    return total;
  });

  OrderSchema
  .virtual('minsUpd')
  .get(function(){
    const crMin= moment(this.updatedAt).format('HH:mm');
    const total = moment(crMin, 'HH:mm').add(this.endIn, 'minutes').format('HH:mm');
    return total;
  });


module.exports = mongoose.model ('Order', OrderSchema);
