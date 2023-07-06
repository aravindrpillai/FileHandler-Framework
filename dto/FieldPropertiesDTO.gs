package training.util.filehandler.dto

class FieldPropertiesDTO {

  construct(
      fieldName:String,
      fieldSize:Integer,
      responsive : boolean,
      trimValueIfExceedsSize:boolean = false,
      required:boolean = true,
      justify : String = "left",
      delim : String = null
  ){
    _fieldName = fieldName
    _fieldSize = fieldSize
    _responsive = responsive
    _trimValueIfExceedsSize = trimValueIfExceedsSize
    _required = required
    _justify = justify
    _delimitor = delim
  }

  var _fieldName : String as FieldName
  var _fieldSize : Integer as FieldSize = null
  var _trimValueIfExceedsSize : boolean as TrimValueIfExceedsSize = false //if false, this will raise exception if value exceeds size
  var _required : boolean as Required = true //if false, this will raise exception if the value is empty
  var _justify : String as Justify = "left"
  var _delimitor : String as Delimitor = null
  var _responsive : boolean as Responsive = true
}