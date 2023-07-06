package training.util.filehandler.helper

uses training.util.filehandler.dto.FieldPropertiesDTO
uses javax.xml.parsers.DocumentBuilderFactory
uses org.apache.log4j.Logger
uses org.w3c.dom.Element
uses java.io.File


/**
 * author : Aravind
 * date   : 10 Nov 2022
 * desc   : Class to read the xml file
 */
class FieldsXMLReader {

  static final var _logger = Logger.getLogger(FieldsXMLReader)

  /**
   * Function to load the conf file and convert it to DTO
   */
  function getFileDetails(fileXMLLocation : String) : List<FieldPropertiesDTO> {
    if (fileXMLLocation == null) {
      throw new Exception("Fields XML needs to be specified")
    }
    _logger.info("Starting to read files.xml from : " + fileXMLLocation)
    var file = new File(fileXMLLocation)
    if ((not file.exists()) and (not file.Directory)) {
      throw new Exception("Invalid Fields XML path")
    }
    var document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(file)
    var root = document.getElementsByTagName("fields")
    var fields = document.getElementsByTagName("field")

    if (fields.Length == 0) {
      throw new RuntimeException("No fields found in ${fileXMLLocation}")
    }
    var fieldsRoot = root.item(0) as Element
    var delimitor = fieldsRoot.getAttribute("delimitor")
    var responsiveStr = fieldsRoot.getAttribute("responsive")
    var responsive = true
    if(responsiveStr != null and responsiveStr != ""){
      responsive = Boolean.parseBoolean(responsiveStr)
    }
    var content : Element
    var name : String
    var required : Boolean
    var fieldSize : Integer = 0
    var trimValueIfExceedsSize : Boolean = false
    var justify : String = "left"

    var dtos : List<FieldPropertiesDTO> = {}
    foreach (contentIndex in 0..|fields.Length) {
      content = fields.item(contentIndex) as Element
      name = content.getAttribute("name")
      try {
        required = Boolean.parseBoolean(content.getAttribute("required"))
      }catch(e:Exception){
        required = false
      }
      if(not responsive) {
        fieldSize = formatFieldSize(content.getAttribute("fieldSize"))
        trimValueIfExceedsSize = formatTrimValueIfExceedsSize(content.getAttribute("trimValueIfExceedsSize"))
        justify = formatJustify(content.getAttribute("justify"))
      }
      dtos.add(new FieldPropertiesDTO(name, fieldSize, responsive, trimValueIfExceedsSize, required, justify, delimitor))
    }
    return dtos
  }

  /**
   * Fuction to format the field size
   *
   * @param value
   * @return
   */
  private function formatFieldSize(value : String) : Integer {
    if (value == null or value == "") {
      return 0
    }
    return Integer.parseInt(value)
  }

  /**
   * Function to format trimValue
   *
   * @param value
   * @return
   */
  private function formatTrimValueIfExceedsSize(value : String) : boolean {
    try {
      return Boolean.parseBoolean(value)
    } catch (e) {
      return false
    }
  }

  /**
   * Function to format justify
   *
   * @param value
   * @return
   */
  private function formatJustify(value : String) : String {
    if (value == null or value == "") {
      return "left"
    }
    value = value.trim().toLowerCase()
    if (not{"left", "center", "right"}.contains(value)) {
      throw new Exception("Invalid justify value")
    }
    return value
  }
}